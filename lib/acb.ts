// CRA Adjusted Cost Base (ACB) engine with superficial-loss (30-day) rule.
// Reference method: CRA averages all units of an identical property into one pool.

import type {
  Txn,
  DispositionResult,
  AssetSummary,
  PortfolioReport,
} from "./types";

const DAY = 24 * 60 * 60 * 1000;

interface Acq {
  date: number;
  qty: number;
  cost: number; // CAD cost incl. fees
}
interface Disp {
  date: number;
  qty: number;
  proceeds: number; // CAD net of fees
  source: string;
  note?: string;
}

type Event =
  | ({ kind: "acq" } & Acq)
  | ({ kind: "disp" } & Disp);

// Expand normalized Txns into per-asset acquisition / disposition events.
function expand(txns: Txn[]): Record<string, Event[]> {
  const byAsset: Record<string, Event[]> = {};
  const push = (asset: string, e: Event) => {
    (byAsset[asset] ||= []).push(e);
  };

  for (const t of txns) {
    const d = new Date(t.date).getTime();
    const fee = t.fee || 0;
    switch (t.type) {
      case "buy":
        push(t.asset, { kind: "acq", date: d, qty: t.quantity, cost: t.cadValue + fee });
        break;
      case "income":
        // acquired at FMV; cost basis = FMV (income already taxed separately)
        push(t.asset, { kind: "acq", date: d, qty: t.quantity, cost: t.cadValue });
        break;
      case "sell":
        push(t.asset, { kind: "disp", date: d, qty: t.quantity, proceeds: t.cadValue - fee, source: t.source, note: t.note });
        break;
      case "trade":
        // dispose `asset` at FMV, acquire `toAsset` at the same FMV
        push(t.asset, { kind: "disp", date: d, qty: t.quantity, proceeds: t.cadValue - fee, source: t.source, note: t.note });
        if (t.toAsset && t.toQuantity) {
          push(t.toAsset, { kind: "acq", date: d, qty: t.toQuantity, cost: t.cadValue });
        }
        break;
      // transfers between own wallets are not dispositions -> ignored for ACB
      case "transfer-in":
      case "transfer-out":
      case "fee":
      default:
        break;
    }
  }
  return byAsset;
}

// Units held at a given timestamp (for superficial-loss end-of-window test)
function unitsHeldAt(events: Event[], ts: number): number {
  let u = 0;
  for (const e of events) {
    if (e.date <= ts) u += e.kind === "acq" ? e.qty : -e.qty;
  }
  return Math.max(0, u);
}

// Units acquired within the 61-day window (30 days before .. 30 days after)
function unitsAcquiredInWindow(events: Event[], center: number): number {
  let u = 0;
  for (const e of events) {
    if (e.kind === "acq" && e.date >= center - 30 * DAY && e.date <= center + 30 * DAY) {
      u += e.qty;
    }
  }
  return u;
}

export function computeReport(txns: Txn[], taxYear: number): PortfolioReport {
  const byAsset = expand(txns);
  const dispositions: DispositionResult[] = [];
  const summaries: AssetSummary[] = [];

  for (const [asset, eventsRaw] of Object.entries(byAsset)) {
    // stable chronological sort; acquisitions before dispositions on the same day
    const events = [...eventsRaw].sort((a, b) =>
      a.date === b.date ? (a.kind === "acq" ? -1 : 1) : a.date - b.date,
    );

    let units = 0;
    let cost = 0; // running ACB pool
    let proceedsSum = 0,
      costBasisSum = 0,
      gains = 0,
      losses = 0,
      denied = 0;

    for (const e of events) {
      if (e.kind === "acq") {
        units += e.qty;
        cost += e.cost;
        continue;
      }
      // disposition
      const acbPerUnit = units > 0 ? cost / units : 0;
      const costBasis = acbPerUnit * e.qty;
      const proceeds = e.proceeds;
      const rawGain = proceeds - costBasis;

      let superficialDenied = 0;
      let superficial = false;

      if (rawGain < 0) {
        // potential superficial loss
        const S = e.qty;
        const B = unitsAcquiredInWindow(events, e.date);
        const Bend = unitsHeldAt(events, e.date + 30 * DAY);
        if (B > 0 && Bend > 0) {
          const lossAbs = -rawGain;
          const ratio = Math.min(B, S, Bend) / S;
          superficialDenied = lossAbs * ratio;
          superficial = superficialDenied > 0;
        }
      }

      // reduce pool by the cost basis of disposed units
      units -= e.qty;
      cost -= costBasis;
      // denied loss is added back to the ACB of remaining/repurchased units
      if (superficialDenied > 0) cost += superficialDenied;

      const allowed = rawGain + superficialDenied; // bring loss toward zero by denied amount

      const inYear = new Date(e.date).getUTCFullYear() === taxYear;
      const rec: DispositionResult = {
        date: new Date(e.date).toISOString().slice(0, 10),
        asset,
        quantity: e.qty,
        proceeds,
        acbPerUnit,
        costBasis,
        rawGain,
        superficialDenied,
        allowedGainLoss: allowed,
        superficial,
        source: e.source,
        note: e.note,
      };
      dispositions.push(rec);

      if (inYear) {
        proceedsSum += proceeds;
        costBasisSum += costBasis;
        if (allowed >= 0) gains += allowed;
        else losses += allowed;
        denied += superficialDenied;
      }
    }

    summaries.push({
      asset,
      proceeds: proceedsSum,
      costBasis: costBasisSum,
      gains,
      losses,
      net: gains + losses,
      remainingUnits: units,
      remainingAcb: cost,
      superficialDenied: denied,
    });
  }

  // income (staking/airdrop) ordinary income in the tax year
  let incomeTotal = 0;
  for (const t of txns) {
    if (t.type === "income" && new Date(t.date).getUTCFullYear() === taxYear) {
      incomeTotal += t.cadValue;
    }
  }

  const totalProceeds = summaries.reduce((s, a) => s + a.proceeds, 0);
  const totalCostBasis = summaries.reduce((s, a) => s + a.costBasis, 0);
  const totalGains = summaries.reduce((s, a) => s + a.gains, 0);
  const totalLosses = summaries.reduce((s, a) => s + a.losses, 0);
  const net = totalGains + totalLosses;
  const superficialDeniedTotal = summaries.reduce((s, a) => s + a.superficialDenied, 0);

  // dispositions sorted newest-first for display
  dispositions.sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    dispositions,
    byAsset: summaries.filter((s) => s.proceeds !== 0 || s.remainingUnits !== 0),
    totalProceeds,
    totalCostBasis,
    totalGains,
    totalLosses,
    netCapitalGainLoss: net,
    taxableCapitalGain: net > 0 ? net * 0.5 : 0,
    allowableCapitalLoss: net < 0 ? -net * 0.5 : 0,
    superficialDeniedTotal,
    incomeTotal,
  };
}

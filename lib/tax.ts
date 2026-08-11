// 2025 federal + British Columbia marginal tax brackets (estimates, indexed).
// Used to estimate the incremental tax on a taxable capital gain.

export interface Bracket {
  upTo: number; // upper threshold of this bracket (Infinity for top)
  rate: number; // marginal rate (decimal)
}

// Federal 2025 brackets
export const FEDERAL_2025: Bracket[] = [
  { upTo: 57375, rate: 0.15 },
  { upTo: 114750, rate: 0.205 },
  { upTo: 177882, rate: 0.26 },
  { upTo: 253414, rate: 0.29 },
  { upTo: Infinity, rate: 0.33 },
];

// British Columbia 2025 brackets
export const BC_2025: Bracket[] = [
  { upTo: 49279, rate: 0.0506 },
  { upTo: 98560, rate: 0.077 },
  { upTo: 113158, rate: 0.105 },
  { upTo: 137407, rate: 0.1229 },
  { upTo: 186306, rate: 0.147 },
  { upTo: 259829, rate: 0.168 },
  { upTo: Infinity, rate: 0.205 },
];

// Progressive tax on a given taxable income for one set of brackets.
function taxOn(income: number, brackets: Bracket[]): number {
  if (income <= 0) return 0;
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    if (income > lower) {
      const taxable = Math.min(income, b.upTo) - lower;
      tax += taxable * b.rate;
      lower = b.upTo;
    } else break;
  }
  return tax;
}

export interface TaxEstimate {
  otherIncome: number;
  taxableCapitalGain: number;
  federalTax: number;
  bcTax: number;
  totalTax: number;
  marginalRate: number; // combined marginal rate at this income level
  effectiveRateOnGain: number; // tax / taxableCapitalGain
}

// Incremental tax attributable to the taxable capital gain, stacked on top of
// other income. Returns 0 tax if there is no taxable gain (e.g. a net loss).
export function estimateTax(
  otherIncome: number,
  taxableCapitalGain: number,
): TaxEstimate {
  const tcg = Math.max(0, taxableCapitalGain);
  const base = otherIncome;
  const top = otherIncome + tcg;

  const fed = taxOn(top, FEDERAL_2025) - taxOn(base, FEDERAL_2025);
  const bc = taxOn(top, BC_2025) - taxOn(base, BC_2025);
  const total = fed + bc;

  // combined marginal rate at `top`
  const marginal =
    marginalRate(top, FEDERAL_2025) + marginalRate(top, BC_2025);

  return {
    otherIncome,
    taxableCapitalGain: tcg,
    federalTax: fed,
    bcTax: bc,
    totalTax: total,
    marginalRate: marginal,
    effectiveRateOnGain: tcg > 0 ? total / tcg : 0,
  };
}

function marginalRate(income: number, brackets: Bracket[]): number {
  let lower = 0;
  for (const b of brackets) {
    if (income <= b.upTo) return b.rate;
    lower = b.upTo;
  }
  return brackets[brackets.length - 1].rate;
}

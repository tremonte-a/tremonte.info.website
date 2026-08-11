// Lightweight CSV parsing + smart column auto-mapping for exchange exports.
import type { Txn, TxnType } from "./types";

export interface ParsedCsv {
  headers: string[];
  rows: string[][];
}

// RFC-ish CSV parser (handles quoted fields, commas, escaped quotes, CRLF)
export function parseCsv(text: string): ParsedCsv {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        field = "";
        if (row.some((x) => x.trim() !== "")) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    if (row.some((x) => x.trim() !== "")) rows.push(row);
  }
  const headers = (rows.shift() || []).map((h) => h.trim());
  return { headers, rows };
}

export type FieldKey =
  | "ignore"
  | "date"
  | "type"
  | "asset"
  | "quantity"
  | "cadValue"
  | "price"
  | "fee"
  | "toAsset"
  | "toQuantity";

// Heuristic: guess which field each header maps to.
export function autoMap(headers: string[]): Record<number, FieldKey> {
  const map: Record<number, FieldKey> = {};
  headers.forEach((h, i) => {
    const k = h.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (/(time|date|timestamp)/.test(k)) map[i] = "date";
    else if (/(type|side|action|transaction|activity)/.test(k)) map[i] = "type";
    else if (/(toasset|toassetcurrency|received|buycurrency)/.test(k)) map[i] = "toAsset";
    else if (/(asset|currency|symbol|coin|token|pair)/.test(k)) map[i] = "asset";
    else if (/(toquantity|amountreceived)/.test(k)) map[i] = "toQuantity";
    else if (/(amount|quantity|qty|vol|volume|units|shares)/.test(k)) map[i] = "quantity";
    else if (/(cadvalue|valuecad|cad|totalcad|netamount|proceeds|cost|total|subtotal)/.test(k))
      map[i] = "cadValue";
    else if (/(price|rate|unitprice|spotprice)/.test(k)) map[i] = "price";
    else if (/(fee|commission|gas)/.test(k)) map[i] = "fee";
    else map[i] = "ignore";
  });
  return map;
}

function normType(raw: string): TxnType {
  const s = (raw || "").toLowerCase();
  if (/(buy|purchase|deposit cad|acquire)/.test(s)) return "buy";
  if (/(sell|sale|dispose)/.test(s)) return "sell";
  if (/(trade|swap|convert|exchange)/.test(s)) return "trade";
  if (/(stak|reward|airdrop|interest|earn|income|dividend)/.test(s)) return "income";
  if (/(receiv|deposit|transfer in|incoming)/.test(s)) return "transfer-in";
  if (/(send|withdraw|transfer out|outgoing)/.test(s)) return "transfer-out";
  if (/(fee|gas)/.test(s)) return "fee";
  return "buy";
}

function num(s: string): number {
  if (!s) return 0;
  const n = parseFloat(s.replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? 0 : Math.abs(n);
}

function cleanAsset(s: string): string {
  // Kraken uses XXBT / XBT for bitcoin, ZUSD etc.
  const up = (s || "").toUpperCase().replace(/\.S$|\.F$/g, "");
  if (/^X?XBT$|^XXBT$/.test(up)) return "BTC";
  if (/^XETH$|^XBT$/.test(up)) return up === "XETH" ? "ETH" : "BTC";
  if (up.startsWith("Z") && up.length === 4) return up.slice(1); // ZUSD -> USD
  if (up.startsWith("X") && up.length === 4) return up.slice(1); // XXRP -> XRP
  return up.replace(/CAD$|USD$/, (m) => (s.length > 3 ? m : m));
}

// Build normalized Txns from rows + a column mapping.
export function rowsToTxns(
  rows: string[][],
  mapping: Record<number, FieldKey>,
  source: string,
): Txn[] {
  const col = (key: FieldKey) =>
    Object.entries(mapping).find(([, v]) => v === key)?.[0];
  const di = col("date"),
    ty = col("type"),
    as = col("asset"),
    qt = col("quantity"),
    cv = col("cadValue"),
    pr = col("price"),
    fe = col("fee"),
    ta = col("toAsset"),
    tq = col("toQuantity");

  const out: Txn[] = [];
  rows.forEach((r, idx) => {
    const get = (i?: string) => (i != null ? r[Number(i)] : undefined) || "";
    const dateRaw = get(di);
    const date = dateRaw ? new Date(dateRaw.replace(" ", "T")) : null;
    if (!date || isNaN(date.getTime())) return;
    const quantity = num(get(qt));
    let cadValue = num(get(cv));
    if (!cadValue && pr) cadValue = num(get(pr)) * quantity;
    const type = normType(get(ty));
    const asset = cleanAsset(get(as));
    if (!asset || quantity === 0) return;
    out.push({
      id: `${source}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
      date: date.toISOString(),
      type,
      asset,
      quantity,
      cadValue,
      fee: num(get(fe)),
      toAsset: ta ? cleanAsset(get(ta)) : undefined,
      toQuantity: tq ? num(get(tq)) : undefined,
      source,
    });
  });
  return out;
}

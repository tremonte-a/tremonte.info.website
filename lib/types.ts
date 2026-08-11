// Core data model for the Canada (BC) crypto tax calculator

export type TxnType =
  | "buy"
  | "sell"
  | "trade" // crypto-to-crypto: disposes `asset`, acquires `toAsset`
  | "transfer-in"
  | "transfer-out"
  | "income" // staking / airdrop / interest -> taxable income + acquisition at FMV
  | "fee"; // standalone fee / gas

export interface Txn {
  id: string;
  date: string; // ISO date string
  type: TxnType;
  asset: string; // primary asset symbol, e.g. "BTC"
  quantity: number; // units of `asset`
  cadValue: number; // total CAD fair-market value of the asset moved
  fee: number; // CAD fee/commission/gas
  // trade-only second leg:
  toAsset?: string;
  toQuantity?: number;
  source: string; // kraken | wealthsimple | btc-chain | manual | csv
  note?: string;
}

export interface DispositionResult {
  date: string;
  asset: string;
  quantity: number;
  proceeds: number; // net of fees
  acbPerUnit: number;
  costBasis: number;
  rawGain: number; // proceeds - costBasis (can be negative)
  superficialDenied: number; // portion of a loss disallowed (>=0)
  allowedGainLoss: number; // rawGain + superficialDenied (denied loss added back)
  superficial: boolean;
  source: string;
  note?: string;
}

export interface AssetSummary {
  asset: string;
  proceeds: number;
  costBasis: number;
  gains: number; // sum of positive allowed
  losses: number; // sum of negative allowed (negative number)
  net: number;
  remainingUnits: number;
  remainingAcb: number;
  superficialDenied: number;
}

export interface PortfolioReport {
  dispositions: DispositionResult[];
  byAsset: AssetSummary[];
  totalProceeds: number;
  totalCostBasis: number;
  totalGains: number;
  totalLosses: number;
  netCapitalGainLoss: number;
  taxableCapitalGain: number; // 50% inclusion if net gain
  allowableCapitalLoss: number; // 50% of net loss if net loss
  superficialDeniedTotal: number;
  incomeTotal: number; // staking/airdrop ordinary income
}

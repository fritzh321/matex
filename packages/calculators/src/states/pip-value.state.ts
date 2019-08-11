export type PipValueState = {
  baseExchangeRate: number;
  baseListedSecond: boolean;
  pipPrecision: number;
  positionSize: number;
  tradingPairExchangeRate: number;
};

export const initialPipValueState: PipValueState = {
  baseExchangeRate: 0,
  baseListedSecond: false,
  pipPrecision: 4,
  positionSize: 0,
  tradingPairExchangeRate: 0,
};

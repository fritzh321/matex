export type PipValueCalculatorState = {
  baseExchangeRate: number;
  baseListedSecond: boolean;
  pipPrecision: number;
  positionSize: number;
  tradingPairExchangeRate: number;
};

export const initialPipValueCalculatorState: PipValueCalculatorState = {
  baseExchangeRate: 1,
  baseListedSecond: false,
  pipPrecision: 4,
  positionSize: 0,
  tradingPairExchangeRate: 1,
};

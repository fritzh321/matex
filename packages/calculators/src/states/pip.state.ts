export type PipCalculatorState = {
  baseRate: number;
  precision: number;
  rate: number;
  second: boolean;
  size: number;
};

export const initialPipCalculatorState: PipCalculatorState = {
  baseRate: 1,
  precision: 4,
  rate: 1,
  second: false,
  size: 0,
};

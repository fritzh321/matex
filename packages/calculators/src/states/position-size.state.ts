import {
  initialPipValueCalculatorState,
  PipValueCalculatorState,
} from './pip-value.state';

export type PositionSizeState = PipValueCalculatorState & {
  amountAtRisk: number;
  entryPrice: number;
  riskRatio: number;
  stopLossPips: number;
  stopPrice: number;
};

export const initialPositionSizeState: PositionSizeState = {
  ...initialPipValueCalculatorState,
  amountAtRisk: 0,
  entryPrice: 0,
  riskRatio: 0,
  stopLossPips: 0,
  stopPrice: 0,
};

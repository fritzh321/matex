import { initialPipValueState, PipValueState } from './pip-value.state';

export type PositionSizeState = PipValueState & {
  amountAtRisk: number;
  entryPrice: number;
  riskRatio: number;
  stopLossPips: number;
  stopLossPrice: number;
};

export const initialPositionSizeState: PositionSizeState = {
  ...initialPipValueState,
  amountAtRisk: 0,
  entryPrice: 0,
  riskRatio: 0,
  stopLossPips: 0,
  stopLossPrice: 0,
};

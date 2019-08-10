import { initialPipValueState, PipValueState } from './pip-value.state';

export type PositionSizeState = PipValueState & {
  accountSize: number;
  amountAtRisk: number;
  entryPrice: number;
  riskRatio: number;
  stopLossPips: number;
  stopLossPrice: number;
};

export const initialPositionSizeState: PositionSizeState = {
  ...initialPipValueState,
  accountSize: 0,
  amountAtRisk: 0,
  entryPrice: 0,
  positionSize: 1,
  riskRatio: 0,
  stopLossPips: 0,
  stopLossPrice: 0,
};

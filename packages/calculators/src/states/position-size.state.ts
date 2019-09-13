import { defaultLotDescriptors } from '../descriptors/lot.descriptor';
import { LotState } from './lot.state';
import { initialPipValueState, PipValueState } from './pip-value.state';

export type PositionSizeState = PipValueState & {
  accountSize: number;
  amountAtRisk: number;
  entryPrice: number;
  riskRatio: number;
  stopLossPips: number;
  stopLossPrice: number;
} & LotState;

export const initialPositionSizeState: PositionSizeState = {
  ...initialPipValueState,
  accountSize: 0,
  amountAtRisk: 0,
  entryPrice: 0,
  lotDescriptors: defaultLotDescriptors,
  positionSize: 1,
  riskRatio: 0,
  stopLossPips: 0,
  stopLossPrice: 0,
};

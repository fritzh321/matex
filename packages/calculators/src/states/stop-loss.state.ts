import { PositionEnum } from '../enums/position.enum';
import { initialPipValueState, PipValueState } from './pip-value.state';

export type StopLossState = PipValueState & {
  pipPrecision: number;
  entryPrice: number;
  position: PositionEnum;
  stopLossAmount: number;
  stopLossPips: number;
  stopLossPrice: number;
};

export const initialStopLossState: StopLossState = {
  ...initialPipValueState,
  entryPrice: 0,
  position: PositionEnum.Long,
  stopLossAmount: 0,
  stopLossPips: 0,
  stopLossPrice: 0,
};

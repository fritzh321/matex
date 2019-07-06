import { PositionEnum } from '../enums/position.enum';
import { initialPipValueState, PipValueState } from './pip-value.state';

export type StopLossTakeProfitState = PipValueState & {
  entryPrice: number;
  position: PositionEnum;
  stopLossAmount: number;
  stopLossPips: number;
  stopLossPrice: number;
  takeProfitAmount: number;
  takeProfitPips: number;
  takeProfitPrice: number;
};

export const initialStopLossTakeProfitState: StopLossTakeProfitState = {
  ...initialPipValueState,
  entryPrice: 0,
  position: PositionEnum.Long,
  stopLossAmount: 0,
  stopLossPips: 0,
  stopLossPrice: 0,
  takeProfitAmount: 0,
  takeProfitPips: 0,
  takeProfitPrice: 0,
};

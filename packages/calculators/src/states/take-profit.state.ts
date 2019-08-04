import { PositionEnum } from '../enums/position.enum';
import { initialPipValueState, PipValueState } from './pip-value.state';

export type TakeProfitState = PipValueState & {
  pipPrecision: number;
  entryPrice: number;
  position: PositionEnum;
  takeProfitAmount: number;
  takeProfitPips: number;
  takeProfitPrice: number;
};

export const initialTakeProfitState: TakeProfitState = {
  ...initialPipValueState,
  entryPrice: 0,
  position: PositionEnum.Long,
  takeProfitAmount: 0,
  takeProfitPips: 0,
  takeProfitPrice: 0,
};

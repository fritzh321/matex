import { initialPipValueState, PipValueState } from './pip-value.state';
import { initialStopLossState, StopLossState } from './stop-loss.state';
import { initialTakeProfitState, TakeProfitState } from './take-profit.state';

export type StopLossTakeProfitState = PipValueState &
  StopLossState &
  TakeProfitState;

export const initialStopLossTakeProfitState: StopLossTakeProfitState = {
  ...initialPipValueState,
  ...initialStopLossState,
  ...initialTakeProfitState,
};

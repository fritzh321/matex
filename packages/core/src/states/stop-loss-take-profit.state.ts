import {
  initialStopLossTakeProfitState,
  StopLossTakeProfitState,
} from '@matex/calculators';

import {
  initialMatexPipValueState,
  MatexPipValueStateType,
} from './pip-value.state';

export type MatexStopLossTakeProfitStateType = StopLossTakeProfitState &
  MatexPipValueStateType;

export const initialMatexStopLossTakeProfitState: MatexStopLossTakeProfitStateType = {
  ...initialStopLossTakeProfitState,
  ...initialMatexPipValueState,
};

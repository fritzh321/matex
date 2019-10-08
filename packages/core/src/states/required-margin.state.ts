import {
  initialRequiredMarginState,
  RequiredMarginState,
} from '@matex/calculators';

import {
  initialMatexPipValueState,
  MatexPipValueStateType,
} from './pip-value.state';

export type MatexRequiredMarginStateType = RequiredMarginState &
  MatexPipValueStateType;

export const initialMatexRequiredMarginState: MatexRequiredMarginStateType = {
  ...initialRequiredMarginState,
  ...initialMatexPipValueState,
};

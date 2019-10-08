import {
  initialPositionSizeState,
  PositionSizeState,
} from '@matex/calculators';

import {
  initialMatexPipValueState,
  MatexPipValueStateType,
} from './pip-value.state';

export type MatexPositionSizeStateType = PositionSizeState &
  MatexPipValueStateType;

export const initialMatexPositionSizeState: MatexPositionSizeStateType = {
  ...initialPositionSizeState,
  ...initialMatexPipValueState,
};

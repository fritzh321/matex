import { positionSizeValidators, StateValidator } from '@matex/calculators';

import { MatexPositionSizeStateType } from '../states';
import { matexPipValueValidators } from './pip-value.validator';

export const matexPositionSizeValidators: Array<
  StateValidator<MatexPositionSizeStateType>
> = [...matexPipValueValidators, ...positionSizeValidators];

import {
  StateValidator,
  stopLossTakeProfitValidators,
} from '@matex/calculators';

import { MatexStopLossTakeProfitStateType } from '../states';
import { matexPipValueValidators } from './pip-value.validator';

export const matexStopLossTakeProfitValidators: Array<
  StateValidator<MatexStopLossTakeProfitStateType>
> = [...matexPipValueValidators, ...stopLossTakeProfitValidators];

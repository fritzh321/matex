import { StateValidator } from '@matex/calculators';

import { MatexRequiredMarginStateType } from '../states';
import { matexPipValueValidators } from './pip-value.validator';

export const matexRequiredMarginValidators: Array<
  StateValidator<MatexRequiredMarginStateType>
> = [...matexPipValueValidators];

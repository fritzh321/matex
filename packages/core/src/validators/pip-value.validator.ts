import { StateValidator } from '@matex/calculators';

import { MatexPipValueStateType } from '../states';

export const matexPipValueValidators: Array<
  StateValidator<MatexPipValueStateType>
> = [
  ({ positionSize }) => positionSize > 0,
  ({ base, counter, account }) => !!(base && counter && account),
];

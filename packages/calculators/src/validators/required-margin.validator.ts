import { RequiredMarginState } from '../states';
import { StateValidator } from '../types';

export const requiredMarginValidators: Array<StateValidator<RequiredMarginState>> = [
  ({ positionSize }) => positionSize > 0,
  ({ tradingPairExchangeRate }) => tradingPairExchangeRate > 0,
];

import { PipValueState } from '../states';
import { StateValidator } from '../types';

export const pipValueValidators: Array<StateValidator<PipValueState>> = [
  ({ positionSize }) => positionSize > 0,
  ({ tradingPairExchangeRate }) => tradingPairExchangeRate > 0,
];

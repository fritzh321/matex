import { FibonnaciLevelsState } from '../states/fibonnaci.state';
import { StateValidator } from '../types/state-validator.type';

export const fibonnaciLevelsValidators: Array<
  StateValidator<FibonnaciLevelsState>
> = [
  (state: FibonnaciLevelsState) => {
    if (state.low > 0 || state.high > 0) {
      return state.high > state.low;
    }

    return true;
  },
];

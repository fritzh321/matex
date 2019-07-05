import { FibonacciLevelsState } from '../states/fibonacci.state';
import { StateValidator } from '../types/state-validator.type';

export const fibonacciLevelsValidators: Array<
  StateValidator<FibonacciLevelsState>
> = [
    (state: FibonacciLevelsState) => {
    if (state.low > 0 || state.high > 0) {
      return state.high >= state.low;
    }

    return true;
  },
];

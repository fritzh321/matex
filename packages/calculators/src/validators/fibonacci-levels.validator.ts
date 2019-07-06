import { FibonacciLevelsState } from '../states/fibonacci-levels.state';
import { StateValidator } from '../types/state-validator.type';

export const fibonacciLevelsValidators: Array<
  StateValidator<FibonacciLevelsState>
> = [
  (state: FibonacciLevelsState) => {
    if (state.lowPrice > 0 || state.highPrice > 0) {
      return state.highPrice >= state.lowPrice;
    }

    return true;
  },
];

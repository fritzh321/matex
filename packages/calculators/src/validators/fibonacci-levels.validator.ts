import { FibonacciLevelsState } from '../states/fibonacci-levels.state';
import { StateValidator } from '../types/state-validator.type';

export const fibonacciLevelsValidators: Array<
  StateValidator<FibonacciLevelsState>
> = [
  (state: FibonacciLevelsState) => {
    let isValid = state.lowPrice > 0 && state.highPrice > 0;

    if (isValid) {
      isValid = state.highPrice >= state.lowPrice;
    }

    return isValid;
  },
];

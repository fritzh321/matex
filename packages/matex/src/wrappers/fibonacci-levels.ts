import {
  FibonacciLevelsCalculator,
  FibonacciLevelsResult,
  FibonacciLevelsState,
} from '@matex/calculators';

import { IMatexConfig } from '../interfaces';

export class MatexFibonacciLevelsCalculator extends FibonacciLevelsCalculator<
  FibonacciLevelsState,
  Promise<FibonacciLevelsResult>
> {
  constructor(protected config: IMatexConfig) {
    super();
  }

  public async value() {
    return super.value();
  }
}

export const fibonacciLevels = (config: IMatexConfig) => {
  return new MatexFibonacciLevelsCalculator(config);
};

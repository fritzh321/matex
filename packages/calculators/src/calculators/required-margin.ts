import { BigNumber } from 'bignumber.js';
import { BaseCalculator } from './abstract/base';

import {
  initialRequiredMarginCalculatorState,
  RequiredMarginCalculatorState,
} from '../states/required-margin.state';

export class RequiredMarginCalculator extends BaseCalculator<
  RequiredMarginCalculatorState,
  number
> {
  constructor() {
    super(initialRequiredMarginCalculatorState);
  }

  public positionSize(size: number) {
    return this.setValue('size', size);
  }

  public leverage(leverage: number) {
    return this.setValue('leverage', leverage);
  }

  public accountExchangeRate(rate: number) {
    return this.setValue('baseRate', rate);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    const { size, baseRate, leverage } = this.validState;

    return (this.result = new BigNumber(size)
      .dividedBy(leverage)
      .multipliedBy(baseRate)
      .toNumber());
  }
}

export function requiredMargin() {
  return new RequiredMarginCalculator();
}

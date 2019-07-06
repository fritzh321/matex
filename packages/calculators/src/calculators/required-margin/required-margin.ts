import { BigNumber } from 'bignumber.js';
import { BaseCalculator } from '../abstract/base';

import {
  initialRequiredMarginCalculatorState,
  RequiredMarginCalculatorState,
} from '../../states/required-margin.state';

export class RequiredMarginCalculator extends BaseCalculator<
  RequiredMarginCalculatorState,
  number
> {
  constructor() {
    super(initialRequiredMarginCalculatorState);
  }

  public baseExchangeRate(baseExchangeRate: number) {
    return this.setValue('baseExchangeRate', baseExchangeRate);
  }

  public leverage(leverage: number) {
    return this.setValue('leverage', leverage);
  }

  public positionSize(positionSize: number) {
    return this.setValue('positionSize', positionSize);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    const { positionSize, baseExchangeRate, leverage } = this.validState;

    return (this.result = new BigNumber(positionSize)
      .dividedBy(leverage)
      .multipliedBy(baseExchangeRate)
      .toNumber());
  }
}

export function requiredMargin() {
  return new RequiredMarginCalculator();
}

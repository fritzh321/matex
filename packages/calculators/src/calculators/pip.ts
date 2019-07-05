import { BigNumber } from 'bignumber.js';

import {
  initialPipCalculatorState,
  PipCalculatorState,
} from '../states/pip.state';

import { BaseCalculator } from './abstract/base';

export class PipCalculator extends BaseCalculator<PipCalculatorState, number> {
  constructor() {
    super(initialPipCalculatorState);
  }

  public pipPrecision(precision: number) {
    return this.setValue('precision', precision);
  }

  public positionSize(size: number) {
    return this.setValue('size', size);
  }

  public currencyPairRate(rate: number) {
    return this.setValue('rate', rate);
  }

  public accountBaseRate(rate: number) {
    return this.setValue('baseRate', rate);
  }

  public listedSecond(second: boolean) {
    return this.setValue('second', second);
  }

  public value(): number {
    if (this.result !== null) {
      return this.result;
    }

    const { precision, rate, size, baseRate, second } = this.validState;
    const decimalPip = new BigNumber(1).dividedBy(Math.pow(10, precision));

    return (this.result = decimalPip
      .dividedBy(second ? 1 : rate)
      .dividedBy(baseRate)
      .multipliedBy(size)
      .toNumber());
  }
}

export function pip() {
  return new PipCalculator();
}

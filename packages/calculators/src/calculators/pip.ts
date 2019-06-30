import { BigNumber } from 'bignumber.js'

import { BaseCalculator } from '../abstract/base';

type PipCalculatorState = {
  baseRate: number;
  precision: number;
  rate: number;
  second: boolean;
  size: number;
};

const initialPipCalculatorState = {
  baseRate: 1,
  precision: 4,
  rate: 1,
  second: false,
  size: 1,
};

class PipCalculator extends BaseCalculator<PipCalculatorState, number> {
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
      .toNumber()
    );
  }
}

export function pip() {
  return new PipCalculator();
}

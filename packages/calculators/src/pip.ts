import { BaseCalculator } from './base';

type PipCalculatorData = {
  baseRate: number;
  precision: number;
  rate: number;
  second: boolean;
  size: number;
};

class PipCalculator extends BaseCalculator<PipCalculatorData> {
  protected data: PipCalculatorData = {
    baseRate: 1,
    precision: 4,
    rate: 1,
    second: false,
    size: 1,
  };

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

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    const { precision, rate, size, baseRate, second } = this.data;
    const decimalPip = 1 / Math.pow(10, precision);

    return (this.result = (decimalPip / (second ? 1 : rate) / baseRate) * size);
  }
}

export function pip() {
  return new PipCalculator();
}

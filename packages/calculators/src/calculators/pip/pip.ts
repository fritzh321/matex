import { BigNumber } from 'bignumber.js';

import {
  initialPipValueCalculatorState,
  PipValueCalculatorState,
} from '../../states/pip-value.state';

import { BaseCalculator } from '../abstract/base';

export class PipValueCalculator extends BaseCalculator<
  PipValueCalculatorState,
  number
> {
  constructor() {
    super(initialPipValueCalculatorState);
  }

  public baseExchangeRate(baseExchangeRate: number) {
    return this.setValue('baseExchangeRate', baseExchangeRate);
  }

  public baseListedSecond(baseListedSecond: boolean) {
    return this.setValue('baseListedSecond', baseListedSecond);
  }

  public pipPrecision(pipPrecision: number) {
    return this.setValue('pipPrecision', pipPrecision);
  }

  public positionSize(positionSize: number) {
    return this.setValue('positionSize', positionSize);
  }

  public tradingPairExchangeRate(tradingPairExchangeRate: number) {
    return this.setValue('tradingPairExchangeRate', tradingPairExchangeRate);
  }

  public value(): number {
    if (this.result !== null) {
      return this.result;
    }

    return (this.result = pipValue(this.validState));
  }
}

export const pipValue = (state: PipValueCalculatorState) => {
  const {
    baseExchangeRate,
    baseListedSecond,
    pipPrecision,
    positionSize,
    tradingPairExchangeRate,
  } = state;

  const decimalPip = new BigNumber(1).dividedBy(Math.pow(10, pipPrecision));

  return decimalPip
    .dividedBy(baseListedSecond ? 1 : tradingPairExchangeRate)
    .dividedBy(baseExchangeRate)
    .multipliedBy(positionSize)
    .toNumber();
};

export function pip() {
  return new PipValueCalculator();
}

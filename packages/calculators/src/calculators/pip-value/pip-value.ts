import { BigNumber } from 'bignumber.js';

import {
  initialPipValueState,
  PipValueState,
} from '../../states/pip-value.state';

import { BaseCalculator } from '../abstract/base';

export class PipValueCalculator extends BaseCalculator<PipValueState, number> {
  constructor() {
    super(initialPipValueState);
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

export const pipValue = (state: PipValueState) => {
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

export const pip = () => {
  return new PipValueCalculator();
};

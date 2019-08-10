import { BigNumber } from 'bignumber.js';

import { applyMixins } from '../../helpers/mixin.helper';
import { BaseCalculator } from '../abstract/base';
import { PipValueMixin } from './pip-value.mixin';

import {
  initialPipValueState,
  PipValueState,
} from '../../states/pip-value.state';

export class PipValueCalculator<
  S extends PipValueState = PipValueState,
  R = number
> extends BaseCalculator<S, R> implements PipValueMixin<S> {
  public baseExchangeRate: (baseExchangeRate: number) => this;

  public baseListedSecond: (baseListedSecond: boolean) => this;

  public pipPrecision: (pipPrecision: number) => this;

  public positionSize: (positionSize: number) => this;

  public tradingPairExchangeRate: (tradingPairExchangeRate: number) => this;

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    return (this.result = (this.computePipValue() as unknown) as R);
  }

  protected computePipValue() {
    return pipValue(this.validState);
  }
}

applyMixins(PipValueCalculator, [PipValueMixin]);

export const pipValue = (state: PipValueState) => {
  const {
    baseExchangeRate,
    baseListedSecond,
    pipPrecision,
    positionSize,
    tradingPairExchangeRate,
  } = state;

  const decimalPip = new BigNumber(1).dividedBy(
    new BigNumber(10).pow(pipPrecision),
  );

  return decimalPip
    .dividedBy(baseListedSecond ? 1 : tradingPairExchangeRate)
    .dividedBy(baseExchangeRate)
    .multipliedBy(positionSize)
    .toNumber();
};

export const pip = () => {
  return new PipValueCalculator<PipValueState, number>(initialPipValueState);
};

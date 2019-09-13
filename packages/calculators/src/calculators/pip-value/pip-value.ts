import { BigNumber } from 'bignumber.js';

import {
  LotDescriptor,
  LotDescriptors,
} from '../../descriptors/lot.descriptor';
import { applyMixins } from '../../helpers/mixin.helper';
import { LotMixin } from '../../mixins/lot.mixin';
import { PipValueMixin } from '../../mixins/pip-value.mixin';
import { StateValidator } from '../../types';
import { pipValueValidators } from '../../validators/pip-value.validator';
import { BaseCalculator } from '../abstract/base';

import {
  initialPipValueState,
  PipValueState,
} from '../../states/pip-value.state';

export class PipValueCalculator<
  S extends PipValueState = PipValueState,
  R = number
> extends BaseCalculator<S, R> implements PipValueMixin<S>, LotMixin<S> {
  public baseExchangeRate: (baseExchangeRate: number) => this;

  public baseListedSecond: (baseListedSecond: boolean) => this;

  public pipPrecision: (pipPrecision: number) => this;

  public tradingPairExchangeRate: (tradingPairExchangeRate: number) => this;

  public lotDescriptors: (lotDescriptors: LotDescriptors) => this;

  public lot: (lot: number) => this;

  public microLot: (microLot: number) => this;

  public miniLot: (miniLot: number) => this;

  public nanoLot: (nanoLot: number) => this;

  public getPositionSizeWithLotDescriptorAndValue: (
    lotDescriptor: LotDescriptor,
    value: number,
  ) => number;

  constructor(
    protected initialState: S = initialPipValueState as S,
    protected validators: Array<StateValidator<S>> = pipValueValidators,
  ) {
    super(initialState, validators);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    return (this.result = (this.computePipValue() as unknown) as R);
  }

  public positionSize(positionSize: number) {
    return this.setValue('positionSize', positionSize);
  }

  protected computePipValue() {
    if (this.isValid()) {
      return pipValue(this.validState);
    }

    return 0;
  }
}

applyMixins(PipValueCalculator, [PipValueMixin, LotMixin]);

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
    .dividedBy(baseExchangeRate || 1)
    .multipliedBy(positionSize)
    .toNumber();
};

export const pip = () => {
  return new PipValueCalculator();
};

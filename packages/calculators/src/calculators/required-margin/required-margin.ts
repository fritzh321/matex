import { applyMixins } from '@tutils/helpers';
import { BigNumber } from 'bignumber.js';

import { LotMixin } from '../../mixins/lot.mixin';
import { StateValidator } from '../../types';
import { BaseCalculator } from '../abstract/base';

import {
  initialRequiredMarginState,
  RequiredMarginState,
} from '../../states/required-margin.state';

import {
  LotDescriptor,
  LotDescriptors,
} from '../../descriptors/lot.descriptor';

export class RequiredMarginCalculator<
  S extends RequiredMarginState = RequiredMarginState,
  R = number
> extends BaseCalculator<S, R> implements LotMixin<S> {
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
    protected initialState: S = initialRequiredMarginState as S,
    protected validators?: Array<StateValidator<S>>,
  ) {
    super(initialState, validators);
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

    return (this.result = (new BigNumber(positionSize)
      .dividedBy(leverage)
      .multipliedBy(baseExchangeRate)
      .toNumber() as unknown) as R);
  }
}

applyMixins(RequiredMarginCalculator, [LotMixin]);

export const requiredMargin = () => {
  return new RequiredMarginCalculator();
};

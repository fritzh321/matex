import { applyMixins } from '@tutils/helpers';
import { BigNumber } from 'bignumber.js';

import { LotMixin } from '../../mixins/lot.mixin';
import { PipValueMixin } from '../../mixins/pip-value.mixin';
import { requiredMarginValidators } from '../../validators';
import { PipValueCalculator } from '../pip-value/pip-value';

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
  > extends PipValueCalculator<S, R> implements PipValueMixin<S>, LotMixin<S> {
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
    protected validators = requiredMarginValidators,
  ) {
    super(initialState, validators);
  }

  public leverage(leverage: number) {
    return this.setValue('leverage', leverage);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    const {
      positionSize,
      tradingPairExchangeRate,
      leverage,
      baseListedSecond,
      baseExchangeRate,
    } = this.validState;

    return (this.result = (new BigNumber(positionSize)
      .dividedBy(leverage)
      .multipliedBy(
        baseExchangeRate > 0 ?
          baseExchangeRate : baseListedSecond ?
            tradingPairExchangeRate : 1
      )
      .toNumber() as unknown) as R);
  }
}

applyMixins(RequiredMarginCalculator, [PipValueMixin, LotMixin]);

export const requiredMargin = () => {
  return new RequiredMarginCalculator();
};

import { BigNumber } from 'bignumber.js';

import {
  LotDescriptor,
  LotDescriptors,
} from '../../descriptors/lot.descriptor';
import { applyMixins } from '../../helpers/mixin.helper';
import { LotMixin } from '../../mixins/lot.mixin';
import { BaseCalculator } from '../abstract/base';

import {
  initialRequiredMarginState,
  RequiredMarginState,
} from '../../states/required-margin.state';

export class RequiredMarginCalculator
  extends BaseCalculator<RequiredMarginState, number>
  implements LotMixin<RequiredMarginState> {
  public lotDescriptors: (lotDescriptors: LotDescriptors) => this;

  public lot: (lot: number) => this;

  public microLot: (microLot: number) => this;

  public miniLot: (miniLot: number) => this;

  public nanoLot: (nanoLot: number) => this;

  public getPositionSizeWithLotDescriptorAndValue: (
    lotDescriptor: LotDescriptor,
    value: number,
  ) => number;

  constructor() {
    super(initialRequiredMarginState);
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

applyMixins(RequiredMarginCalculator, [LotMixin]);

export const requiredMargin = () => {
  return new RequiredMarginCalculator();
};

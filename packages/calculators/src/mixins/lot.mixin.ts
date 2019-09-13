import { BigNumber } from 'bignumber.js';

import { LotState } from '../states';

import { LotDescriptor, LotDescriptors } from '../descriptors/lot.descriptor';

export class LotMixin<S extends LotState = LotState> {
  public setValue: (key: keyof S, value: any) => this;

  public getValueForKey: (key: keyof S) => any;

  public lotDescriptors(lotDescriptors: LotDescriptors) {
    return this.setValue('lotDescriptors', lotDescriptors);
  }

  public lot(lot: number) {
    const positionSize = this.getPositionSizeWithLotDescriptorAndValue(
      this.getValueForKey('lotDescriptors').lot,
      lot,
    );
    return this.setValue('positionSize', positionSize);
  }

  public microLot(microLot: number) {
    const positionSize = this.getPositionSizeWithLotDescriptorAndValue(
      this.getValueForKey('lotDescriptors').microLot,
      microLot,
    );
    return this.setValue('positionSize', positionSize);
  }

  public miniLot(miniLot: number) {
    const positionSize = this.getPositionSizeWithLotDescriptorAndValue(
      this.getValueForKey('lotDescriptors').miniLot,
      miniLot,
    );
    return this.setValue('positionSize', positionSize);
  }

  public nanoLot(nanoLot: number) {
    const positionSize = this.getPositionSizeWithLotDescriptorAndValue(
      this.getValueForKey('lotDescriptors').nanoLot,
      nanoLot,
    );
    return this.setValue('positionSize', positionSize);
  }

  public getPositionSizeWithLotDescriptorAndValue(
    lotDescriptor: LotDescriptor,
    value: number,
  ) {
    const { exists, multiplier } = lotDescriptor;

    if (exists) {
      return new BigNumber(value).multipliedBy(multiplier).toNumber();
    }

    return 0;
  }
}

import { LotDescriptors } from '../descriptors/lot.descriptor';

export type LotState = {
  positionSize: number;
  lotDescriptors: LotDescriptors;
};

import { defaultLotDescriptors } from '../descriptors/lot.descriptor';
import { LotState } from './lot.state';

export type RequiredMarginState = {
  baseExchangeRate: number;
  leverage: number;
  positionSize: number;
} & LotState;

export const initialRequiredMarginState: RequiredMarginState = {
  baseExchangeRate: 1,
  leverage: 1,
  lotDescriptors: defaultLotDescriptors,
  positionSize: 0,
};

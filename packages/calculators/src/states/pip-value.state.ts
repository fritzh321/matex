import { defaultLotDescriptors } from '../descriptors/lot.descriptor';
import { LotState } from './lot.state';

export type PipValueState = {
  baseExchangeRate: number;
  baseListedSecond: boolean;
  pipPrecision: number;
  positionSize: number;
  tradingPairExchangeRate: number;
} & LotState;

export const initialPipValueState: PipValueState = {
  baseExchangeRate: 0,
  baseListedSecond: false,
  lotDescriptors: defaultLotDescriptors,
  pipPrecision: 4,
  positionSize: 0,
  tradingPairExchangeRate: 0,
};

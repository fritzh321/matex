import { LotState } from './lot.state';
import { initialPipValueState, PipValueState } from './pip-value.state';

export type RequiredMarginState = {
  leverage: number;
} & LotState & PipValueState;

export const initialRequiredMarginState: RequiredMarginState = {
  ...initialPipValueState,
  leverage: 1,
};

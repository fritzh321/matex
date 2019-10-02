import { initialPipValueState, PipValueState } from '@matex/calculators';

export interface IMatexPipValueState extends PipValueState {
  account: string | null;
  base: string | null;
  counter: string | null;
}

export const initialMatexPipValueState: IMatexPipValueState = {
  ...initialPipValueState,
  account: null,
  base: null,
  counter: null,
};

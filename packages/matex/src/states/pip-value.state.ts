import { initialPipValueState, PipValueState } from '@matex/calculators';

export type MatexPipValueStateType = PipValueState & {
  account: string | null;
  base: string | null;
  counter: string | null;
};

export const initialMatexPipValueState: MatexPipValueStateType = {
  ...initialPipValueState,
  account: null,
  base: null,
  counter: null,
};

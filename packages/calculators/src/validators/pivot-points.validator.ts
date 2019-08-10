import { PivotPointsMethodsEnum } from '../enums';
import { PivotPointsState } from '../states';
import { StateValidator } from '../types/state-validator.type';

export const pivotPointsValidators: Array<StateValidator<PivotPointsState>> = [
  (state: PivotPointsState) => {
    let isValid =
      state.lowPrice > 0 && state.highPrice > 0 && state.closePrice > 0;

    if (isValid) {
      isValid =
        state.highPrice >= state.lowPrice &&
        state.closePrice >= state.lowPrice &&
        state.closePrice <= state.highPrice;
    }

    return isValid;
  },
  (state: PivotPointsState) => {
    let isValid = true;

    if (state.method === PivotPointsMethodsEnum.DeMark) {
      isValid = state.openPrice > 0;

      if (isValid) {
        isValid =
          state.openPrice >= state.lowPrice &&
          state.openPrice <= state.highPrice;
      }
    }

    return isValid;
  },
];

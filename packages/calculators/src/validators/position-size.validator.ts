import { PositionSizeState } from '../states';
import { StateValidator } from '../types';

export const positionSizeValidators: Array<
  StateValidator<PositionSizeState>
> = [
  state => state.accountSize > 0,
  state => !!state.amountAtRisk || !!state.riskRatio,
  state => {
    let isValid = true;

    if (state.riskRatio) {
      isValid = state.riskRatio > 0 && state.riskRatio <= 100;
    }

    if (state.amountAtRisk) {
      isValid =
        state.amountAtRisk > 0 && state.amountAtRisk <= state.accountSize;
    }

    return isValid;
  },
];

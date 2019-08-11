import { StopLossTakeProfitState } from '../states';
import { StateValidator } from '../types';
import { pipValueValidators } from './pip-value.validator';

export const stopLossTakeProfitValidators: Array<
  StateValidator<StopLossTakeProfitState>
> = [
  ...pipValueValidators,
  state => state.entryPrice > 0,
  state => {
    const { stopLossAmount, stopLossPrice, stopLossPips } = state;
    const { takeProfitAmount, takeProfitPrice, takeProfitPips } = state;

    return (
      stopLossAmount > 0 ||
      stopLossPrice > 0 ||
      stopLossPips > 0 ||
      (takeProfitAmount > 0 || takeProfitPrice > 0 || takeProfitPips > 0)
    );
  },
];

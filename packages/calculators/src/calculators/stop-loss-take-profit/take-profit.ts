import { PositionEnum } from '../../enums';
import { applyMixins } from '../../helpers/mixin.helper';
import {
  initialTakeProfitState,
  TakeProfitState,
} from '../../states/take-profit.state';
import { TakeProfitResult } from '../../types';
import { PipValueCalculator } from '../pip-value/pip-value';
import { TakeProfitMixin } from './take-profit.mixin';

export class TakeProfitCalculator
  extends PipValueCalculator<TakeProfitState, TakeProfitResult>
  implements TakeProfitMixin<TakeProfitState> {
  public entryPrice: (entryPrice: number) => this;

  public position: (position: PositionEnum) => this;

  public takeProfitAmount: (takeProfitAmount: number) => this;

  public takeProfitPips: (takeProfitPips: number) => this;

  public takeProfitPrice: (takeProfitPrice: number) => this;

  constructor() {
    super(initialTakeProfitState);
  }
}

applyMixins(TakeProfitCalculator, [TakeProfitMixin]);

export const takeProfit = () => {
  return new TakeProfitCalculator();
};

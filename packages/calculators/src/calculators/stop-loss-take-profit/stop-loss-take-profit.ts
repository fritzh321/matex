import { PositionEnum } from '../../enums';
import { applyMixins } from '../../helpers/mixin.helper';
import { TakeProfitState } from '../../states/take-profit.state';
import { StopLossTakeProfitResult } from '../../types';
import { BaseCalculator } from '../abstract/base';
import { PipValueMixin } from '../pip-value/pip-value.mixin';
import { stopLoss } from './stop-loss';
import { StopLossMixin } from './stop-loss.mixin';
import { takeProfit } from './take-profit';
import { TakeProfitMixin } from './take-profit.mixin';

import {
  stopLossTakeProfitValidators
} from '../../validators/stop-loss-take-profit.validator'

import {
  initialStopLossTakeProfitState,
  StopLossTakeProfitState,
} from '../../states/stop-loss-take-profit.state';

export class StopLossTakeProfitCalculator
  extends BaseCalculator<StopLossTakeProfitState, StopLossTakeProfitResult>
  implements
    PipValueMixin<StopLossTakeProfitState>,
    StopLossMixin<StopLossTakeProfitState>,
    TakeProfitMixin<TakeProfitState> {
  public entryPrice: (entryPrice: number) => this;

  public position: (position: PositionEnum) => this;

  public takeProfitAmount: (takeProfitAmount: number) => this;

  public takeProfitPips: (takeProfitPips: number) => this;

  public takeProfitPrice: (takeProfitPrice: number) => this;

  public stopLossAmount: (stopLossAmount: number) => this;

  public stopLossPips: (stopLossPips: number) => this;

  public stopLossPrice: (stopLossPrice: number) => this;

  public baseExchangeRate: (baseExchangeRate: number) => this;

  public baseListedSecond: (baseListedSecond: boolean) => this;

  public pipPrecision: (pipPrecision: number) => this;

  public positionSize: (positionSize: number) => this;

  public tradingPairExchangeRate: (tradingPairExchangeRate: number) => this;

  constructor() {
    super(initialStopLossTakeProfitState, stopLossTakeProfitValidators);
  }

  public value(): StopLossTakeProfitResult {
    if (this.result !== null) {
      return this.result;
    }

    const stopLossCalculator = stopLoss();
    const takeProfitCalculator = takeProfit();

    return (this.result = {
      stopLoss: stopLossCalculator.value(),
      takeProfit: takeProfitCalculator.value(),
    });
  }
}

applyMixins(StopLossTakeProfitCalculator, [
  StopLossMixin,
  TakeProfitMixin,
  PipValueMixin,
]);

export const stopLossTakeProfit = () => {
  return new StopLossTakeProfitCalculator();
};

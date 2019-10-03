import { applyMixins } from '@tutils/helpers';
import BigNumber from 'bignumber.js';

import { PositionEnum } from '../../enums';
import { PipValueMixin } from '../../mixins/pip-value.mixin';
import { StopLossTakeProfitResult } from '../../types';
import { stopLossTakeProfitValidators } from '../../validators';
import { PipValueCalculator } from '../pip-value/pip-value';
import { stopLoss } from './stop-loss';
import { StopLossMixin } from './stop-loss.mixin';
import { takeProfit } from './take-profit';
import { TakeProfitMixin } from './take-profit.mixin';

import {
  initialStopLossTakeProfitState,
  StopLossTakeProfitState,
} from '../../states';

export const DEFAULT_RESULT: StopLossTakeProfitResult = Object.freeze({
  pipValue: 0,
  riskRewardRatio: 0,
  stopLoss: {
    amount: 0,
    pips: 0,
    price: 0,
  },
  takeProfit: {
    amount: 0,
    pips: 0,
    price: 0,
  },
});

export class StopLossTakeProfitCalculator<
  S extends StopLossTakeProfitState = StopLossTakeProfitState,
  R = StopLossTakeProfitResult
> extends PipValueCalculator<S, R>
  implements PipValueMixin<S>, StopLossMixin<S>, TakeProfitMixin<S> {
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

  constructor(
    protected initialState: S = initialStopLossTakeProfitState as S,
    protected validators = stopLossTakeProfitValidators,
  ) {
    super(initialState, validators);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    if (this.isValid()) {
      const pipValue = this.computePipValue();
      const stopLossCalculator = stopLoss();
      const takeProfitCalculator = takeProfit();

      const state = {
        ...this.validState,
        position: this.state.position,
      };

      const stopLossResult = stopLossCalculator.setState(state).value(pipValue);
      const takeProfitResult = takeProfitCalculator
        .setState(state)
        .value(pipValue);

      return (this.result = ({
        pipValue,
        riskRewardRatio: this.computeRiskRewardRatio(
          stopLossResult.amount,
          takeProfitResult.amount,
        ),
        stopLoss: stopLossResult,
        takeProfit: takeProfitResult,
      } as unknown) as R);
    }

    return (DEFAULT_RESULT as unknown) as R;
  }

  private computeRiskRewardRatio(
    stopLossAmount: number,
    takeProfitAmount: number,
  ) {
    let ratio = 0;

    if (stopLossAmount > 0 && takeProfitAmount > 0) {
      if (takeProfitAmount !== stopLossAmount) {
        ratio = new BigNumber(takeProfitAmount)
          .dividedBy(stopLossAmount)
          .toNumber();
      } else {
        ratio = 1;
      }
    }

    return ratio;
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

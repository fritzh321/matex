import { BigNumber } from 'bignumber.js';

import { PositionEnum } from '../../../src';
import { BaseCalculator } from '../abstract/base';

import {
  initialStopLossTakeProfitState,
  StopLossTakeProfitState,
} from '../../states/stop-loss-take-profit.state';

export class StopLossTakeProfitCalculator extends BaseCalculator<
  StopLossTakeProfitState,
  number
> {
  constructor() {
    super(initialStopLossTakeProfitState);
  }

  public baseExchangeRate(baseExchangeRate: number) {
    return this.setValue('baseExchangeRate', baseExchangeRate);
  }

  public baseListedSecond(baseListedSecond: boolean) {
    return this.setValue('baseListedSecond', baseListedSecond);
  }

  public pipPrecision(pipPrecision: number) {
    return this.setValue('pipPrecision', pipPrecision);
  }

  public positionSize(positionSize: number) {
    return this.setValue('positionSize', positionSize);
  }

  public tradingPairExchangeRate(tradingPairExchangeRate: number) {
    return this.setValue('tradingPairExchangeRate', tradingPairExchangeRate);
  }

  public entryPrice(entryPrice: number) {
    return this.setValue('entryPrice', entryPrice);
  }

  public position(position: PositionEnum) {
    return this.setValue('position', position);
  }

  public stopLossAmount(stopLossAmount: number) {
    return this.setValue('stopLossAmount', stopLossAmount);
  }

  public stopLossPips(stopLossPips: number) {
    return this.setValue('stopLossPips', stopLossPips);
  }

  public stopLossPrice(stopLossPrice: number) {
    return this.setValue('stopLossPrice', stopLossPrice);
  }

  public takeProfitAmount(takeProfitAmount: number) {
    return this.setValue('takeProfitAmount', takeProfitAmount);
  }

  public takeProfitPips(takeProfitPips: number) {
    return this.setValue('takeProfitPips', takeProfitPips);
  }

  public takeProfitPrice(takeProfitPrice: number) {
    return this.setValue('takeProfitPrice', takeProfitPrice);
  }

  public value(): number {
    if (this.result !== null) {
      return this.result;
    }

    // TODO
    return (this.result = new BigNumber(0).toNumber());
  }
}

export const stopLossTakeProfit = () => {
  return new StopLossTakeProfitCalculator();
};

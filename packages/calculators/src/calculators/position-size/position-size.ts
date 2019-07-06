import { BigNumber } from 'bignumber.js';

import {
  initialPositionSizeState,
  PositionSizeState,
} from 'src/states/position-size.state';

import { BaseCalculator } from '../abstract/base';
import { pip } from '../pip/pip';

export class PositionSizeCalculator extends BaseCalculator<
  PositionSizeState,
  number
> {
  constructor() {
    super(initialPositionSizeState);
  }

  public amountAtRisk(amountAtRisk: number) {
    return this.setValue('amountAtRisk', amountAtRisk);
  }

  public baseExchangeRate(baseExchangeRate: number) {
    return this.setValue('baseExchangeRate', baseExchangeRate);
  }

  public entryPrice(entryPrice: number) {
    return this.setValue('entryPrice', entryPrice);
  }

  public pipPrecision(pipPrecision: number) {
    return this.setValue('pipPrecision', pipPrecision);
  }

  public positionSize(size: number) {
    return this.setValue('positionSize', size);
  }

  public riskRatio(riskRatio: number) {
    return this.setValue('riskRatio', riskRatio);
  }

  public stopLossPips(stopLossPips: number) {
    return this.setValue('stopLossPips', stopLossPips);
  }

  public stopPrice(stopPrice: number) {
    return this.setValue('stopPrice', stopPrice);
  }

  public tradingPairExchangeRate(tradingPairExchangeRate: number) {
    return this.setValue('tradingPairExchangeRate', tradingPairExchangeRate);
  }

  public baseListedSecond(baseListedSecond: boolean) {
    return this.setValue('baseListedSecond', baseListedSecond);
  }

  public value(): number {
    if (this.result !== null) {
      return this.result;
    }

    if (this.valid()) {
      return new BigNumber(this.computeAmountAtRisk())
        .dividedBy(new BigNumber(this.computePipValue()).multipliedBy(2))
        .toNumber();
    }

    return 0;
  }

  protected computePipValue() {
    const {
      baseExchangeRate,
      baseListedSecond,
      pipPrecision,
      positionSize: size,
      tradingPairExchangeRate,
    } = this.validState;

    return pip()
      .setState({
        baseExchangeRate,
        baseListedSecond,
        pipPrecision,
        positionSize: size,
        tradingPairExchangeRate,
      })
      .value();
  }

  protected computeAmountAtRisk() {
    let { amountAtRisk = 0 } = this.validState;
    const { riskRatio, positionSize: tradingSize } = this.validState;

    if (riskRatio && tradingSize) {
      amountAtRisk = tradingSize
        ? new BigNumber(riskRatio)
            .multipliedBy(tradingSize)
            .dividedBy(100)
            .toNumber()
        : 0;
    }

    return amountAtRisk;
  }

  protected computeStopLossPip(pipPrecision = 4) {
    let { stopLossPips = 0 } = this.validState;
    const { entryPrice, stopPrice } = this.validState;

    if (!stopLossPips && entryPrice && stopPrice) {
      const deltaPrice = entryPrice - stopPrice;

      stopLossPips = new BigNumber(deltaPrice)
        .multipliedBy(new BigNumber(pipPrecision).pow(10))
        .toNumber();
    }

    return stopLossPips;
  }
}

export function positionSize() {
  return new PositionSizeCalculator();
}

import { BigNumber } from 'bignumber.js';

import { PositionEnum } from '../../enums';
import { applyMixins } from '../../helpers/mixin.helper';
import {
  initialStopLossState,
  StopLossState,
} from '../../states/stop-loss.state';
import { StopLossResult } from '../../types';
import { PipValueCalculator } from '../pip-value/pip-value';
import { StopLossMixin } from './stop-loss.mixin';

export class StopLossCalculator
  extends PipValueCalculator<StopLossState, StopLossResult>
  implements StopLossMixin<StopLossState> {
  public entryPrice: (entryPrice: number) => this;

  public position: (position: PositionEnum) => this;

  public stopLossAmount: (stopLossAmount: number) => this;

  public stopLossPips: (stopLossPips: number) => this;

  public stopLossPrice: (stopLossPrice: number) => this;

  constructor() {
    super(initialStopLossState);
  }

  public value(): StopLossResult {
    if (this.result !== null) {
      return this.result;
    }

    const pipValue = this.computePipValue();
    return (this.result = this.computeStopLossLevels(pipValue));
  }

  private computeStopLossLevels(pipValue: number): StopLossResult {
    const {
      pipPrecision,
      stopLossAmount,
      stopLossPips,
      stopLossPrice,
    } = this.validState;

    const divider = new BigNumber(10).pow(pipPrecision).toNumber();

    if (stopLossAmount) {
      return this.computeStopLossWithAmount(stopLossAmount, pipValue, divider);
    } else if (stopLossPips) {
      return this.computeStopLossWithPips(stopLossPips, pipValue, divider);
    } else if (stopLossPrice) {
      return this.computeStopLossWithPrice(stopLossPrice, pipValue, divider);
    }

    return this.buildStopLossResult();
  }

  private computeStopLossWithAmount(
    stopLossAmount: number,
    pipValue: number,
    divider: number,
  ): StopLossResult {
    const stopLossPips = new BigNumber(stopLossAmount)
      .dividedBy(pipValue)
      .toNumber();

    return this.buildStopLossResult(
      stopLossAmount,
      stopLossPips,
      this.computeStopLossPrice(stopLossPips, divider),
    );
  }

  private computeStopLossWithPrice(
    stopLossPrice: number,
    pipValue: number,
    divider: number,
  ): StopLossResult {
    const { position, entryPrice } = this.validState;
    let stopLossPips = new BigNumber(0);

    if (position === PositionEnum.Long && stopLossPrice < entryPrice) {
      stopLossPips = new BigNumber(entryPrice)
        .minus(stopLossPrice)
        .multipliedBy(divider);
    }

    if (position === PositionEnum.Short && stopLossPrice > entryPrice) {
      stopLossPips = new BigNumber(stopLossPrice)
        .minus(entryPrice)
        .multipliedBy(divider);
    }

    return this.buildStopLossResult(
      this.computeStopLossAmount(stopLossPrice, pipValue),
      stopLossPips.toNumber(),
      stopLossPrice,
    );
  }

  private computeStopLossWithPips(
    stopLossPips: number,
    pipValue: number,
    divider: number,
  ): StopLossResult {
    const stopLossPrice = this.computeStopLossPrice(stopLossPips, divider);

    return this.buildStopLossResult(
      this.computeStopLossAmount(stopLossPrice, pipValue),
      stopLossPips,
      stopLossPrice,
    );
  }
  private computeStopLossAmount(stopLossPrice: number, pipValue: number) {
    return new BigNumber(stopLossPrice).multipliedBy(pipValue).toNumber();
  }

  private computeStopLossPrice(stopLossPips: number, divider: number) {
    const { position, entryPrice } = this.validState;
    const deltaPrice = new BigNumber(stopLossPips).dividedBy(divider);
    const entryPriceBigNumber = new BigNumber(entryPrice);

    return (position === PositionEnum.Long
      ? entryPriceBigNumber.minus(deltaPrice)
      : entryPriceBigNumber.plus(deltaPrice)
    ).toNumber();
  }

  private buildStopLossResult(
    amount: number = 0,
    pips: number = 0,
    price: number = 0,
  ): StopLossResult {
    return {
      amount,
      pips,
      price,
    };
  }
}

applyMixins(StopLossCalculator, [StopLossMixin]);

export const stopLoss = () => {
  return new StopLossCalculator();
};

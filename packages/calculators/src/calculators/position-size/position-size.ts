import { BigNumber } from 'bignumber.js';

import { applyMixins } from '../../helpers/mixin.helper';
import { PositionSizeResult } from '../../types';
import { positionSizeValidators } from '../../validators/position-size.validator';
import { PipValueCalculator } from '../pip-value/pip-value';
import { PipValueMixin } from '../pip-value/pip-value.mixin';

import {
  initialPositionSizeState,
  PositionSizeState,
} from '../../states/position-size.state';

export const DEFAULT_RESULTS: PositionSizeResult = {
  amountAtRisk: 0,
  pipValue: 0,
  positionSize: 0,
  riskRatio: 0,
};

export class PositionSizeCalculator
  extends PipValueCalculator<PositionSizeState, PositionSizeResult>
  implements PipValueMixin<PositionSizeState> {
  public baseExchangeRate: (baseExchangeRate: number) => this;

  public baseListedSecond: (baseListedSecond: boolean) => this;

  public pipPrecision: (pipPrecision: number) => this;

  public tradingPairExchangeRate: (tradingPairExchangeRate: number) => this;

  constructor() {
    super(initialPositionSizeState, positionSizeValidators);
  }

  public positionSize() {
    return this.setValue('positionSize', 1);
  }

  public accountSize(accountSize: number) {
    return this.setValue('accountSize', accountSize);
  }

  public amountAtRisk(amountAtRisk: number) {
    this.setValue('riskRatio', 0);
    return this.setValue('amountAtRisk', amountAtRisk);
  }

  public entryPrice(entryPrice: number) {
    this.setValue('stopLossPips', 0);
    return this.setValue('entryPrice', entryPrice);
  }

  public riskRatio(riskRatio: number) {
    this.setValue('amountAtRisk', 0);
    return this.setValue('riskRatio', riskRatio);
  }

  public stopLossPips(stopLossPips: number) {
    this.setValue('entryPrice', 0);
    this.setValue('stopLossPrice', 0);
    return this.setValue('stopLossPips', stopLossPips);
  }

  public stopLossPrice(stopLossPrice: number) {
    this.setValue('stopLossPips', 0);
    return this.setValue('stopLossPrice', stopLossPrice);
  }

  public value(): PositionSizeResult {
    if (this.result !== null) {
      return this.result;
    }

    if (this.isValid()) {
      const { accountSize, pipPrecision } = this.validState;
      const stopLossPips = this.computeStopLossPip(pipPrecision);
      const amountAtRisk = this.computeAmountAtRisk();
      const riskRatio = this.computeRiskRatio(amountAtRisk, accountSize);
      const pipValue = this.computePipValue();
      const tradingSize =
        !!pipValue && stopLossPips
          ? this.computePositionSize(amountAtRisk, pipValue, stopLossPips)
          : 0;

      return (this.result = {
        amountAtRisk,
        pipValue: pipValue * tradingSize,
        positionSize: tradingSize,
        riskRatio,
      });
    }

    return (this.result = { ...DEFAULT_RESULTS });
  }

  protected computePositionSize(
    amountAtRisk: number,
    pipValue: number,
    stopLossPip: number,
  ) {
    return new BigNumber(amountAtRisk)
      .dividedBy(new BigNumber(pipValue).multipliedBy(stopLossPip))
      .toNumber();
  }

  protected computeRiskRatio(amountAtRisk: number, accountSize: number) {
    const { riskRatio } = this.validState;

    if (!riskRatio) {
      return new BigNumber(amountAtRisk)
        .multipliedBy(100)
        .dividedBy(accountSize)
        .toNumber();
    }

    return riskRatio;
  }

  protected computeAmountAtRisk() {
    let { amountAtRisk = 0 } = this.validState;
    const { riskRatio, accountSize } = this.validState;

    if (riskRatio > 0 && riskRatio <= 100) {
      amountAtRisk = accountSize
        ? new BigNumber(riskRatio)
            .multipliedBy(accountSize)
            .dividedBy(100)
            .toNumber()
        : 0;
    }

    return amountAtRisk;
  }

  protected computeStopLossPip(
    pipPrecision = initialPositionSizeState.pipPrecision,
  ) {
    let { stopLossPips = 0 } = this.validState;
    const { entryPrice, stopLossPrice } = this.validState;

    if (!stopLossPips && entryPrice && stopLossPrice) {
      const deltaPrice = new BigNumber(entryPrice).minus(stopLossPrice).abs();

      stopLossPips = deltaPrice
        .multipliedBy(new BigNumber(10).pow(pipPrecision))
        .toNumber();
    }

    return stopLossPips;
  }
}

applyMixins(PositionSizeCalculator, [PipValueMixin]);

export const positionSize = () => {
  return new PositionSizeCalculator();
};

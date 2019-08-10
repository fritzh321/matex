import { BigNumber } from 'bignumber.js';

import { PositionEnum } from '../../enums';
import { applyMixins } from '../../helpers/mixin.helper';
import { TakeProfitResult } from '../../types';
import { PipValueCalculator } from '../pip-value/pip-value';
import { TakeProfitMixin } from './take-profit.mixin';

import {
  initialTakeProfitState,
  TakeProfitState,
} from '../../states/take-profit.state';

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

  public value(): TakeProfitResult {
    if (this.result !== null) {
      return this.result;
    }

    const pipValue = this.computePipValue();
    return (this.result = this.computeTakeProfitLevels(pipValue));
  }

  private computeTakeProfitLevels(pipValue: number): TakeProfitResult {
    const {
      pipPrecision,
      takeProfitAmount,
      takeProfitPips,
      takeProfitPrice,
    } = this.validState;

    const divider = new BigNumber(10).pow(pipPrecision).toNumber();

    if (takeProfitAmount) {
      return this.computeTakeProfitWithAmount(
        takeProfitAmount,
        pipValue,
        divider,
      );
    } else if (takeProfitPips) {
      return this.computeTakeProfitWithPips(takeProfitPips, pipValue, divider);
    } else if (takeProfitPrice) {
      return this.computeTakeProfitWithPrice(
        takeProfitPrice,
        pipValue,
        divider,
      );
    }

    return this.buildTakeProfitResult();
  }

  private computeTakeProfitWithAmount(
    takeProfitAmount: number,
    pipValue: number,
    divider: number,
  ): TakeProfitResult {
    const takeProfitPips = new BigNumber(takeProfitAmount)
      .dividedBy(pipValue)
      .toNumber();

    return this.buildTakeProfitResult(
      takeProfitAmount,
      takeProfitPips,
      this.computeTakeProfitPrice(takeProfitPips, divider),
    );
  }

  private computeTakeProfitWithPrice(
    takeProfitPrice: number,
    pipValue: number,
    divider: number,
  ): TakeProfitResult {
    const { position, entryPrice } = this.validState;
    let takeProfitPips = new BigNumber(0);

    if (position === PositionEnum.Long && takeProfitPrice > entryPrice) {
      takeProfitPips = new BigNumber(takeProfitPrice)
        .minus(entryPrice)
        .multipliedBy(divider);
    }

    if (position === PositionEnum.Short && takeProfitPrice < entryPrice) {
      takeProfitPips = new BigNumber(entryPrice)
        .minus(takeProfitPrice)
        .multipliedBy(divider);
    }

    return this.buildTakeProfitResult(
      this.computeTakeProfitAmount(takeProfitPrice, pipValue),
      takeProfitPips.toNumber(),
      takeProfitPrice,
    );
  }

  private computeTakeProfitWithPips(
    takeProfitPips: number,
    pipValue: number,
    divider: number,
  ): TakeProfitResult {
    const takeProfitPrice = this.computeTakeProfitPrice(
      takeProfitPips,
      divider,
    );

    return this.buildTakeProfitResult(
      this.computeTakeProfitAmount(takeProfitPips, pipValue),
      takeProfitPips,
      takeProfitPrice,
    );
  }
  private computeTakeProfitAmount(takeProfitPips: number, pipValue: number) {
    return new BigNumber(takeProfitPips).multipliedBy(pipValue).toNumber();
  }

  private computeTakeProfitPrice(takeProfitPips: number, divider: number) {
    const { position, entryPrice } = this.validState;
    const deltaPrice = new BigNumber(takeProfitPips).dividedBy(divider);
    const entryPriceBigNumber = new BigNumber(entryPrice);

    return (position === PositionEnum.Long
      ? entryPriceBigNumber.plus(deltaPrice)
      : entryPriceBigNumber.minus(deltaPrice)
    ).toNumber();
  }

  private buildTakeProfitResult(
    amount: number = 0,
    pips: number = 0,
    price: number = 0,
  ): TakeProfitResult {
    return {
      amount,
      pips,
      price,
    };
  }
}

applyMixins(TakeProfitCalculator, [TakeProfitMixin]);

export const takeProfit = () => {
  return new TakeProfitCalculator();
};

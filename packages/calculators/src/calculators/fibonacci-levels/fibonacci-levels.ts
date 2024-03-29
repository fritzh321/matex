import { sortNumbers } from '@tutils/helpers';
import { BigNumber } from 'bignumber.js';

import { TrendEnum } from '../../enums';
import { fibonacciLevelsValidators } from '../../validators/fibonacci-levels.validator';
import { BaseCalculator } from '../abstract/base';

import {
  FibonacciLevelsState,
  initialFibonacciLevelsState,
} from '../../states/fibonacci-levels.state';

import {
  FibonacciLevel,
  FibonacciLevelsResult,
} from '../../types/fibonacci.type';

export class FibonacciLevelsCalculator<
  S extends FibonacciLevelsState = FibonacciLevelsState,
  R = FibonacciLevelsResult
> extends BaseCalculator<S, R> {
  constructor(
    protected initialState: S = initialFibonacciLevelsState as S,
    protected validators = fibonacciLevelsValidators,
  ) {
    super(initialState, validators);
  }

  public customPrice(customPrice: number) {
    return this.setValue('customPrice', customPrice);
  }

  public extensionLevels(
    extensionLevels = initialFibonacciLevelsState.extensionLevels,
  ) {
    return this.setValue('extensionLevels', sortNumbers(extensionLevels));
  }

  public highPrice(highPrice: number) {
    return this.setValue('highPrice', highPrice);
  }

  public lowPrice(lowPrice: number) {
    return this.setValue('lowPrice', lowPrice);
  }

  public precision(precision: number = initialFibonacciLevelsState.precision) {
    return this.setValue('precision', precision);
  }

  public retracementLevels(
    retracementLevels = initialFibonacciLevelsState.retracementLevels,
  ) {
    return this.setValue('retracementLevels', sortNumbers(retracementLevels));
  }

  public trend(trend: TrendEnum = initialFibonacciLevelsState.trend) {
    return this.setValue('trend', trend);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    return (this.result = ({
      extensionLevels: this.computeExtensions(),
      retracementLevels: this.computeRetracements(),
    } as unknown) as R);
  }

  private computeExtensions() {
    const { trend, extensionLevels } = this.state;
    const { highPrice, lowPrice } = this.validState;
    const delta = highPrice - lowPrice;

    if (trend === TrendEnum.Up) {
      return extensionLevels
        .slice()
        .reverse()
        .map(level => {
          return this.makeFibonacciLevel(
            level,
            new BigNumber(level)
              .dividedBy(100)
              .multipliedBy(delta)
              .plus(highPrice)
              .toNumber(),
          );
        });
    }

    return extensionLevels.map(level => {
      return this.makeFibonacciLevel(
        level,
        new BigNumber(level)
          .dividedBy(100)
          .multipliedBy(delta)
          .negated()
          .plus(lowPrice)
          .toNumber(),
      );
    });
  }

  private computeRetracements() {
    const { trend, retracementLevels } = this.state;
    const { highPrice, lowPrice } = this.validState;
    const delta = highPrice - lowPrice;

    if (trend === TrendEnum.Down) {
      return retracementLevels
        .slice()
        .reverse()
        .map(level => {
          return this.makeFibonacciLevel(
            level,
            new BigNumber(level)
              .dividedBy(100)
              .multipliedBy(delta)
              .plus(lowPrice)
              .toNumber(),
          );
        });
    }

    return retracementLevels.map(level => {
      return this.makeFibonacciLevel(
        level,
        new BigNumber(level)
          .dividedBy(100)
          .multipliedBy(delta)
          .negated()
          .plus(highPrice)
          .toNumber(),
      );
    });
  }

  private formatLevelLabel(level: number) {
    const bigNumber = new BigNumber(level);
    const fixedValue = bigNumber.toFixed(level % 1 === 0 ? 0 : 1);
    return `${fixedValue}%`;
  }

  private formatLevelValue(value: number) {
    const bigNumber = new BigNumber(value);
    const { precision } = this.state;
    return +bigNumber.toFixed(precision);
  }

  private makeFibonacciLevel(level: number, value: number): FibonacciLevel {
    return {
      level: this.formatLevelLabel(level),
      value: this.formatLevelValue(value),
    };
  }
}

export const fibonacciLevels = () => {
  return new FibonacciLevelsCalculator();
};

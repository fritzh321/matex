import { BigNumber } from 'bignumber.js';

import { TrendEnum } from '../../enums/trend.enum';
import { sortNumbers } from '../../helpers/sort.helper';
import { fibonacciLevelsValidators } from '../../validators/fibonacci.validator';
import { BaseCalculator } from '../abstract/base';

import {
  FibonacciLevelsState,
  initialFibonacciLevelsState,
} from '../../states/fibonacci.state';

import {
  FibonacciExtensionType,
  FibonacciLevel,
  FibonacciLevelsResult,
  FibonacciRetracementType,
} from '../../types/fibonacci.type';

export class FibonacciLevelsCalculator extends BaseCalculator<
  FibonacciLevelsState,
  FibonacciLevelsResult
> {
  constructor() {
    super(initialFibonacciLevelsState, fibonacciLevelsValidators);
  }

  public customPrice(customPrice: number) {
    return this.setValue('customPrice', customPrice);
  }

  public extensionLevels(extensionLevels: FibonacciExtensionType[]) {
    return this.setValue(
      'extensionLevels',
      sortNumbers(extensionLevels, false),
    );
  }

  public highPrice(highPrice: number) {
    return this.setValue('highPrice', highPrice);
  }

  public lowPrice(lowPrice: number) {
    return this.setValue('lowPrice', lowPrice);
  }

  public precision(precision: number) {
    return this.setValue('precision', precision);
  }

  public retracementLevels(retracementLevels: FibonacciRetracementType[]) {
    return this.setValue('retracementLevels', sortNumbers(retracementLevels));
  }

  public trend(trend: TrendEnum) {
    return this.setValue('trend', trend);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    return (this.result = {
      extensionLevels: this.computeExtensions(),
      retracementLevels: this.computeRetracements(),
    });
  }

  private computeExtensions() {
    const { trend, highPrice, lowPrice, extensionLevels } = this.validState;
    const delta = highPrice - lowPrice;

    if (trend === 'down') {
      return extensionLevels
        .slice()
        .reverse()
        .map(level => {
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

    return extensionLevels.map(level => {
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

  private computeRetracements() {
    const { trend, highPrice, lowPrice, retracementLevels } = this.validState;
    const delta = highPrice - lowPrice;

    if (trend === 'down') {
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

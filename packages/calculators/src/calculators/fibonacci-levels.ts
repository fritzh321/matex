import { BigNumber } from 'bignumber.js';
import { TrendEnum } from '../enums/trend.enum';
import { fibonacciLevelsValidators } from '../validators/fibonacci.validator';
import { BaseCalculator } from './abstract/base';

import {
  FibonacciLevelsState,
  initialFibonacciLevelsState,
} from '../states/fibonacci.state';

import {
  FibonacciExtensionType,
  FibonacciLevel,
  FibonacciLevelsResult,
  FibonacciRetracementType,
} from '../types/fibonacci.type';

export class FibonacciLevelsCalculator extends BaseCalculator<
  FibonacciLevelsState,
  FibonacciLevelsResult
> {
  constructor() {
    super(initialFibonacciLevelsState, fibonacciLevelsValidators);
  }

  public custom(custom: number) {
    return this.setValue('custom', custom);
  }

  public extensions(extensions: FibonacciExtensionType[]) {
    return this.setValue('extensions', this.sortNumbers(extensions, false));
  }

  public high(high: number) {
    return this.setValue('high', high);
  }

  public low(low: number) {
    return this.setValue('low', low);
  }

  public precision(precision: number) {
    return this.setValue('precision', precision);
  }

  public retracements(retracements: FibonacciRetracementType[]) {
    return this.setValue('retracements', this.sortNumbers(retracements));
  }

  public trend(trend: TrendEnum) {
    return this.setValue('trend', trend);
  }

  public value() {
    if (this.result !== null) {
      return this.result;
    }

    return (this.result = {
      extensions: this.computeExtensions(),
      retracements: this.computeRetracements(),
    });
  }

  private computeExtensions() {
    const { trend, high, low, extensions } = this.validState;
    const delta = high - low;

    if (trend === 'down') {
      return extensions
        .slice()
        .reverse()
        .map(level => {
          return this.makeFibonacciLevel(
            level,
            new BigNumber(level)
              .dividedBy(100)
              .multipliedBy(delta)
              .negated()
              .plus(low)
              .toNumber(),
          );
        });
    }

    return extensions.map(level => {
      return this.makeFibonacciLevel(
        level,
        new BigNumber(level)
          .dividedBy(100)
          .multipliedBy(delta)
          .plus(high)
          .toNumber(),
      );
    });
  }

  private computeRetracements() {
    const { trend, high, low, retracements } = this.validState;
    const delta = high - low;

    if (trend === 'down') {
      return retracements
        .slice()
        .reverse()
        .map(level => {
          return this.makeFibonacciLevel(
            level,
            new BigNumber(level)
              .dividedBy(100)
              .multipliedBy(delta)
              .plus(low)
              .toNumber(),
          );
        });
    }

    return retracements.map(level => {
      return this.makeFibonacciLevel(
        level,
        new BigNumber(level)
          .dividedBy(100)
          .multipliedBy(delta)
          .negated()
          .plus(high)
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

export function fibonacciLevels() {
  return new FibonacciLevelsCalculator();
}

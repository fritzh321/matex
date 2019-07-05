import { BigNumber } from 'bignumber.js';
import { BaseCalculator } from './abstract/base';
import { TrendEnum } from '../enums/trend';
import {
  FibonnaciLevelsState,
  initialFibonnaciLevelsState,
} from '../states/fibonnaci.state';
import {
  FibonnaciExtensionType,
  FibonnaciLevel,
  FibonnaciLevelsResult,
  FibonnaciRetracementType,
} from '../types/fibonnaci.type';
import { fibonnaciLevelsValidators } from '../validators/fibonnaci.validator';

class FibonnaciLevelsCalculator extends BaseCalculator<
  FibonnaciLevelsState,
  FibonnaciLevelsResult
> {
  constructor() {
    super(initialFibonnaciLevelsState, fibonnaciLevelsValidators);
  }

  public custom(custom: number) {
    return this.setValue('custom', custom);
  }

  public extensions(extensions: FibonnaciExtensionType[]) {
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

  public retracements(retracements: FibonnaciRetracementType[]) {
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
          return this.makeFibonnaciLevel(
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
      return this.makeFibonnaciLevel(
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
          return this.makeFibonnaciLevel(
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
      return this.makeFibonnaciLevel(
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

  private makeFibonnaciLevel(level: number, value: number): FibonnaciLevel {
    return {
      label: this.formatLevelLabel(level),
      value: this.formatLevelValue(value),
    };
  }
}

export function fibonnaciLevels() {
  return new FibonnaciLevelsCalculator();
}

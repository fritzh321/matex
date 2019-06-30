import { BigNumber } from 'bignumber.js'
import { BaseCalculator } from '../abstract/base';
import { TrendEnum } from '../enums/trend';
import {
  FibonnaciExtensionType,
  FibonnaciLevel,
  FibonnaciLevelsResult,
  FibonnaciLevelsState,
  FibonnaciRetracementType,
} from '../types/fibonnaci';
import { StateValidator } from '../types/state-validator';

const initialState: FibonnaciLevelsState = {
  custom: 0,
  extensions: [261.8, 200, 161.8, 138.2, 100, 61.8, 50, 38.2, 23.6],
  high: 0,
  low: 0,
  precision: 5,
  retracements: [23.6, 38.2, 50, 61.8, 78.6],
  trend: TrendEnum.Up,
};

const fibonnaciLevelsValidators: Array<StateValidator<FibonnaciLevelsState>> = [
  (state: FibonnaciLevelsState) => {
    if (state.low > 0 || state.high > 0) {
      return state.high > state.low;
    }

    return true;
  }
];

class FibonnaciLevelsCalculator
  extends BaseCalculator<FibonnaciLevelsState, FibonnaciLevelsResult> {

  constructor() {
    super(initialState, fibonnaciLevelsValidators);
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
      return extensions.slice().reverse().map(level => {
        return this.makeFibonnaciLevel(
          level,
          new BigNumber(level)
            .dividedBy(100)
            .multipliedBy(delta)
            .negated()
            .plus(low)
            .toNumber()
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
          .toNumber()
      );
    });
  }

  private computeRetracements() {
    const { trend, high, low, retracements } = this.validState;
    const delta = high - low;

    if (trend === 'down') {
      return retracements.slice().reverse().map(level => {
        return this.makeFibonnaciLevel(
          level,
          new BigNumber(level)
            .dividedBy(100)
            .multipliedBy(delta)
            .plus(low)
            .toNumber()
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
          .toNumber()
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

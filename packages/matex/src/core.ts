import {
  FormatterProvider,
  InstrumentProvider,
  ReporterProvider,
} from '@matex/providers';

import { IMatexConfig } from './interfaces';

import {
  fibonacciLevels,
  pip,
  pivotPoints,
  positionSize,
  requiredMargin,
  stopLossTakeProfit,
} from './wrappers';

const defaultMatexConfig: IMatexConfig = {
  exchangeProvider: {
    rates(base: string, counter: string) {
      return {
        price: 1,
        symbol: '$',
        timestamp: Date.now(),
      };
    },
  },
  formatterProvider: new FormatterProvider(),
  instrumentProvider: new InstrumentProvider(),
  reporterProvider: new ReporterProvider(),
};

export class Matex {
  private config: IMatexConfig;

  constructor(config = defaultMatexConfig) {
    this.config = {
      ...defaultMatexConfig,
      ...config,
    };
  }

  public pip() {
    return pip(this.config);
  }

  public pivotPoints() {
    return pivotPoints(this.config);
  }

  public fibonacciLevels() {
    return fibonacciLevels(this.config);
  }

  public requiredMargin() {
    return requiredMargin(this.config);
  }

  public positionSize() {
    return positionSize(this.config);
  }

  public stopLossTakeProfit() {
    return stopLossTakeProfit(this.config);
  }
}

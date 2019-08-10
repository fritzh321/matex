import { PivotPointsMethodsEnum } from '../../enums';
import { PivotPointsResult } from '../../types';
import { pivotPointsValidators } from '../../validators/pivot-points.validator';
import { BaseCalculator } from '../abstract/base';
import { pivotPointsCamarilla } from './pivot-points-camarilla';
import { pivotPointsDeMark } from './pivot-points-demark';
import { pivotPointsFibonacci } from './pivot-points-fibonacci';
import { pivotPointsStandard } from './pivot-points-stantard';
import { pivotPointsWoodie } from './pivot-points-woodie';

import {
  initialPivotPointsState,
  PivotPointsState,
} from '../../states/pivot-points.state';

export class PivotPointsCalculator extends BaseCalculator<
  PivotPointsState,
  PivotPointsResult
> {
  constructor() {
    super(initialPivotPointsState, pivotPointsValidators);
  }

  public closePrice(closePrice: number) {
    return this.setValue('closePrice', closePrice);
  }

  public highPrice(highPrice: number) {
    return this.setValue('highPrice', highPrice);
  }

  public lowPrice(lowPrice: number) {
    return this.setValue('lowPrice', lowPrice);
  }

  public method(method: PivotPointsMethodsEnum) {
    return this.setValue('method', method);
  }

  public openPrice(openPrice: number) {
    return this.setValue('openPrice', openPrice);
  }

  // tslint:disable-next-line: cyclomatic-complexity
  public value() {
    if (this.result !== null) {
      return this.result;
    }

    const { method, closePrice, highPrice, lowPrice } = this.validState;
    let result: PivotPointsResult;

    switch (method) {
      case PivotPointsMethodsEnum.Camarilla:
        result = pivotPointsCamarilla(highPrice, lowPrice, closePrice);
        break;
      case PivotPointsMethodsEnum.DeMark:
        const { openPrice } = this.validState;
        result = pivotPointsDeMark(highPrice, lowPrice, closePrice, openPrice);
        break;
      case PivotPointsMethodsEnum.Fibonacci:
        result = pivotPointsFibonacci(highPrice, lowPrice, closePrice);
        break;
      case PivotPointsMethodsEnum.Woodie:
        result = pivotPointsWoodie(highPrice, lowPrice, closePrice);
        break;
      default:
        result = pivotPointsStandard(highPrice, lowPrice, closePrice);
        break;
    }

    return (this.result = result);
  }
}

export const pivotPoints = () => {
  return new PivotPointsCalculator();
};

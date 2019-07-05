import { PivotPointsMethodsEnum } from '../../enums/pivot-points-methods.enum';
import { PivotPointsResult } from '../../types';
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
    super(initialPivotPointsState);
  }

  public close(close: number) {
    return this.setValue('close', close);
  }

  public high(high: number) {
    return this.setValue('high', high);
  }

  public low(low: number) {
    return this.setValue('low', low);
  }

  public open(open: number) {
    return this.setValue('open', open);
  }

  public method(method: PivotPointsMethodsEnum) {
    return this.setValue('method', method);
  }

  // tslint:disable-next-line: cyclomatic-complexity
  public value() {
    if (this.result !== null) {
      return this.result;
    }

    const { method, close, high, low } = this.validState;
    let result: PivotPointsResult;

    switch (method) {
      case PivotPointsMethodsEnum.Camarilla:
        result = pivotPointsCamarilla(high, low, close);
        break;
      case PivotPointsMethodsEnum.DeMark:
        const { open } = this.validState;
        result = pivotPointsDeMark(high, low, close, open);
        break;
      case PivotPointsMethodsEnum.Fibonacci:
        result = pivotPointsFibonacci(high, low, close);
        break;
      case PivotPointsMethodsEnum.Woodie:
        result = pivotPointsWoodie(high, low, close);
        break;
      default:
        result = pivotPointsStandard(high, low, close);
        break;
    }

    return (this.result = result);
  }
}

export function pivotPoints() {
  return new PivotPointsCalculator();
}

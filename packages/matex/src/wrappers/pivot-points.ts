import {
  PivotPointsCalculator,
  PivotPointsResult,
  PivotPointsState,
} from '@matex/calculators';

import { IMatexConfig } from '../interfaces';

export class MatexPivotPointsCalculator extends PivotPointsCalculator<
  PivotPointsState,
  Promise<PivotPointsResult>
> {
  constructor(protected config: IMatexConfig) {
    super();
  }

  public async value() {
    return super.value();
  }
}

export const pivotPoints = (config: IMatexConfig) => {
  return new MatexPivotPointsCalculator(config);
};

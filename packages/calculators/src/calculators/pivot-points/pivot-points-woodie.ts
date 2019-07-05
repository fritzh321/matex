import { BigNumber } from 'bignumber.js';

import { PivotPointsResult } from '../../types';

export const pivotPointsWoodie = (
  high: number,
  low: number,
  close: number,
): PivotPointsResult => {
  const pivotPoint = new BigNumber(close)
    .multipliedBy(2)
    .plus(low)
    .plus(high)
    .dividedBy(4);

  const resistance1 = new BigNumber(pivotPoint).multipliedBy(2).minus(low);

  const resistance2 = new BigNumber(pivotPoint).plus(high).minus(low);

  const support1 = new BigNumber(pivotPoint).multipliedBy(2).minus(high);

  const support2 = new BigNumber(pivotPoint).minus(high).plus(low);

  return {
    pivotPoint: pivotPoint.toNumber(),
    resistances: [resistance1.toNumber(), resistance2.toNumber()],
    supports: [support1.toNumber(), support2.toNumber()],
  };
};

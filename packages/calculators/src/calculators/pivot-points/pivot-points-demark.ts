import { BigNumber } from 'bignumber.js';

import { PivotPointsResult } from '../../types';

export const pivotPointsDeMark = (
  high: number,
  low: number,
  close: number,
  open: number,
): PivotPointsResult => {
  let pivotPoint: BigNumber;

  if (close < open) {
    pivotPoint = new BigNumber(low)
      .multipliedBy(2)
      .plus(high)
      .plus(close);
  } else if (close > open) {
    pivotPoint = new BigNumber(2)
      .multipliedBy(high)
      .plus(low)
      .plus(close);
  } else {
    pivotPoint = new BigNumber(close)
      .multipliedBy(2)
      .plus(high)
      .plus(low);
  }

  const resistance1 = new BigNumber(pivotPoint).dividedBy(2).minus(low);

  const support1 = new BigNumber(pivotPoint).dividedBy(2).minus(high);

  return {
    pivotPoint: pivotPoint.dividedBy(4).toNumber(),
    resistances: [resistance1.toNumber()],
    supports: [support1.toNumber()],
  };
};

import { BigNumber } from 'bignumber.js';

import { PivotPointsResult } from '../../types';

export const pivotPointsStandard = (
  high: number,
  low: number,
  close: number,
): PivotPointsResult => {
  const pivotPoint = new BigNumber(high)
    .plus(low)
    .plus(close)
    .dividedBy(3);

  const resistance1 = new BigNumber(pivotPoint).multipliedBy(2).minus(low);

  const resistance2 = new BigNumber(pivotPoint).plus(
    new BigNumber(high).minus(low),
  );

  const resistance3 = new BigNumber(new BigNumber(pivotPoint).minus(low))
    .multipliedBy(2)
    .plus(high);

  const support1 = new BigNumber(pivotPoint).multipliedBy(2).minus(high);

  const support2 = new BigNumber(pivotPoint).minus(
    new BigNumber(high).minus(low),
  );

  const support3 = new BigNumber(new BigNumber(high).minus(pivotPoint))
    .multipliedBy(-2)
    .plus(low);

  return {
    pivotPoint: pivotPoint.toNumber(),
    resistances: [
      resistance1.toNumber(),
      resistance2.toNumber(),
      resistance3.toNumber(),
    ],
    supports: [support1.toNumber(), support2.toNumber(), support3.toNumber()],
  };
};

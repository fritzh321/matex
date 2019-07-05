import { BigNumber } from 'bignumber.js';

import { PivotPointsResult } from '../../types';

export const pivotPointsFibonacci = (
  high: number,
  low: number,
  close: number,
): PivotPointsResult => {
  const pivotPoint = new BigNumber(high)
    .plus(low)
    .plus(close)
    .dividedBy(3);

  const resistance1 = new BigNumber(pivotPoint).plus(
    new BigNumber(high).minus(low).multipliedBy(0.382),
  );

  const resistance2 = new BigNumber(pivotPoint).plus(
    new BigNumber(high).minus(low).multipliedBy(0.618),
  );

  const resistance3 = new BigNumber(pivotPoint).plus(
    new BigNumber(high).minus(low),
  );

  const support1 = new BigNumber(pivotPoint).minus(
    new BigNumber(high).minus(low).multipliedBy(0.382),
  );

  const support2 = new BigNumber(pivotPoint).minus(
    new BigNumber(high).minus(low).multipliedBy(0.618),
  );

  const support3 = new BigNumber(pivotPoint).minus(
    new BigNumber(high).minus(low),
  );

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

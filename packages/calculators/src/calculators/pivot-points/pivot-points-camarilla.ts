import { BigNumber } from 'bignumber.js';

import { PivotPointsResult } from '../../types';

export const pivotPointsCamarilla = (
  high: number,
  low: number,
  close: number,
): PivotPointsResult => {
  const pivotPoint = new BigNumber(high)
    .plus(low)
    .plus(close)
    .dividedBy(3);

  const dividers = [12, 6, 4, 2];

  const resistances = dividers.map(divider => {
    return new BigNumber(
      new BigNumber(high)
        .minus(low)
        .multipliedBy(1.1)
        .dividedBy(divider),
    )
      .plus(close)
      .toNumber();
  });

  const supports = dividers.map(divider => {
    return new BigNumber(
      new BigNumber(high)
        .minus(low)
        .multipliedBy(1.1)
        .dividedBy(divider),
    )
      .negated()
      .plus(close)
      .toNumber();
  });

  return {
    pivotPoint: pivotPoint.toNumber(),
    resistances,
    supports,
  };
};

import { PivotPointsMethodsEnum } from '../enums/pivot-points-methods.enum';

export type PivotPointsState = {
  close: number;
  high: number;
  low: number;
  method: PivotPointsMethodsEnum;
  open: number;
};

export const initialPivotPointsState: PivotPointsState = {
  close: 0,
  high: 0,
  low: 0,
  method: PivotPointsMethodsEnum.Standard,
  open: 0,
};

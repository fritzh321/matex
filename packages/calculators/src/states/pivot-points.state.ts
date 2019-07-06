import { PivotPointsMethodsEnum } from '../enums/pivot-points-methods.enum';

export type PivotPointsState = {
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  method: PivotPointsMethodsEnum;
  openPrice: number;
};

export const initialPivotPointsState: PivotPointsState = {
  closePrice: 0,
  highPrice: 0,
  lowPrice: 0,
  method: PivotPointsMethodsEnum.Standard,
  openPrice: 0,
};

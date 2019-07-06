import { TrendEnum } from '../enums/trend.enum';

import {
  FibonacciExtensionType,
  FibonacciRetracementType,
} from '../types/fibonacci.type';

export type FibonacciLevelsState = {
  customPrice: number;
  extensionLevels: FibonacciExtensionType[];
  highPrice: number;
  lowPrice: number;
  precision: number;
  retracementLevels: FibonacciRetracementType[];
  trend: TrendEnum;
};

export const initialFibonacciLevelsState: FibonacciLevelsState = {
  customPrice: 0,
  extensionLevels: [261.8, 200, 161.8, 138.2, 100, 61.8, 50, 38.2, 23.6],
  highPrice: 0,
  lowPrice: 0,
  precision: 5,
  retracementLevels: [23.6, 38.2, 50, 61.8, 78.6],
  trend: TrendEnum.Up,
};

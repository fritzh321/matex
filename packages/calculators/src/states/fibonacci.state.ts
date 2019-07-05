import { TrendEnum } from '../enums/trend.enum';

import {
  FibonacciExtensionType,
  FibonacciRetracementType,
} from '../types/fibonacci.type';

export type FibonacciLevelsState = {
  custom: number;
  extensions: FibonacciExtensionType[];
  high: number;
  low: number;
  precision: number;
  retracements: FibonacciRetracementType[];
  trend: TrendEnum;
};

export const initialFibonacciLevelsState: FibonacciLevelsState = {
  custom: 0,
  extensions: [261.8, 200, 161.8, 138.2, 100, 61.8, 50, 38.2, 23.6],
  high: 0,
  low: 0,
  precision: 5,
  retracements: [23.6, 38.2, 50, 61.8, 78.6],
  trend: TrendEnum.Up,
};

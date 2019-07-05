import { TrendEnum } from '../enums/trend';
import {
  FibonnaciExtensionType,
  FibonnaciRetracementType,
} from '../types/fibonnaci.type';

export type FibonnaciLevelsState = {
  custom: number;
  extensions: FibonnaciExtensionType[];
  high: number;
  low: number;
  precision: number;
  retracements: FibonnaciRetracementType[];
  trend: TrendEnum;
};

export const initialFibonnaciLevelsState: FibonnaciLevelsState = {
  custom: 0,
  extensions: [261.8, 200, 161.8, 138.2, 100, 61.8, 50, 38.2, 23.6],
  high: 0,
  low: 0,
  precision: 5,
  retracements: [23.6, 38.2, 50, 61.8, 78.6],
  trend: TrendEnum.Up,
};

import { FibonacciLevel, FibonacciLevelsResult } from '../../src';

export const defaultRetracements = [
  { level: '23.6%', value: 0 },
  { level: '38.2%', value: 0 },
  { level: '50%', value: 0 },
  { level: '61.8%', value: 0 },
  { level: '78.6%', value: 0 },
];

export const defaultExtensions: FibonacciLevel[] = [
  { level: '261.8%', value: 0 },
  { level: '200%', value: 0 },
  { level: '161.8%', value: 0 },
  { level: '138.2%', value: 0 },
  { level: '100%', value: 0 },
  { level: '61.8%', value: 0 },
  { level: '50%', value: 0 },
  { level: '38.2%', value: 0 },
  { level: '23.6%', value: 0 },
];

export const defaultFibonacciLevelsResult: FibonacciLevelsResult = {
  extensionLevels: defaultExtensions,
  retracementLevels: defaultRetracements,
};

export const defaultRetracementsUp: FibonacciLevel[] = [
  { level: '23.6%', value: 1.4764 },
  { level: '38.2%', value: 1.4618 },
  { level: '50%', value: 1.45 },
  { level: '61.8%', value: 1.4382 },
  { level: '78.6%', value: 1.4214 },
];

export const defaultExtensionsUp: FibonacciLevel[] = [
  { level: '261.8%', value: 1.7618 },
  { level: '200%', value: 1.7 },
  { level: '161.8%', value: 1.6618 },
  { level: '138.2%', value: 1.6382 },
  { level: '100%', value: 1.6 },
  { level: '61.8%', value: 1.5618 },
  { level: '50%', value: 1.55 },
  { level: '38.2%', value: 1.5382 },
  { level: '23.6%', value: 1.5236 },
];

export const defaultFibonacciLevelsResultUp: FibonacciLevelsResult = {
  extensionLevels: defaultExtensionsUp,
  retracementLevels: defaultRetracementsUp,
};

export const defaultRetracementsDown: FibonacciLevel[] = [
  { level: '78.6%', value: 1.4786 },
  { level: '61.8%', value: 1.4618 },
  { level: '50%', value: 1.45 },
  { level: '38.2%', value: 1.4382 },
  { level: '23.6%', value: 1.4236 },
];

export const defaultExtensionsDown: FibonacciLevel[] = [
  { level: '23.6%', value: 1.3764 },
  { level: '38.2%', value: 1.3618 },
  { level: '50%', value: 1.35 },
  { level: '61.8%', value: 1.3382 },
  { level: '100%', value: 1.3 },
  { level: '138.2%', value: 1.2618 },
  { level: '161.8%', value: 1.2382 },
  { level: '200%', value: 1.2 },
  { level: '261.8%', value: 1.1382 },
];

export const defaultFibonacciLevelsResultDown: FibonacciLevelsResult = {
  extensionLevels: defaultExtensionsDown,
  retracementLevels: defaultRetracementsDown,
};

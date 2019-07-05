export type FibonacciLevelsResult = {
  extensions: FibonacciLevel[];
  retracements: FibonacciLevel[];
};

export type FibonacciLevel = {
  level: string;
  value: number;
};

export type FibonacciExtensionType =
  | 23.6
  | 38.2
  | 50
  | 61.8
  | 78.6
  | 100
  | 138.2
  | 161.8
  | 200
  | 261.8;

export type FibonacciRetracementType =
  | 23.6
  | 38.2
  | 50
  | 61.8
  | 78.6
  | 100
  | 138.2;

export type FibonnaciLevelsResult = {
  extensions: FibonnaciLevel[];
  retracements: FibonnaciLevel[];
};

export type FibonnaciLevel = {
  label: string;
  value: number;
};

export type FibonnaciExtensionType =
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

export type FibonnaciRetracementType =
  | 23.6
  | 38.2
  | 50
  | 61.8
  | 78.6
  | 100
  | 138.2;

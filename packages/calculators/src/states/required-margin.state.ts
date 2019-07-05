export type RequiredMarginCalculatorState = {
  baseRate: number;
  leverage: number;
  size: number;
};

export const initialRequiredMarginCalculatorState: RequiredMarginCalculatorState = {
  baseRate: 1,
  leverage: 1,
  size: 0,
};

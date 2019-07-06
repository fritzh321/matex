export type RequiredMarginCalculatorState = {
  baseExchangeRate: number;
  leverage: number;
  positionSize: number;
};

export const initialRequiredMarginCalculatorState: RequiredMarginCalculatorState = {
  baseExchangeRate: 1,
  leverage: 1,
  positionSize: 0,
};

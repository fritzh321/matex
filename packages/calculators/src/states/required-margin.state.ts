export type RequiredMarginState = {
  baseExchangeRate: number;
  leverage: number;
  positionSize: number;
};

export const initialRequiredMarginState: RequiredMarginState = {
  baseExchangeRate: 1,
  leverage: 1,
  positionSize: 0,
};

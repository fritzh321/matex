export type StopLossResult = {
  amount: number;
  pips: number;
  price: number;
};

export type TakeProfitResult = StopLossResult;

export type StopLossTakeProfitResult = {
  stopLoss: StopLossResult;
  takeProfit: TakeProfitResult;
};

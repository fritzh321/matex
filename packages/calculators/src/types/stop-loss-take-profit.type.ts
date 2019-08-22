export type StopLossResult = {
  amount: number;
  pips: number;
  price: number;
};

export type TakeProfitResult = StopLossResult;

export type StopLossTakeProfitResult = {
  pipValue: number;
  riskRewardRatio: number;
  stopLoss: StopLossResult;
  takeProfit: TakeProfitResult;
};

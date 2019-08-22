import { StopLossTakeProfitResult, TakeProfitResult } from '../../src';

export const DEFAULT_TAKE_PROFIT_UP: TakeProfitResult = {
  amount: 400,
  pips: 400,
  price: 1.14,
};

export const DEFAULT_STOP_LOSS_UP: TakeProfitResult = {
  amount: 200,
  pips: 200,
  price: 1.08,
};

export const DEFAULT_STOP_LOSS_TAKE_PROFIT_UP: StopLossTakeProfitResult = {
  pipValue: 1,
  riskRewardRatio: 2,
  stopLoss: DEFAULT_STOP_LOSS_UP,
  takeProfit: DEFAULT_TAKE_PROFIT_UP,
};

export const DEFAULT_TAKE_PROFIT_DOWN: TakeProfitResult = {
  amount: 400,
  pips: 400,
  price: 1.06,
};

export const DEFAULT_STOP_LOSS_DOWN: TakeProfitResult = {
  amount: 200,
  pips: 200,
  price: 1.12,
};

export const DEFAULT_STOP_LOSS_TAKE_PROFIT_DOWN: StopLossTakeProfitResult = {
  pipValue: 1,
  riskRewardRatio: 2,
  stopLoss: DEFAULT_STOP_LOSS_DOWN,
  takeProfit: DEFAULT_TAKE_PROFIT_DOWN,
};

export const DEFAULT_TAKE_PROFIT_EMPTY: TakeProfitResult = {
  amount: 0,
  pips: 0,
  price: 0,
};

export const DEFAULT_STOP_LOSS_EMPTY: TakeProfitResult = {
  amount: 0,
  pips: 0,
  price: 0,
};

export const DEFAULT_STOP_LOSS_TAKE_PROFIT_EMPTY: StopLossTakeProfitResult = {
  pipValue: 0,
  riskRewardRatio: 0,
  stopLoss: DEFAULT_STOP_LOSS_EMPTY,
  takeProfit: DEFAULT_TAKE_PROFIT_EMPTY,
};

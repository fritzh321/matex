import { expect } from 'chai';
import 'mocha-cakes-2';

import {
  PositionEnum,
  stopLossTakeProfit,
  StopLossTakeProfitResult,
} from '../../src';

import {
  DEFAULT_STOP_LOSS_TAKE_PROFIT_DOWN,
  DEFAULT_STOP_LOSS_TAKE_PROFIT_UP,
} from '../samples/stop-loss-take-profit.sample';

Feature('Define SL & TP values', () => {
  Scenario('When a position is long', () => {
    const calculator = stopLossTakeProfit();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.baseListedSecond(true);
    });

    And('the exchange rate for this pair is 1.10', () => {
      calculator.tradingPairExchangeRate(1.1);
    });

    And('my entry price is 1.10', () => {
      calculator.entryPrice(1.1);
    });

    And('my position size is 10,000', () => {
      calculator.positionSize(10_000);
    });

    And("i'm willing to loss 200$", () => {
      calculator.stopLossAmount(200);
    });

    And("i'm willing to gain 400$", () => {
      calculator.takeProfitAmount(400);
    });

    When('my position is buying', () => {
      calculator.position(PositionEnum.Long);
    });

    Then('I should take my profit at 1.14 or accept my loss at 1.08', () => {
      expect(calculator.value()).to.deep.equal(
        DEFAULT_STOP_LOSS_TAKE_PROFIT_UP,
      );
    });
  });

  Scenario('When a position is short', () => {
    const calculator = stopLossTakeProfit();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.baseListedSecond(true);
    });

    And('the exchange rate for this pair is 1.10', () => {
      calculator.tradingPairExchangeRate(1.1);
    });

    And('my entry price is 1.10', () => {
      calculator.entryPrice(1.1);
    });

    And('my position size is 10,000', () => {
      calculator.positionSize(10_000);
    });

    And("i'm willing to loss 200$", () => {
      calculator.stopLossAmount(200);
    });

    And("i'm willing to gain 400$", () => {
      calculator.takeProfitAmount(400);
    });

    When('my position is short', () => {
      calculator.position(PositionEnum.Short);
    });

    Then('I should take my profit at 1.06 or accept my loss at 1.12', () => {
      expect(calculator.value()).to.deep.equal(
        DEFAULT_STOP_LOSS_TAKE_PROFIT_DOWN,
      );
    });
  });

  Scenario(
    'When a position is short and when the currency account is listed first in a pair',
    () => {
      const calculator = stopLossTakeProfit();

      Given('my trading account is in EUR', () => {
        expect(typeof calculator).to.equal('object');
      });

      And('EUR is listed first in the pair EUR/CAD', () => {
        calculator.baseListedSecond(false);
      });

      And('the exchange rate for this pair is 1.25', () => {
        calculator.tradingPairExchangeRate(1.25);
      });

      And('my entry price is 1.255', () => {
        calculator.entryPrice(1.255);
      });

      And('my position size is 10,000', () => {
        calculator.positionSize(10_000);
      });

      And("i'm willing to loss 200€", () => {
        calculator.stopLossAmount(200);
      });

      And("i'm willing to gain 400€", () => {
        calculator.takeProfitAmount(400);
      });

      When('my position is short', () => {
        calculator.position(PositionEnum.Short);
      });

      Then('I should take my profit at 1.205 or accept my loss at 1.28', () => {
        expect(calculator.value()).to.deep.equal({
          pipValue: 0.8,
          riskRewardRatio: 2,
          stopLoss: {
            amount: 200,
            pips: 250,
            price: 1.28,
          },
          takeProfit: {
            amount: 400,
            pips: 500,
            price: 1.205,
          },
        } as StopLossTakeProfitResult);
      });
    },
  );

  Scenario(
    'When a position is long and when the currency account is listed first in a pair',
    () => {
      const calculator = stopLossTakeProfit();

      Given('my trading account is in EUR', () => {
        expect(typeof calculator).to.equal('object');
      });

      And('EUR is listed first in the pair EUR/CAD', () => {
        calculator.baseListedSecond(false);
      });

      And('the exchange rate for this pair is 1.25', () => {
        calculator.tradingPairExchangeRate(1.25);
      });

      And('my entry price is 1.255', () => {
        calculator.entryPrice(1.255);
      });

      And('my position size is 10,000', () => {
        calculator.positionSize(10_000);
      });

      And("i'm willing to loss 200€", () => {
        calculator.stopLossAmount(200);
      });

      And("i'm willing to gain 400€", () => {
        calculator.takeProfitAmount(400);
      });

      When('my position is long', () => {
        calculator.position(PositionEnum.Long);
      });

      Then('I should take my profit at 1.06 or accept my loss at 1.12', () => {
        expect(calculator.value()).to.deep.equal({
          pipValue: 0.8,
          riskRewardRatio: 2,
          stopLoss: {
            amount: 200,
            pips: 250,
            price: 1.23,
          },
          takeProfit: {
            amount: 400,
            pips: 500,
            price: 1.305,
          },
        } as StopLossTakeProfitResult);
      });
    },
  );

  Scenario(
    'When a position is long and when the currency account is not listed in a pair',
    () => {
      const calculator = stopLossTakeProfit();

      Given('my trading account is in USD', () => {
        expect(typeof calculator).to.equal('object');
      });

      And('the exchange rate for the pair AUD/JPY is 100', () => {
        calculator.tradingPairExchangeRate(100);
        calculator.pipPrecision(2);
      });

      And('the exchange rate for the pair USD/AUD is 1.6', () => {
        calculator.baseExchangeRate(1.6);
      });

      And('my entry price is 100', () => {
        calculator.entryPrice(100);
      });

      And('my position size is 10,000', () => {
        calculator.positionSize(10_000);
      });

      And("i'm willing to loss 200$", () => {
        calculator.stopLossAmount(200);
      });

      And("i'm willing to gain 400$", () => {
        calculator.takeProfitAmount(400);
      });

      When('my position is long', () => {
        calculator.position(PositionEnum.Long);
      });

      Then('I should take my profit at 1.06 or accept my loss at 1.12', () => {
        expect(calculator.value()).to.deep.equal({
          pipValue: 0.625,
          riskRewardRatio: 2,
          stopLoss: {
            amount: 200,
            pips: 320,
            price: 96.8,
          },
          takeProfit: {
            amount: 400,
            pips: 640,
            price: 106.4,
          },
        } as StopLossTakeProfitResult);
      });
    },
  );
});

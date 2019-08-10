import { expect } from 'chai';
import 'mocha-cakes-2';

import { positionSize } from '../../src';
import { DEFAULT_POSITION_SIZE_RESULTS } from '../samples/position-size.sample';

Feature('Calculating the perfect position size', () => {
  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = positionSize();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.baseListedSecond(true);
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.tradingPairExchangeRate(1.25);
    });

    When('my account size is 5,000$', () => {
      calculator.accountSize(5_000);
    });

    And('my risk amount is 50$', () => {
      calculator.amountAtRisk(50);
    });

    And('my stop loss is 200 (pips)', () => {
      calculator.stopLossPips(200);
    });

    Then('my position size should be 2,500', () => {
      expect(calculator.value()).to.deep.equal(DEFAULT_POSITION_SIZE_RESULTS);
    });
  });

  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = positionSize();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.baseListedSecond(true);
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.tradingPairExchangeRate(1.25);
    });

    When('my account size is 5,000$', () => {
      calculator.accountSize(5_000);
    });

    And('my risk ratio is 1%', () => {
      calculator.riskRatio(1);
    });

    And('my stop loss is 200 (pips)', () => {
      calculator.stopLossPips(200);
    });

    Then('my position size should be 2,500', () => {
      expect(calculator.value()).to.deep.equal(DEFAULT_POSITION_SIZE_RESULTS);
    });
  });

  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = positionSize();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.baseListedSecond(true);
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.tradingPairExchangeRate(1.25);
    });

    When('my account size is 5,000$', () => {
      calculator.accountSize(5_000);
    });

    And('my risk ratio is 1%', () => {
      calculator.riskRatio(1);
    });

    And('my entry price is 1.02', () => {
      calculator.entryPrice(1.02);
    });

    And('my entry price is 1', () => {
      calculator.stopLossPrice(1);
    });

    Then('my position size should be 2,500', () => {
      expect(calculator.value()).to.deep.equal(DEFAULT_POSITION_SIZE_RESULTS);
    });
  });

  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = positionSize();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.baseListedSecond(true);
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.tradingPairExchangeRate(1.25);
    });

    When('my account size is 5,000$', () => {
      calculator.accountSize(5_000);
    });

    And('my amount at risk is 50$', () => {
      calculator.amountAtRisk(50);
    });

    And('my entry price is 1.02', () => {
      calculator.entryPrice(1.02);
    });

    And('my entry price is 1', () => {
      calculator.stopLossPrice(1);
    });

    Then('my position size should be 2,500', () => {
      expect(calculator.value()).to.deep.equal(DEFAULT_POSITION_SIZE_RESULTS);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const calculator = positionSize();

    Given('my trading account is in EUR', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('EUR is listed first in the pair EUR/CAD', () => {
      calculator.baseListedSecond(false); // default value
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.tradingPairExchangeRate(1.12);
    });

    When('my account size is 5,000€', () => {
      calculator.accountSize(5_000);
    });

    And('my risk amount is 50€', () => {
      calculator.amountAtRisk(50);
    });

    And('my stop loss is 200 (pips)', () => {
      calculator.stopLossPips(200);
    });

    Then('my position size should be 2,800', () => {
      expect(calculator.value()).to.deep.equal({
        amountAtRisk: 50,
        pipValue: 0.25,
        positionSize: 2_800,
        riskRatio: 1,
      });
    });
  });

  Scenario('When the currency account is not listed in a pair', () => {
    const calculator = positionSize();

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

    When('my account size is 5,000$', () => {
      calculator.accountSize(5_000);
    });

    And('my amount at risk is 50$', () => {
      calculator.amountAtRisk(50);
    });

    And('my stop loss is 200 (pips)', () => {
      calculator.stopLossPips(200);
    });

    Then('my position size should be 4,000', () => {
      expect(calculator.value()).to.deep.equal({
        amountAtRisk: 50,
        pipValue: 0.25,
        positionSize: 4000,
        riskRatio: 1,
      });
    });
  });
});

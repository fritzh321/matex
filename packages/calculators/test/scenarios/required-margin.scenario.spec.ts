import { expect } from 'chai';
import 'mocha-cakes-2';

import { requiredMargin } from '../../src';

Feature('Calculating the required margin', () => {
  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = requiredMargin();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for the pair EUR/USD is 1.25', () => {
      calculator.tradingPairExchangeRate(1.25);
      calculator.baseListedSecond(true);
    });

    And('the position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be $6,250', () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.equal(6250);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const calculator = requiredMargin();

    Given('my trading account is in EUR', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for the pair EUR/CAD is 1.25', () => {
      calculator.tradingPairExchangeRate(1.25);
    });

    And('the position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be €5000', () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.equal(5000);
    });
  });

  Scenario('When the currency account is not listed in a pair', () => {
    const calculator = requiredMargin();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for the pair AUD/JPY is 100', () => {
      calculator.baseExchangeRate(0.75); // AUD/USD
      calculator.tradingPairExchangeRate(100); // AUD/JPY
    });

    When('my position size is 100, 000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be $3,750', () => {
      expect(calculator.value()).to.equal(3_750);
    });
  });
});

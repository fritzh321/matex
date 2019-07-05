import { expect } from 'chai';
import 'mocha-cakes-2';

import { pip } from '../../src';

Feature('Calculating Pip Value', () => {
  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = pip();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.listedSecond(true);
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.currencyPairRate(1.25);
    });

    When('my position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    Then('the pip value should be equal to $10', () => {
      expect(calculator.value()).to.equal(10);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const calculator = pip();

    Given('my trading account is in EUR', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('USD is listed first in the pair EUR/CAD', () => {
      calculator.listedSecond(false); // default value
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.currencyPairRate(1.25);
    });

    When('my position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    Then('the pip value should be equal to $8', () => {
      expect(calculator.value()).to.equal(8);
    });
  });

  Scenario('When the currency account is not listed in a pair', () => {
    const calculator = pip();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for the pair AUD/JPY is 100', () => {
      calculator.currencyPairRate(100);
      calculator.pipPrecision(2);
    });

    And('the exchange rate for the pair USD/AUD is 1.6', () => {
      calculator.accountBaseRate(1.6);
    });

    When('my position size is 100, 000', () => {
      calculator.positionSize(100_000);
    });

    Then('the pip value should be equal to $6.25', () => {
      expect(calculator.value()).to.equal(6.25);
    });
  });
});

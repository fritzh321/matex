import { expect } from 'chai';
import 'mocha-cakes-2';

import { requiredMargin } from '../../src/calculators/required-margin';

Feature('Calculating the required margin', () => {
  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = requiredMargin();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for the pair EUR/USD is 1.25', () => {
      calculator.accountExchangeRate(1.25);
    });

    And('the position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be $6,250', () => {
      expect(calculator.valid()).to.equal(true);
      expect(calculator.value()).to.equal(6250);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const calculator = requiredMargin();

    Given('my trading account is in EUR', () => {
      expect(typeof calculator).to.equal('object');
    });

    And('the position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be €5000', () => {
      expect(calculator.valid()).to.equal(true);
      expect(calculator.value()).to.equal(5000);
    });
  });
});

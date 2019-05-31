import { expect } from 'chai';
import 'mocha-cakes-2';

import { pip } from '../../src/pip';

Feature('Calculating Pip Value', () => {
  Scenario('When the currency account is listed second in a pair', () => {
    const pipCalculator = pip();

    // tslint:disable-next-line: no-duplicate-string
    Given('my trading account is in USD', () => {
      expect(typeof pipCalculator).to.equal('object');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      pipCalculator.listedSecond(true);
    });

    And('the exchange rate for this pair is 1.25', () => {
      pipCalculator.currencyPairRate(1.25);
    });

    // tslint:disable-next-line: no-duplicate-string
    When('my position size is 100000', () => {
      pipCalculator.positionSize(100000);
    });

    Then('the pip value should be equal to $10', () => {
      expect(pipCalculator.value()).to.equal(10);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const pipCalculator = pip();

    Given('my trading account is in USD', () => {
      expect(typeof pipCalculator).to.equal('object');
    });

    And('USD is listed first in the pair USD/CAD', () => {
      pipCalculator.listedSecond(false); // default value
    });

    And('the exchange rate for this pair is 1.25', () => {
      pipCalculator.currencyPairRate(1.25);
    });

    When('my position size is 100000', () => {
      pipCalculator.positionSize(100000);
    });

    Then('the pip value should be equal to $8', () => {
      expect(pipCalculator.value()).to.equal(8);
    });
  });

  Scenario('When the currency account is not listed in a pair', () => {
    const pipCalculator = pip();

    Given('my trading account is in USD', () => {
      expect(typeof pipCalculator).to.equal('object');
    });

    And('the exchange rate for the pair AUD/JPY is 100', () => {
      pipCalculator.currencyPairRate(100);
      pipCalculator.pipPrecision(2);
    });

    And('the exchange rate for the pair USD/AUD is 1.6', () => {
      pipCalculator.accountBaseRate(1.6);
    });

    When('my position size is 100000', () => {
      pipCalculator.positionSize(100000);
    });

    Then('the pip value should be equal to $6.25', () => {
      expect(pipCalculator.value()).to.equal(6.25);
    });
  });
});

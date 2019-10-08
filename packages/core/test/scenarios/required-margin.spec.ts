import { expect } from 'chai';
import 'mocha-cakes-2';

import { Matex } from '../../src';
import { testMatexConfig } from '../samples/config';

Feature('Calculating the required margin', () => {
  const matex = new Matex(testMatexConfig);

  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = matex.requiredMargin();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
      calculator.account('USD');
    });

    And('the exchange rate for the pair EUR/USD is 1.25', () => {
      calculator.base('EUR');
      calculator.counter('USD');
    });

    And('the position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be $6,250', async () => {
      expect(calculator.isValid()).to.equal(true);
      expect(await calculator.value()).to.equal(6_250);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const calculator = matex.requiredMargin();

    Given('my trading account is in EUR', () => {
      expect(typeof calculator).to.equal('object');
      calculator.account('EUR');
    });

    And('the exchange rate for the pair EUR/CAD is 1.25', () => {
      calculator.base('EUR');
      calculator.counter('CAD');
    });

    And('my position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be €5000', async () => {
      expect(calculator.isValid()).to.equal(true);
      expect(await calculator.value()).to.equal(5_000);
    });
  });

  Scenario('When the currency account is not listed in a pair', () => {
    const calculator = matex.requiredMargin();

    Given('my trading account is in USD', () => {
      calculator.account('USD');
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for the pair AUD/JPY is 100', () => {
      calculator.base('AUD').counter('JPY');
    });

    When('my position size is 100, 000', () => {
      calculator.positionSize(100_000);
    });

    When('my leverage is 20:1', () => {
      calculator.leverage(20);
    });

    Then('the required margin should be $3,750', async () => {
      expect(await calculator.value()).to.equal(3_750);
    });
  });
});

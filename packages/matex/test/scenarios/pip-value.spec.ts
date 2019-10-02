import { expect } from 'chai';
import 'mocha-cakes-2';

import { Matex } from '../../src';
import { testMatexConfig } from '../samples/config';

Feature('Calculating Pip Value', () => {
  const matex = new Matex(testMatexConfig);

  Scenario('When the currency account is listed second in a pair', () => {
    const calculator = matex.pip();

    Given('my trading account is in USD', () => {
      expect(typeof calculator).to.equal('object');
      calculator.account('USD');
    });

    And('USD is listed second in the pair EUR/USD', () => {
      calculator.base('EUR').counter('USD');
    });

    When('my position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    Then('the pip value should be equal to $10', async () => {
      expect(await calculator.value()).to.equal(10);
    });
  });

  Scenario('When the currency account is listed first in a pair', () => {
    const calculator = matex.pip();

    Given('my trading account is in EUR', () => {
      calculator.account('EUR');
      expect(typeof calculator).to.equal('object');
    });

    And('the exchange rate for this pair is 1.25', () => {
      calculator.base('EUR').counter('CAD');
    });

    When('my position size is 100,000', () => {
      calculator.positionSize(100_000);
    });

    Then('the pip value should be equal to $8', async () => {
      expect(await calculator.value()).to.equal(8);
    });
  });

  Scenario('When the currency account is not listed in a pair', () => {
    const calculator = matex.pip();

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

    Then('the pip value should be equal to $6.25', async () => {
      expect(await calculator.value()).to.equal(6.25);
    });
  });
});

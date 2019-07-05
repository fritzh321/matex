import { expect } from 'chai';
import 'mocha';

import { pip } from '../../src/calculators/pip';

describe('pip', () => {
  describe('pip()', () => {
    it('should return an instance of the PipCalculator class', () => {
      const calculator = pip();
      expect(typeof calculator).to.equal('object');
    });
  });

  describe('#value()', () => {
    it('should compute the pip value', () => {
      const pipValue = pip().value();
      expect(pipValue).to.equal(0);
    });

    it('should memoize last pip value', () => {
      const calculator = pip();
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#positionSize()', () => {
    it('should define the position size when calculating a pip value', () => {
      let pipValue = pip()
        .positionSize(1)
        .value();

      expect(pipValue).to.equal(0.0001);

      pipValue = pip()
        .positionSize(1000)
        .value();

      expect(pipValue).to.equal(0.1);
    });
  });

  describe('#pipPrecision()', () => {
    it('should define the pip precision when calculating a pip value', () => {
      let pipValue = pip()
        .positionSize(1)
        .pipPrecision(4)
        .value();

      expect(pipValue).to.equal(0.0001);

      pipValue = pip()
        .positionSize(1)
        .pipPrecision(2)
        .value();

      expect(pipValue).to.equal(0.01);
    });
  });

  describe('#currencyPairRate()', () => {
    it('should define the exchange rate of the currency pair when calculating a pip value', () => {
      let pipValue = pip()
        .positionSize(1)
        .currencyPairRate(1.25)
        .value();

      expect(pipValue).to.equal(0.00008);

      pipValue = pip()
        .positionSize(1)
        .currencyPairRate(2)
        .value();

      expect(pipValue).to.equal(0.00005);
    });
  });

  describe('#accountBaseRate()', () => {
    it(`should define the exchange rate between the account currency and
    the base currency when calculating a pip value`, () => {
      let pipValue = pip()
        .positionSize(1)
        .accountBaseRate(1.25)
        .value();

      expect(pipValue).to.equal(0.00008);

      pipValue = pip()
        .positionSize(1)
        .accountBaseRate(2)
        .value();

      expect(pipValue).to.equal(0.00005);
    });
  });

  describe('#accountCurrencyListedSecond()', () => {
    it(`should not use the exchange rate when calculating a pip value`, () => {
      const pipValue = pip()
        .positionSize(1)
        .currencyPairRate(1.25)
        .listedSecond(true)
        .value();

      expect(pipValue).to.equal(0.0001);
    });
  });

  describe('#reset()', () => {
    it('should reset the calculator', () => {
      const pipValue = pip()
        .positionSize(1000)
        .reset()
        .value();

      expect(pipValue).to.equal(0);
    });
  });
});

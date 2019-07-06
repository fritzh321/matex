import { expect } from 'chai';
import 'mocha';

import {
  fibonacciLevels,
  FibonacciLevelsCalculator,
  TrendEnum,
} from '../../src';

import {
  SHOULD_MEMOIZE_LAST_VALUE,
  SHOULD_RETURN_CALCULATOR_INSTANCE,
  SHOULD_RETURN_CALCULATOR_REFERENCE,
} from '../messages/shared';

import { defaultFibonacciLevelsResult } from '../samples/fibonacci-levels.sample';

describe('fibonnaciLevels', () => {
  let calculator: FibonacciLevelsCalculator;

  beforeEach(() => {
    calculator = fibonacciLevels();
  });

  describe('fibonnaciLevels()', () => {
    it(SHOULD_RETURN_CALCULATOR_INSTANCE('FibonacciLevelsCalculator'), () => {
      expect(typeof calculator).to.equal('object');
    });
  });

  describe('#value()', () => {
    it('should compute the fibonnaci extension and retracement levels with default values', () => {
      const fibonnaciLevelsResult = fibonacciLevels().value();
      expect(fibonnaciLevelsResult).to.deep.equal(defaultFibonacciLevelsResult);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#lowPrice()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.lowPrice(5)).to.equal(calculator);
    });
  });

  describe('#highPrice()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.highPrice(5)).to.equal(calculator);
    });
  });

  describe('#customPrice()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.customPrice(5)).to.equal(calculator);
    });
  });

  describe('#precision()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.precision(5)).to.equal(calculator);
    });
  });

  describe('#extensionLevels()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.extensionLevels([23.6])).to.equal(calculator);
    });

    it('Should define the extension levels', () => {
      calculator.extensionLevels([50]);
      expect(calculator.value().extensionLevels[0].level).to.equal('50%');
    });
  });

  describe('#retracementLevels()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.retracementLevels([23.6])).to.equal(calculator);
    });

    it('Should define the retracement levels', () => {
      calculator.retracementLevels([50]);
      expect(calculator.value().retracementLevels[0].level).to.equal('50%');
    });
  });

  describe('#trend()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.trend(TrendEnum.Up)).to.equal(calculator);
    });
  });

  describe('#valid()', () => {
    it('Should be valid with no high or low prices value set', () => {
      expect(calculator.valid()).to.equal(true);
    });

    it('Should not be valid when only the low price is set', () => {
      calculator.lowPrice(1.25);
      expect(calculator.valid()).to.equal(false);
    });

    it('Should be valid when only the high price is set', () => {
      calculator.highPrice(1.25);
      expect(calculator.valid()).to.equal(true);
    });

    it('Should be valid when low price <= high price', () => {
      calculator.highPrice(1.35).lowPrice(2);

      expect(calculator.valid()).to.equal(false);

      calculator.lowPrice(1.25);
      expect(calculator.valid()).to.equal(true);

      calculator.lowPrice(1.35);
      expect(calculator.valid()).to.equal(true);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should reset the calculator', () => {
      const fibonnaciLevelsResult = fibonacciLevels()
        .highPrice(1.35)
        .lowPrice(1.25)
        .reset()
        .value();

      expect(fibonnaciLevelsResult).to.deep.equal(defaultFibonacciLevelsResult);
    });
  });
});

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
    it('should compute the fibonnaci levels extensions and retracements with default values', () => {
      const fibonnaciLevelsResult = fibonacciLevels().value();
      expect(fibonnaciLevelsResult).to.deep.equal(defaultFibonacciLevelsResult);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#low()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.low(5)).to.equal(calculator);
    });
  });

  describe('#high()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.high(5)).to.equal(calculator);
    });
  });

  describe('#custom()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.custom(5)).to.equal(calculator);
    });
  });

  describe('#precision()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.precision(5)).to.equal(calculator);
    });
  });

  describe('#extensions()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.extensions([23.6])).to.equal(calculator);
    });

    it('Should define the extension levels', () => {
      calculator.extensions([50]);
      expect(calculator.value().extensions[0].level).to.equal('50%');
    });
  });

  describe('#retracements()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.retracements([23.6])).to.equal(calculator);
    });

    it('Should define the retracements levels', () => {
      calculator.retracements([50]);
      expect(calculator.value().retracements[0].level).to.equal('50%');
    });
  });

  describe('#trend()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.trend(TrendEnum.Up)).to.equal(calculator);
    });
  });

  describe('#valid()', () => {
    it('Should be valid with no high or low value set', () => {
      expect(calculator.valid()).to.equal(true);
    });

    it('Should not be valid when only the low price is set', () => {
      calculator.low(1.25);
      expect(calculator.valid()).to.equal(false);
    });

    it('Should be valid when only the high price is set', () => {
      calculator.high(1.25);
      expect(calculator.valid()).to.equal(true);
    });

    it('Should be valid when low <= high', () => {
      calculator.high(1.35).low(2);

      expect(calculator.valid()).to.equal(false);

      calculator.low(1.25);
      expect(calculator.valid()).to.equal(true);

      calculator.low(1.35);
      expect(calculator.valid()).to.equal(true);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should reset the calculator', () => {
      const fibonnaciLevelsResult = fibonacciLevels()
        .high(1.35)
        .low(1.25)
        .reset()
        .value();

      expect(fibonnaciLevelsResult).to.deep.equal(defaultFibonacciLevelsResult);
    });
  });
});

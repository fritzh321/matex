import { expect } from 'chai';
import 'mocha';

import {
  requiredMargin,
  RequiredMarginCalculator,
} from '../../src/calculators/required-margin';

import {
  SHOULD_MEMOIZE_LAST_VALUE,
  SHOULD_RESET_CALCULATOR,
  SHOULD_RETURN_CALCULATOR_INSTANCE,
  SHOULD_RETURN_CALCULATOR_REFERENCE,
  SHOULD_RETURN_DEFAULT_VALUE,
} from '../messages/shared';

describe('requiredMargin', () => {
  let calculator: RequiredMarginCalculator;

  beforeEach(() => {
    calculator = requiredMargin();
  });

  describe('requiredMargin()', () => {
    it(SHOULD_RETURN_CALCULATOR_INSTANCE('RequiredMarginCalculator'), () => {
      expect(typeof calculator).to.equal('object');
    });
  });

  describe('#value()', () => {
    it(SHOULD_RETURN_DEFAULT_VALUE('0'), () => {
      expect(calculator.value()).to.deep.equal(0);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#positionSize()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.positionSize(1_000)).to.equal(calculator);
    });
  });

  describe('#accountBaseRate()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.accountExchangeRate(1.5)).to.equal(calculator);
    });
  });

  describe('#leverage()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.leverage(5)).to.equal(calculator);
    });
  });

  describe('#valid()', () => {
    it('Should always be valid', () => {
      expect(calculator.valid()).to.equal(true);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it(SHOULD_RESET_CALCULATOR, () => {
      const result = requiredMargin()
        .positionSize(1_000)
        .accountExchangeRate(1.5)
        .leverage(5)
        .reset()
        .value();

      expect(result).to.deep.equal(result);
    });
  });
});

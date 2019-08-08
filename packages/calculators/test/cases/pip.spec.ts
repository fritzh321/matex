import { expect } from 'chai';
import 'mocha';

import { pip, PipValueCalculator } from '../../src';

import {
  SHOULD_MEMOIZE_LAST_VALUE,
  SHOULD_RETURN_CALCULATOR_INSTANCE,
  SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE,
  SHOULD_RETURN_CALCULATOR_VALIDITY,
  SHOULD_RETURN_DEFAULT_RESULT,
  SHOULD_RETURN_REFERENCE_CALCULATOR,
  SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE,
  SHOULD_UPDATE_CALCULATOR_STATE,
} from '../messages/shared';

describe('pip', () => {
  let calculator: PipValueCalculator;

  beforeEach(() => {
    calculator = pip();
  });

  describe('pip()', () => {
    it(SHOULD_RETURN_CALCULATOR_INSTANCE('PipValueCalculator'), () => {
      expect(typeof calculator).to.equal('object');
      expect(calculator instanceof PipValueCalculator).to.equal(true);
    });
  });

  describe('#isValid()', () => {
    it(SHOULD_RETURN_CALCULATOR_VALIDITY, () => {
      expect(calculator.isValid()).to.equal(true);
    });
  });

  describe('#setState()', () => {
    it(SHOULD_UPDATE_CALCULATOR_STATE, () => {
      calculator.setState({
        positionSize: 1_000,
      });

      expect(calculator.getValueForKey('positionSize')).to.equal(1_000);
    });

    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      const instance = calculator.setState({
        pipPrecision: 2,
      });

      expect(instance).to.equal(calculator);
    });
  });

  describe('#setValue()', () => {
    it(SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE, () => {
      calculator.setValue('positionSize', 1_000);
      expect(calculator.getValueForKey('positionSize')).to.equal(1_000);
    });

    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.setValue('pipPrecision', 2)).to.equal(calculator);
    });
  });

  describe('#getValueForKey()', () => {
    it(SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE, () => {
      calculator.setValue('positionSize', 10_000);
      expect(calculator.getValueForKey('positionSize')).to.equal(10_000);
    });
  });

  describe('#value()', () => {
    it(SHOULD_RETURN_DEFAULT_RESULT, () => {
      expect(calculator.value()).to.equal(0);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#positionSize()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should define the position size when calculating a pip value', () => {
      let pipValue = calculator.positionSize(1).value();

      expect(calculator.getValueForKey('positionSize')).to.equal(1);
      expect(pipValue).to.equal(0.0001);

      pipValue = calculator.positionSize(1000).value();

      expect(calculator.getValueForKey('positionSize')).to.equal(1000);
      expect(pipValue).to.equal(0.1);
    });
  });

  describe('#pipPrecision()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should define the pip precision when calculating a pip value', () => {
      let pipValue = calculator
        .positionSize(1)
        .pipPrecision(4)
        .value();

      expect(calculator.getValueForKey('pipPrecision')).to.equal(4);
      expect(pipValue).to.equal(0.0001);

      pipValue = calculator
        .positionSize(1)
        .pipPrecision(2)
        .value();

      expect(calculator.getValueForKey('pipPrecision')).to.equal(2);
      expect(pipValue).to.equal(0.01);
    });
  });

  describe('#currencyPairRate()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should define the exchange rate of the currency pair when calculating a pip value', () => {
      let pipValue = calculator
        .positionSize(1)
        .tradingPairExchangeRate(1.25)
        .value();

      expect(calculator.getValueForKey('tradingPairExchangeRate')).to.equal(
        1.25,
      );
      expect(pipValue).to.equal(0.00008);

      pipValue = calculator
        .positionSize(1)
        .tradingPairExchangeRate(2)
        .value();

      expect(calculator.getValueForKey('tradingPairExchangeRate')).to.equal(2);
      expect(pipValue).to.equal(0.00005);
    });
  });

  describe('#accountBaseRate()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it(`should define the exchange rate between the account currency and
    the base currency when calculating a pip value`, () => {
      let pipValue = calculator
        .positionSize(1)
        .baseExchangeRate(1.25)
        .value();

      expect(calculator.getValueForKey('baseExchangeRate')).to.equal(1.25);
      expect(pipValue).to.equal(0.00008);

      pipValue = calculator
        .positionSize(1)
        .baseExchangeRate(2)
        .value();

      expect(calculator.getValueForKey('baseExchangeRate')).to.equal(2);
      expect(pipValue).to.equal(0.00005);
    });
  });

  describe('#accountCurrencyListedSecond()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it(`should not use the exchange rate when calculating a pip value`, () => {
      const pipValue = calculator
        .positionSize(1)
        .tradingPairExchangeRate(1.25)
        .baseListedSecond(true)
        .value();

      expect(calculator.getValueForKey('baseListedSecond')).to.equal(true);
      expect(pipValue).to.equal(0.0001);
    });
  });

  describe('#reset()', () => {
    it('should reset the calculator', () => {
      const pipValue = calculator
        .positionSize(1000)
        .reset()
        .value();

      expect(pipValue).to.equal(0);
    });
  });
});

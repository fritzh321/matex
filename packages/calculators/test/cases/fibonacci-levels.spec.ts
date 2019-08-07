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
  SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE,
  SHOULD_RETURN_CALCULATOR_REFERENCE,
  SHOULD_RETURN_DEFAULT_RESULT,
  SHOULD_RETURN_REFERENCE_CALCULATOR,
  SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE,
  SHOULD_UPDATE_CALCULATOR_STATE,
} from '../messages/shared';

import { defaultFibonacciLevelsResult } from '../samples/fibonacci-levels.sample';

describe('FibonacciLevelsCalculator', () => {
  let calculator: FibonacciLevelsCalculator;

  beforeEach(() => {
    calculator = fibonacciLevels();
  });

  describe('fibonnaciLevels()', () => {
    it(SHOULD_RETURN_CALCULATOR_INSTANCE('FibonacciLevelsCalculator'), () => {
      expect(typeof calculator).to.equal('object');
      expect(calculator instanceof FibonacciLevelsCalculator).to.equal(true);
    });
  });

  describe('#setState()', () => {
    it(SHOULD_UPDATE_CALCULATOR_STATE, () => {
      calculator.setState({
        precision: 2,
      });

      expect(calculator.getValueForKey('precision')).to.equal(2);
    });

    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      const instance = calculator.setState({
        trend: TrendEnum.Up,
      });

      expect(instance).to.equal(calculator);
    });
  });

  describe('#setValue()', () => {
    it(SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE, () => {
      calculator.setValue('trend', TrendEnum.Up);
      expect(calculator.getValueForKey('trend')).to.equal(TrendEnum.Up);
    });

    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      const instance = calculator.setValue('trend', TrendEnum.Up);
      expect(instance).to.equal(calculator);
    });
  });

  describe('#getValueForKey()', () => {
    it(SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE, () => {
      calculator.setValue('trend', TrendEnum.Down);
      expect(calculator.getValueForKey('trend')).to.equal(TrendEnum.Down);
    });
  });

  describe('#value()', () => {
    it(SHOULD_RETURN_DEFAULT_RESULT, () => {
      expect(calculator.value()).to.deep.equal(defaultFibonacciLevelsResult);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#lowPrice()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.lowPrice(5)).to.equal(calculator);
    });

    it('Should define the lowPrice value', () => {
      calculator.lowPrice(1);
      expect(calculator.getValueForKey('lowPrice')).to.equal(1);
    });
  });

  describe('#highPrice()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.highPrice(5)).to.equal(calculator);
    });

    it('Should define the highPrice value', () => {
      calculator.highPrice(2);
      expect(calculator.getValueForKey('highPrice')).to.equal(2);
    });
  });

  describe('#customPrice()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.customPrice(5)).to.equal(calculator);
    });

    it('Should define the customPrice value', () => {
      calculator.customPrice(1.5);
      expect(calculator.getValueForKey('customPrice')).to.equal(1.5);
    });
  });

  describe('#precision()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.precision(5)).to.equal(calculator);
    });

    it('Should a default value', () => {
      expect(calculator.getValueForKey('precision')).to.equal(5);
    });

    it('Should define the precision value', () => {
      calculator.precision(2);
      expect(calculator.getValueForKey('precision')).to.equal(2);
    });

    it('Should define the level precision values', () => {
      calculator
        .precision(2)
        .lowPrice(1.4)
        .highPrice(1.5)
        .trend(TrendEnum.Up);

      expect(calculator.value().extensionLevels[0].value).to.equal(1.76);
      expect(calculator.value().retracementLevels[0].value).to.equal(1.48);
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

    it('Should reorder extension levels', () => {
      calculator.extensionLevels([50, 23.6]);
      expect(calculator.getValueForKey('extensionLevels')).to.deep.equal([
        23.6,
        50,
      ]);
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

    it('Should reorder retracement levels', () => {
      calculator.retracementLevels([50, 23.6]);
      expect(calculator.getValueForKey('retracementLevels')).to.deep.equal([
        23.6,
        50,
      ]);
    });
  });

  describe('#trend()', () => {
    it(SHOULD_RETURN_CALCULATOR_REFERENCE, () => {
      expect(calculator.trend(TrendEnum.Up)).to.equal(calculator);
    });

    it('Should have a default value', () => {
      expect(calculator.getValueForKey('trend')).to.equal(TrendEnum.Up);
    });

    it('Should define the trend value', () => {
      calculator.trend(TrendEnum.Down);
      expect(calculator.getValueForKey('trend')).to.equal(TrendEnum.Down);
    });

    it('Should reorder retracement and extension levels', () => {
      let results = calculator
        .retracementLevels([50, 23.6])
        .extensionLevels([23.6, 50])
        .value();

      expect(calculator.getValueForKey('retracementLevels')).to.deep.equal([
        23.6,
        50,
      ]);
      expect(calculator.getValueForKey('extensionLevels')).to.deep.equal([
        23.6,
        50,
      ]);

      expect(results.retracementLevels[0].level).to.equal('23.6%');
      expect(results.retracementLevels[1].level).to.equal('50%');
      expect(results.extensionLevels[0].level).to.equal('50%');
      expect(results.extensionLevels[1].level).to.equal('23.6%');

      results = calculator.trend(TrendEnum.Down).value();

      expect(results.retracementLevels[0].level).to.equal('50%');
      expect(results.retracementLevels[1].level).to.equal('23.6%');
      expect(results.extensionLevels[0].level).to.equal('23.6%');
      expect(results.extensionLevels[1].level).to.equal('50%');
    });
  });

  describe('#isValid()', () => {
    it('Should not be valid with no high or low prices value set', () => {
      expect(calculator.isValid()).to.equal(false);

      calculator.highPrice(0).lowPrice(0);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the low price is set', () => {
      calculator.lowPrice(1.25);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the high price is set', () => {
      calculator.highPrice(1.25);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should be valid when low price <= high price', () => {
      calculator.highPrice(1.35).lowPrice(2);

      expect(calculator.isValid()).to.equal(false);

      calculator.lowPrice(1.25);
      expect(calculator.isValid()).to.equal(true);

      calculator.lowPrice(1.35);
      expect(calculator.isValid()).to.equal(true);
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

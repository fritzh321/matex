import { expect } from 'chai';
import 'mocha';

import {
  pivotPoints,
  PivotPointsCalculator,
  PivotPointsMethodsEnum,
} from '../../src';

import {
  SHOULD_MEMOIZE_LAST_VALUE,
  SHOULD_RESET_CALCULATOR,
  SHOULD_RETURN_CALCULATOR_INSTANCE,
  SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE,
  SHOULD_RETURN_DEFAULT_RESULT,
  SHOULD_RETURN_REFERENCE_CALCULATOR,
  SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE,
  SHOULD_UPDATE_CALCULATOR_STATE,
} from '../messages/shared';

const DEFAULT_RESULTS = {
  pivotPoint: 0,
  resistances: [0, 0, 0],
  supports: [0, 0, 0],
};

describe('PivotPointsCalculator', () => {
  let calculator: PivotPointsCalculator;

  beforeEach(() => {
    calculator = pivotPoints();
  });

  describe('pivotPoints()', () => {
    it(SHOULD_RETURN_CALCULATOR_INSTANCE('PivotPointsCalculator'), () => {
      expect(typeof calculator).to.equal('object');
      expect(calculator instanceof PivotPointsCalculator).to.equal(true);
    });
  });

  describe('#value()', () => {
    it(SHOULD_RETURN_DEFAULT_RESULT, () => {
      const results = calculator.value();
      expect(results).to.deep.equal(DEFAULT_RESULTS);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#isValid()', () => {
    it('Should not be valid when no low, high and close prices are set', () => {
      expect(calculator.isValid()).to.equal(false);

      calculator.lowPrice(1);
      expect(calculator.isValid()).to.equal(false);

      calculator.highPrice(2);
      expect(calculator.isValid()).to.equal(false);

      calculator.closePrice(2);
      expect(calculator.isValid()).to.equal(true);

      calculator
        .highPrice(0)
        .lowPrice(0)
        .closePrice(0);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the low price is set', () => {
      calculator.lowPrice(1);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the high price is set', () => {
      calculator.highPrice(1);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the close price is set', () => {
      calculator.closePrice(1);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should be valid when: close price >= low price && close price <= high price', () => {
      calculator.highPrice(2).lowPrice(1);

      expect(calculator.isValid()).to.equal(false);

      calculator.closePrice(3);
      expect(calculator.isValid()).to.equal(false);

      calculator.closePrice(0.5);
      expect(calculator.isValid()).to.equal(false);

      calculator.closePrice(1.5);
      expect(calculator.isValid()).to.equal(true);

      calculator.closePrice(1);
      expect(calculator.isValid()).to.equal(true);

      calculator.closePrice(2);
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should not be valid when no low, high, open and close prices are set when the method is DeMark', () => {
      calculator.method(PivotPointsMethodsEnum.DeMark);
      expect(calculator.isValid()).to.equal(false);

      calculator.lowPrice(1);
      expect(calculator.isValid()).to.equal(false);

      calculator.highPrice(2);
      expect(calculator.isValid()).to.equal(false);

      calculator.closePrice(2);
      expect(calculator.isValid()).to.equal(false);

      calculator.openPrice(2);
      expect(calculator.isValid()).to.equal(true);

      calculator
        .openPrice(0)
        .highPrice(0)
        .lowPrice(0)
        .closePrice(0);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should be valid when: close price >= low price && open price <= high price', () => {
      calculator
        .highPrice(2)
        .lowPrice(1)
        .closePrice(2);
      calculator.method(PivotPointsMethodsEnum.DeMark);

      expect(calculator.isValid()).to.equal(false);

      calculator.openPrice(3);
      expect(calculator.isValid()).to.equal(false);

      calculator.openPrice(0.5);
      expect(calculator.isValid()).to.equal(false);

      calculator.openPrice(1.5);
      expect(calculator.isValid()).to.equal(true);

      calculator.openPrice(1);
      expect(calculator.isValid()).to.equal(true);

      calculator.openPrice(2);
      expect(calculator.isValid()).to.equal(true);
    });
  });

  describe('#setState()', () => {
    it(SHOULD_UPDATE_CALCULATOR_STATE, () => {
      calculator.setState({
        closePrice: 1,
      });

      expect(calculator.getValueForKey('closePrice')).to.equal(1);
    });

    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      const instance = calculator.setState({
        closePrice: 1,
      });

      expect(instance).to.equal(calculator);
    });
  });

  describe('#setValue()', () => {
    it(SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE, () => {
      calculator.setValue('closePrice', 1);
      expect(calculator.getValueForKey('closePrice')).to.equal(1);
    });

    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.setValue('closePrice', 1)).to.equal(calculator);
    });
  });

  describe('#getValueForKey()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.setValue('closePrice', 1)).to.equal(calculator);
    });

    it(SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE, () => {
      calculator.setValue('closePrice', 2);
      expect(calculator.getValueForKey('closePrice')).to.equal(2);
    });
  });

  describe('#closePrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.closePrice(1)).to.equal(calculator);
    });

    it('should define the close price value', () => {
      calculator.closePrice(1);
      expect(calculator.getValueForKey('closePrice')).to.equal(1);
    });
  });

  describe('#highPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.highPrice(1)).to.equal(calculator);
    });

    it('should define the high price value', () => {
      calculator.highPrice(1);
      expect(calculator.getValueForKey('highPrice')).to.equal(1);
    });
  });

  describe('#lowPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.lowPrice(1)).to.equal(calculator);
    });

    it('should define the low price value', () => {
      calculator.lowPrice(1);
      expect(calculator.getValueForKey('lowPrice')).to.equal(1);
    });
  });

  describe('#method()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.method(PivotPointsMethodsEnum.DeMark)).to.equal(
        calculator,
      );
    });

    it('should define the method value', () => {
      calculator.method(PivotPointsMethodsEnum.DeMark);
      expect(calculator.getValueForKey('method')).to.equal(
        PivotPointsMethodsEnum.DeMark,
      );
    });
  });

  describe('#openPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.openPrice(1)).to.equal(calculator);
    });

    it('should define the open price value', () => {
      calculator.openPrice(1);
      expect(calculator.getValueForKey('openPrice')).to.equal(1);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it(SHOULD_RESET_CALCULATOR, () => {
      const results = calculator
        .openPrice(1)
        .lowPrice(1)
        .highPrice(2)
        .reset()
        .value();

      expect(results).to.deep.equal(DEFAULT_RESULTS);
    });
  });
});

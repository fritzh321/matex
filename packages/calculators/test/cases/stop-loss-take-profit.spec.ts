import { expect } from 'chai';
import 'mocha';

import { stopLossTakeProfit, StopLossTakeProfitCalculator } from '../../src';

import {
  SHOULD_MEMOIZE_LAST_VALUE,
  SHOULD_RETURN_CALCULATOR_INSTANCE,
  SHOULD_RETURN_CALCULATOR_PROPERTY_STATE_VALUE,
  SHOULD_RETURN_CALCULATOR_VALIDITY,
  SHOULD_RETURN_REFERENCE_CALCULATOR,
  SHOULD_UPDATE_CALCULATOR_PROPERTY_STATE,
  SHOULD_UPDATE_CALCULATOR_STATE,
} from '../messages/shared';

// tslint:disable-next-line:no-big-function
describe('StopLossTakeProfitCalculator', () => {
  let calculator: StopLossTakeProfitCalculator;

  beforeEach(() => {
    calculator = stopLossTakeProfit();
  });

  describe('positionSize()', () => {
    it(
      SHOULD_RETURN_CALCULATOR_INSTANCE('StopLossTakeProfitCalculator'),
      () => {
        expect(typeof calculator).to.equal('object');
        expect(calculator instanceof StopLossTakeProfitCalculator).to.equal(
          true,
        );
      },
    );
  });

  describe('#isValid()', () => {
    it(SHOULD_RETURN_CALCULATOR_VALIDITY, () => {
      expect(calculator.isValid()).to.equal(false);
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
    // tslint:disable-next-line:no-commented-code
    // it(SHOULD_RETURN_DEFAULT_RESULT, () => {
    //   const results = calculator.value();
    //   expect(results).to.deep.equal(DEFAULT_RESULTS);
    // });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#pipPrecision()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.pipPrecision(5)).to.equal(calculator);
    });

    it('should define the pip precision value', () => {
      calculator.pipPrecision(4);
      expect(calculator.getValueForKey('pipPrecision')).to.equal(4);
    });
  });

  describe('#tradingPairExchangeRate()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.tradingPairExchangeRate(1)).to.equal(calculator);
    });

    it('should define the exchange rate of the currency pair value', () => {
      calculator.tradingPairExchangeRate(1.25);
      expect(calculator.getValueForKey('tradingPairExchangeRate')).to.equal(
        1.25,
      );
    });
  });

  describe('#baseExchangeRate()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.baseExchangeRate(1.2)).to.equal(calculator);
    });

    it(`should define the base exchange rate value`, () => {
      calculator.baseExchangeRate(1.25);
      expect(calculator.getValueForKey('baseExchangeRate')).to.equal(1.25);
    });
  });

  describe('#baseListedSecond()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.baseListedSecond(false)).to.equal(calculator);
    });

    it(`should define the base listed second value`, () => {
      calculator.baseListedSecond(true);
      expect(calculator.getValueForKey('baseListedSecond')).to.equal(true);
    });
  });

  describe('#entryPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.entryPrice(100)).to.equal(calculator);
    });

    it(`should define the entry price value`, () => {
      calculator.entryPrice(1.5);
      expect(calculator.getValueForKey('entryPrice')).to.equal(1.5);
    });
  });

  describe('#stopLossPips()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.stopLossPips(50)).to.equal(calculator);
    });

    it(`should define the risk ratio value`, () => {
      calculator.stopLossPips(50);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(50);
    });
  });

  describe('#stopLossPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.stopLossPrice(1.5)).to.equal(calculator);
    });

    it(`should define the risk ratio value`, () => {
      calculator.stopLossPrice(1.5);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(1.5);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    // it('should reset the calculator', () => {
    //   const results = calculator
    //     .takeProfitAmount(1_000)
    //     .pipPrecision(2)
    //     .reset()
    //     .value();

    //   expect(results).to.deep.equal({});
    // });
  });
  // tslint:disable-next-line:max-file-line-count
});

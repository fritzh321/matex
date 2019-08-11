import { expect } from 'chai';
import 'mocha';

import { positionSize, PositionSizeCalculator } from '../../src';
import { DEFAULT_POSITION_SIZE_RESULTS } from '../samples/position-size.sample';

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

const DEFAULT_RESULTS = {
  amountAtRisk: 0,
  pipValue: 0,
  positionSize: 0,
  riskRatio: 0,
};

const DEFAULT_PARTIAL_RESULTS = {
  amountAtRisk: 50,
  pipValue: 0,
  positionSize: 0,
  riskRatio: 1,
};

// tslint:disable-next-line:no-big-function
describe('PositionSizeCalculator', () => {
  let calculator: PositionSizeCalculator;

  beforeEach(() => {
    calculator = positionSize();
  });

  describe('positionSize()', () => {
    it(SHOULD_RETURN_CALCULATOR_INSTANCE('PositionSizeCalculator'), () => {
      expect(typeof calculator).to.equal('object');
      expect(calculator instanceof PositionSizeCalculator).to.equal(true);
    });
  });

  describe('#isValid()', () => {
    it(SHOULD_RETURN_CALCULATOR_VALIDITY, () => {
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the account size is set', () => {
      calculator.accountSize(5_000);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the amount at risk is set', () => {
      calculator.amountAtRisk(50);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the risk ratio is set', () => {
      calculator.riskRatio(1);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should be valid when the account size and the amount at risk are set', () => {
      calculator
        .accountSize(5_000)
        .tradingPairExchangeRate(1)
        .amountAtRisk(50);
      
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when the account size and the risk ratio are set', () => {
      calculator
        .accountSize(5_000)
        .riskRatio(1)
        .tradingPairExchangeRate(1);
      
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when the account size and the risk ratio are incorrect', () => {
      calculator.accountSize(5_000).riskRatio(112);
      expect(calculator.isValid()).to.equal(false);

      calculator.accountSize(5_000).riskRatio(0);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should be valid when the account size and the amount at risk are incorrect', () => {
      calculator.accountSize(5_000).amountAtRisk(10_000);
      expect(calculator.isValid()).to.equal(false);

      calculator.accountSize(5_000).riskRatio(0);
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
    it(SHOULD_RETURN_DEFAULT_RESULT, () => {
      const results = calculator.value();
      expect(results).to.deep.equal(DEFAULT_RESULTS);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });

    it('should return the default value when only the account size is set', () => {
      const results = calculator.accountSize(5_000).value();
      expect(results).to.deep.equal(DEFAULT_RESULTS);
    });

    it('should return the default value when only the amount at risk is set', () => {
      const results = calculator.amountAtRisk(50).value();
      expect(results).to.deep.equal(DEFAULT_RESULTS);
    });

    it('should return a partial result when the account size and the risk ratio are set', () => {
      const results = calculator
        .accountSize(5_000)
        .riskRatio(1)
        .tradingPairExchangeRate(1)
        .value();
      
      expect(results).to.deep.equal(DEFAULT_PARTIAL_RESULTS);
    });

    it('should return a partial result when the account size and the amount at risk are set', () => {
      const results = calculator
        .accountSize(5_000)
        .amountAtRisk(50)
        .tradingPairExchangeRate(1)
        .value();
      expect(results).to.deep.equal(DEFAULT_PARTIAL_RESULTS);
    });

    it('should return a partial result when the account size, the entry price and the risk ratio are set', () => {
      const results = calculator
        .accountSize(5_000)
        .riskRatio(1)
        .entryPrice(1.02)
        .tradingPairExchangeRate(1)
        .value();
      expect(results).to.deep.equal(DEFAULT_PARTIAL_RESULTS);
    });

    it('should return a partial result when the account size, the stop loss price and the risk ratio are set', () => {
      const results = calculator
        .accountSize(5_000)
        .riskRatio(1)
        .stopLossPrice(1)
        .tradingPairExchangeRate(1)
        .value();
      expect(results).to.deep.equal(DEFAULT_PARTIAL_RESULTS);
    });

    it('should return a result when the account size, the stop loss price, the entry price and the risk ratio are set', () => {
      const results = calculator
        .accountSize(5_000)
        .riskRatio(1)
        .stopLossPrice(1)
        .entryPrice(1.02)
        .tradingPairExchangeRate(1)
        .value();
      expect(results).to.deep.equal(DEFAULT_POSITION_SIZE_RESULTS);
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

  describe('#accountSize()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.accountSize(100)).to.equal(calculator);
    });

    it(`should define the amount at risk value`, () => {
      calculator.accountSize(100);
      expect(calculator.getValueForKey('accountSize')).to.equal(100);
    });
  });

  describe('#amountAtRisk()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.amountAtRisk(100)).to.equal(calculator);
    });

    it(`should define the amount at risk value`, () => {
      calculator.amountAtRisk(100);
      expect(calculator.getValueForKey('amountAtRisk')).to.equal(100);
    });

    it(`should reset the risk ratio value`, () => {
      calculator.riskRatio(15);
      expect(calculator.getValueForKey('riskRatio')).to.equal(15);

      calculator.amountAtRisk(100);
      expect(calculator.getValueForKey('amountAtRisk')).to.equal(100);
      expect(calculator.getValueForKey('riskRatio')).to.equal(0);
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

    it(`should reset the stop loss pips value`, () => {
      calculator.stopLossPips(15);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(15);

      calculator.entryPrice(1.5);
      expect(calculator.getValueForKey('entryPrice')).to.equal(1.5);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(0);
    });
  });

  describe('#riskRatio()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.riskRatio(50)).to.equal(calculator);
    });

    it(`should define the risk ratio value`, () => {
      calculator.riskRatio(50);
      expect(calculator.getValueForKey('riskRatio')).to.equal(50);
    });

    it(`should reset the amount at risk value`, () => {
      calculator.amountAtRisk(100);
      expect(calculator.getValueForKey('amountAtRisk')).to.equal(100);

      calculator.riskRatio(15);
      expect(calculator.getValueForKey('riskRatio')).to.equal(15);
      expect(calculator.getValueForKey('amountAtRisk')).to.equal(0);
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

    it(`should reset the amount at risk value`, () => {
      calculator.entryPrice(1.4);
      expect(calculator.getValueForKey('entryPrice')).to.equal(1.4);

      calculator.stopLossPips(15);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(15);
      expect(calculator.getValueForKey('entryPrice')).to.equal(0);
    });

    it(`should reset the stop Loss price value`, () => {
      calculator.stopLossPrice(1.5);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(1.5);

      calculator.stopLossPips(15);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(15);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(0);
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

    it(`should reset the stop loss pips value`, () => {
      calculator.stopLossPips(100);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(100);

      calculator.stopLossPrice(15);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(15);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(0);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should reset the calculator', () => {
      const results = calculator
        .accountSize(1_000)
        .tradingPairExchangeRate(1)
        .riskRatio(5)
        .reset()
        .value();

      expect(results).to.deep.equal(DEFAULT_RESULTS);
    });
  });
  // tslint:disable-next-line:max-file-line-count
});

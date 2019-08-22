import { expect } from 'chai';
import 'mocha';

import {
  PositionEnum,
  stopLossTakeProfit,
  StopLossTakeProfitCalculator,
} from '../../src';

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

import { DEFAULT_STOP_LOSS_TAKE_PROFIT_EMPTY } from '../samples/stop-loss-take-profit.sample';

// tslint:disable-next-line:no-big-function
describe('StopLossTakeProfitCalculator', () => {
  let calculator: StopLossTakeProfitCalculator;

  beforeEach(() => {
    calculator = stopLossTakeProfit();
  });

  describe('stopLossTakeProfit()', () => {
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

    it('Should not be valid when only the entry price is set', () => {
      calculator.entryPrice(1.5);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the position size is set', () => {
      calculator.positionSize(5_000);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the tradingPairExchangeRate is set', () => {
      calculator.tradingPairExchangeRate(1.5);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the stopLossAmount is set', () => {
      calculator.stopLossAmount(200);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the stopLossPips is set', () => {
      calculator.stopLossPips(200);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the stopLossPrice is set', () => {
      calculator.stopLossPrice(200);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the takeProfitAmount is set', () => {
      calculator.takeProfitAmount(200);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the takeProfitPrice is set', () => {
      calculator.takeProfitPrice(200);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the takeProfitPips is set', () => {
      calculator.takeProfitPips(200);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the position size and the base exchange rate are set', () => {
      calculator.positionSize(5_000).tradingPairExchangeRate(1.5);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the position size and the entry price rate are set', () => {
      calculator.positionSize(5_000).entryPrice(1.5);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the base exchange rate and the entry price rate are set', () => {
      calculator.tradingPairExchangeRate(1.5).entryPrice(1.5);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should not be valid when only the entry price, the position size and the base exchange rate are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .entryPrice(1.5);
      expect(calculator.isValid()).to.equal(false);
    });

    it('Should be valid when only the entry price, the position size, the base exchange rate and the takeProfitAmount are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .takeProfitAmount(200)
        .entryPrice(1.5);
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when only the entry price, the position size, the base exchange rate and the takeProfitPrice are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .takeProfitPrice(200)
        .entryPrice(1.5);
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when only the entry price, the position size, the base exchange rate and the takeProfitPips are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .takeProfitPips(200)
        .entryPrice(1.5);
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when only the entry price, the position size, the base exchange rate and the stopLossAmount are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .stopLossAmount(200)
        .entryPrice(1.5);
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when only the entry price, the position size, the base exchange rate and the stopLossPrice are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .stopLossPrice(200)
        .entryPrice(1.5);
      expect(calculator.isValid()).to.equal(true);
    });

    it('Should be valid when only the entry price, the position size, the base exchange rate and the stopLossPips are set', () => {
      calculator
        .positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .stopLossPips(200)
        .entryPrice(1.5);
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
      const results = calculator.value();
      expect(results).to.deep.equal(DEFAULT_STOP_LOSS_TAKE_PROFIT_EMPTY);
    });

    it(SHOULD_MEMOIZE_LAST_VALUE, () => {
      expect(calculator.value()).to.equal(calculator.value());
    });

    it('should define the risk ratio value', () => {
      let results = calculator.positionSize(5_000)
        .tradingPairExchangeRate(1.5)
        .stopLossAmount(200)
        .entryPrice(1.5).value();

      expect(results.riskRewardRatio).to.equal(0);

      results = calculator.value();
      expect(results.riskRewardRatio).to.equal(0);

      results = calculator.takeProfitAmount(400).value();
      expect(results.riskRewardRatio).to.equal(2);

      results = calculator.takeProfitAmount(100).value();
      expect(results.riskRewardRatio).to.equal(0.5);
    });

    it('should define the stopLossPips and stopLossPrice values when stopLossAmuont is set and the position is long', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .stopLossAmount(200)
        .entryPrice(1.1).value();

      expect(results.stopLoss).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.078,
      });
    });

    it('should define the stopLossAmount and stopLossPips values when stopLossPrice is set and the position is long', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .stopLossPrice(1.078)
        .entryPrice(1.1).value();

      expect(results.stopLoss).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.078,
      });
    });

    it('should define the stopLossAmount and stopLossPrice values when stopLossPips is set and the position is long', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .stopLossPips(220)
        .entryPrice(1.1).value();

      expect(results.stopLoss).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.078,
      });
    });

    it('should define the takeProfitPips and takeProfitPrice values when takeProfitAmount is set and the position is long', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .takeProfitAmount(200)
        .entryPrice(1.1).value();

      expect(results.takeProfit).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.122,
      });
    });

    it('should define the takeProfitAmount and takeProfitPips values when takeProfitPrice is set and the position is long', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .takeProfitPrice(1.122)
        .entryPrice(1.1).value();

      expect(results.takeProfit).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.122,
      });
    });

    it('should define the takeProfitAmount and takeProfitPrice values when takeProfitPips is set and the position is long', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .takeProfitPips(220)
        .entryPrice(1.1).value();

      expect(results.takeProfit).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.122,
      });
    });

    it('should define the stopLossPips and stopLossPrice values when stopLossAmuont is set and the position is short', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .stopLossAmount(200)
        .position(PositionEnum.Short)
        .entryPrice(1.1).value();

      expect(results.stopLoss).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.122,
      });
    });

    it('should define the stopLossAmount and stopLossPips values when stopLossPrice is set and the position is short', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .stopLossPrice(1.122)
        .position(PositionEnum.Short)
        .entryPrice(1.1).value();

      expect(results.stopLoss).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.122,
      });
    });

    it('should define the stopLossAmount and stopLossPrice values when stopLossPips is set and the position is short', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .stopLossPips(220)
        .position(PositionEnum.Short)
        .entryPrice(1.1).value();

      expect(results.stopLoss).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.122,
      });
    });

    it('should define the takeProfitPips and takeProfitPrice values when takeProfitAmount is set and the position is short', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .takeProfitAmount(200)
        .position(PositionEnum.Short)
        .entryPrice(1.1).value();

      expect(results.takeProfit).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.078,
      });
    });

    it('should define the takeProfitAmount and takeProfitPips values when takeProfitPrice is set and the position is short', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .takeProfitPrice(1.078)
        .position(PositionEnum.Short)
        .entryPrice(1.1).value();

      expect(results.takeProfit).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.078,
      });
    });

    it('should define the takeProfitAmount and takeProfitPrice values when takeProfitPips is set and the position is short', () => {
      const results = calculator.positionSize(10_000)
        .tradingPairExchangeRate(1.1)
        .takeProfitPips(220)
        .position(PositionEnum.Short)
        .entryPrice(1.1).value();

      expect(results.takeProfit).to.deep.equal({
        amount: 200,
        pips: 220,
        price: 1.078,
      });
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

  describe('#position()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.position(PositionEnum.Long)).to.equal(calculator);
    });

    it(`should define the position value`, () => {
      calculator.position(PositionEnum.Long);
      expect(calculator.getValueForKey('position')).to.equal(PositionEnum.Long);
    });
  });

  describe('#stopLossPips()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.stopLossPips(50)).to.equal(calculator);
    });

    it(`should define the stopLossPips value`, () => {
      calculator.stopLossPips(50);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(50);
    });
  });

  describe('#stopLossPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.stopLossPrice(1.5)).to.equal(calculator);
    });

    it(`should define the stopLossPrice value`, () => {
      calculator.stopLossPrice(1.5);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(1.5);
    });

    it(`should reset the stopLossPips and the stopLossAmount values`, () => {
      calculator.stopLossPrice(1.5);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(1.5);
      expect(calculator.getValueForKey('stopLossAmount')).to.equal(0);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(0);
    });
  });

  describe('#stopLossAmount()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.stopLossAmount(1.5)).to.equal(calculator);
    });

    it(`should define the stopLossAmount value`, () => {
      calculator.stopLossAmount(1.5);
      expect(calculator.getValueForKey('stopLossAmount')).to.equal(1.5);
    });

    it(`should reset the stopLossPips and the stopLossPrice values`, () => {
      calculator.stopLossAmount(1.5);
      expect(calculator.getValueForKey('stopLossAmount')).to.equal(1.5);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(0);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(0);
    });
  });

  describe('#stopLossPips()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.stopLossPips(1.5)).to.equal(calculator);
    });

    it(`should define the stopLossAmount value`, () => {
      calculator.stopLossPips(1.5);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(1.5);
    });

    it(`should reset the stopLossAmount and the stopLossAmount values`, () => {
      calculator.stopLossPips(1.5);
      expect(calculator.getValueForKey('stopLossPips')).to.equal(1.5);
      expect(calculator.getValueForKey('stopLossAmount')).to.equal(0);
      expect(calculator.getValueForKey('stopLossPrice')).to.equal(0);
    });
  });

  describe('#takeProfitAmount()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.takeProfitAmount(1.5)).to.equal(calculator);
    });

    it(`should define the takeProfitAmount value`, () => {
      calculator.takeProfitAmount(1.5);
      expect(calculator.getValueForKey('takeProfitAmount')).to.equal(1.5);
    });

    it(`should reset the takeProfitPrice and the takeProfitPips values`, () => {
      calculator.takeProfitAmount(1.5);
      expect(calculator.getValueForKey('takeProfitAmount')).to.equal(1.5);
      expect(calculator.getValueForKey('takeProfitPrice')).to.equal(0);
      expect(calculator.getValueForKey('takeProfitPips')).to.equal(0);
    });
  });

  describe('#takeProfitPrice()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.takeProfitPrice(1.5)).to.equal(calculator);
    });

    it(`should define the takeProfitPrice value`, () => {
      calculator.takeProfitPrice(1.5);
      expect(calculator.getValueForKey('takeProfitPrice')).to.equal(1.5);
    });

    it(`should reset the takeProfitAmount and the takeProfitPips values`, () => {
      calculator.takeProfitPrice(1.5);
      expect(calculator.getValueForKey('takeProfitPrice')).to.equal(1.5);
      expect(calculator.getValueForKey('takeProfitAmount')).to.equal(0);
      expect(calculator.getValueForKey('takeProfitPips')).to.equal(0);
    });
  });

  describe('#takeProfitPips()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.takeProfitPips(1.5)).to.equal(calculator);
    });

    it(`should define the takeProfitPips value`, () => {
      calculator.takeProfitPips(1.5);
      expect(calculator.getValueForKey('takeProfitPips')).to.equal(1.5);
    });

    it(`should reset the takeProfitAmount and the takeProfitPrice values`, () => {
      calculator.takeProfitPips(1.5);
      expect(calculator.getValueForKey('takeProfitPips')).to.equal(1.5);
      expect(calculator.getValueForKey('takeProfitAmount')).to.equal(0);
      expect(calculator.getValueForKey('takeProfitPrice')).to.equal(0);
    });
  });

  describe('#reset()', () => {
    it(SHOULD_RETURN_REFERENCE_CALCULATOR, () => {
      expect(calculator.reset()).to.equal(calculator);
    });

    it('should reset the calculator', () => {
      const results = calculator
        .takeProfitAmount(1_000)
        .pipPrecision(2)
        .reset()
        .value();

      expect(results).to.deep.equal(DEFAULT_STOP_LOSS_TAKE_PROFIT_EMPTY);
    });
  });
  // tslint:disable-next-line:max-file-line-count
});

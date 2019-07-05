import { expect } from 'chai';
import 'mocha-cakes-2';

import { fibonacciLevels } from '../../src/calculators/fibonacci-levels';
import { TrendEnum } from '../../src/enums/trend.enum';

import {
  defaultFibonacciLevelsResultDown,
  defaultFibonacciLevelsResultUp,
} from '../samples/fibonacci-levels.sample';

Feature('Calculating Fibonacci Levels', () => {
  Scenario('When the trend is up', () => {
    const calculator = fibonacciLevels();

    Given('the low price is 1.4', () => {
      calculator.low(1.4);
    });

    And('the high price is 1.5', () => {
      calculator.high(1.5);
    });

    When('the trend is up', () => {
      calculator.trend(TrendEnum.Up);
    });

    Then('the fibonacci levels should be valid', () => {
      expect(calculator.valid()).to.equal(true);
      const fibonacciLevelsResult = calculator.value();
      expect(fibonacciLevelsResult).to.deep.equal(
        defaultFibonacciLevelsResultUp,
      );
      expect(fibonacciLevelsResult.extensions[0].level).to.equal('261.8%');
      expect(fibonacciLevelsResult.retracements[0].level).to.equal('23.6%');
    });
  });

  Scenario('When the trend is down', () => {
    const calculator = fibonacciLevels();

    Given('the low price is 1.4', () => {
      calculator.low(1.4);
    });

    And('the high price is 1.5', () => {
      calculator.high(1.5);
    });

    When('the trend is down', () => {
      calculator.trend(TrendEnum.Down);
    });

    Then('the fibonacci levels should be valid', () => {
      expect(calculator.valid()).to.equal(true);
      const fibonacciLevelsResult = calculator.value();
      expect(fibonacciLevelsResult).to.deep.equal(
        defaultFibonacciLevelsResultDown,
      );
      expect(fibonacciLevelsResult.extensions[0].level).to.equal('23.6%');
      expect(fibonacciLevelsResult.retracements[0].level).to.equal('78.6%');
    });
  });
});

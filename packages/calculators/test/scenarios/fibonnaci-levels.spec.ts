import { expect } from 'chai';
import 'mocha-cakes-2';

import { fibonnaciLevels } from '../../src/calculators/fibonnaci-levels';
import { TrendEnum } from '../../src/enums/trend.enum';
import {
  defaultFibonnaciLevelsResultDown,
  defaultFibonnaciLevelsResultUp,
} from '../samples/fibonnaci-levels.sample';

Feature('Calculating Fibonnaci Levels', () => {
  Scenario('When the trend is up', () => {
    const calculator = fibonnaciLevels();

    Given('the low price is 1.4', () => {
      calculator.low(1.4);
    });

    And('the high price is 1.5', () => {
      calculator.high(1.5);
    });

    When('the trend is up', () => {
      calculator.trend(TrendEnum.Up);
    });

    Then('the fibonnaci levels should be valid', () => {
      expect(calculator.valid()).to.equal(true);
      const fibonnaciLevelsResult = calculator.value();
      expect(fibonnaciLevelsResult).to.deep.equal(
        defaultFibonnaciLevelsResultUp,
      );
      expect(fibonnaciLevelsResult.extensions[0].label).to.equal('261.8%');
      expect(fibonnaciLevelsResult.retracements[0].label).to.equal('23.6%');
    });
  });

  Scenario('When the trend is down', () => {
    const calculator = fibonnaciLevels();

    Given('the low price is 1.4', () => {
      calculator.low(1.4);
    });

    And('the high price is 1.5', () => {
      calculator.high(1.5);
    });

    When('the trend is down', () => {
      calculator.trend(TrendEnum.Down);
    });

    Then('the fibonnaci levels should be valid', () => {
      expect(calculator.valid()).to.equal(true);
      const fibonnaciLevelsResult = calculator.value();
      expect(fibonnaciLevelsResult).to.deep.equal(
        defaultFibonnaciLevelsResultDown,
      );
      expect(fibonnaciLevelsResult.extensions[0].label).to.equal('23.6%');
      expect(fibonnaciLevelsResult.retracements[0].label).to.equal('78.6%');
    });
  });
});

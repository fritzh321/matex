import { expect } from 'chai';
import 'mocha-cakes-2';

import { pivotPoints, PivotPointsMethodsEnum } from '../../src';

import {
  PIVOT_POINTS_CAMARILLA,
  PIVOT_POINTS_DEMARK_RESULTS,
  PIVOT_POINTS_DEMARK_RESULTS_CLOSE_GREATER_OPEN,
  PIVOT_POINTS_DEMARK_RESULTS_OPEN_GREATER_CLOSE,
  PIVOT_POINTS_FIBONACCI,
  PIVOT_POINTS_STANDARD,
  PIVOT_POINTS_WOODIE_RESULTS,
} from '../samples/pivot-points.sample';

import {
  CLOSE_PRICE,
  COMPUTE_RIGHT_VALUES,
  HIGH_PRICE,
  LOW_PRICE,
  OPEN_PRICE,
} from '../messages/shared';

import { PIVOT_POINTS_METHOD } from '../messages/pivot-points.message';

Feature('Calculating the pivot points', () => {
  Scenario('When the method is Woodie', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.3), () => {
      calculator.lowPrice(1.3);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(CLOSE_PRICE(1.45), () => {
      calculator.closePrice(1.45);
    });

    When(PIVOT_POINTS_METHOD('Woodie'), () => {
      calculator.method(PivotPointsMethodsEnum.Woodie);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(PIVOT_POINTS_WOODIE_RESULTS);
    });
  });

  Scenario('When the method is DeMark and close > open', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.3), () => {
      calculator.lowPrice(1.3);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(OPEN_PRICE(1.35), () => {
      calculator.openPrice(1.35);
    });

    And(CLOSE_PRICE(1.45), () => {
      calculator.closePrice(1.45);
    });

    When(PIVOT_POINTS_METHOD('DeMark'), () => {
      calculator.method(PivotPointsMethodsEnum.DeMark);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(
        PIVOT_POINTS_DEMARK_RESULTS_CLOSE_GREATER_OPEN,
      );
    });
  });

  Scenario('When the method is DeMark and close < open', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.3), () => {
      calculator.lowPrice(1.3);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(OPEN_PRICE(1.35), () => {
      calculator.openPrice(1.35);
    });

    And(CLOSE_PRICE(1.32), () => {
      calculator.closePrice(1.32);
    });

    When(PIVOT_POINTS_METHOD('DeMark'), () => {
      calculator.method(PivotPointsMethodsEnum.DeMark);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(
        PIVOT_POINTS_DEMARK_RESULTS_OPEN_GREATER_CLOSE,
      );
    });
  });

  Scenario('When the method is DeMark and close = open', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.3), () => {
      calculator.lowPrice(1.3);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(OPEN_PRICE(1.35), () => {
      calculator.openPrice(1.35);
    });

    And(CLOSE_PRICE(1.35), () => {
      calculator.closePrice(1.35);
    });

    When(PIVOT_POINTS_METHOD('DeMark'), () => {
      calculator.method(PivotPointsMethodsEnum.DeMark);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(PIVOT_POINTS_DEMARK_RESULTS);
    });
  });

  Scenario('When the method is Standard', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.25), () => {
      calculator.lowPrice(1.25);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(CLOSE_PRICE(1.3), () => {
      calculator.closePrice(1.3);
    });

    When(PIVOT_POINTS_METHOD('Standard'), () => {
      calculator.method(PivotPointsMethodsEnum.Standard);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(PIVOT_POINTS_STANDARD);
    });
  });

  Scenario('When the method is Fibonacci', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.25), () => {
      calculator.lowPrice(1.25);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(CLOSE_PRICE(1.3), () => {
      calculator.closePrice(1.3);
    });

    When(PIVOT_POINTS_METHOD('Fibonacci'), () => {
      calculator.method(PivotPointsMethodsEnum.Fibonacci);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(PIVOT_POINTS_FIBONACCI);
    });
  });

  Scenario('When the method is Camarilla', () => {
    const calculator = pivotPoints();
    expect(typeof calculator).to.equal('object');

    Given(LOW_PRICE(1.2), () => {
      calculator.lowPrice(1.2);
    });

    And(HIGH_PRICE(1.5), () => {
      calculator.highPrice(1.5);
    });

    And(CLOSE_PRICE(1.3), () => {
      calculator.closePrice(1.3);
    });

    When(PIVOT_POINTS_METHOD('Camarilla'), () => {
      calculator.method(PivotPointsMethodsEnum.Camarilla);
    });

    Then(COMPUTE_RIGHT_VALUES, () => {
      expect(calculator.isValid()).to.equal(true);
      expect(calculator.value()).to.deep.equal(PIVOT_POINTS_CAMARILLA);
    });
  });
});

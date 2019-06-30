import { expect } from 'chai';
import 'mocha';

import { fibonnaciLevels } from '../../src/calculators/fibonnaci-levels';
import { defaultFibonnaciLevelsResult } from '../samples/fibonnaci-levels.sample';

describe('fibonnaciLevels', () => {
  describe('fibonnaciLevels()', () => {
    it('should return an instance of the FibonnaciLevelsCalculator class', () => {
      const calculator = fibonnaciLevels();
      expect(typeof calculator).to.equal('object');
    });
  });

  describe('#value()', () => {
    it('should compute the fibonnaci levels extensions and retracements', () => {
      const fibonnaciLevelsResult = fibonnaciLevels().value();
      expect(fibonnaciLevelsResult).to.deep.equal(defaultFibonnaciLevelsResult);
    });

    it('should memoize last value', () => {
      const calculator = fibonnaciLevels();
      expect(calculator.value()).to.equal(calculator.value());
    });
  });

  describe('#reset()', () => {
    it('should reset the calculator', () => {
      const fibonnaciLevelsResult = fibonnaciLevels()
        .high(1.35)
        .high(1.25)
        .reset()
        .value();

      expect(fibonnaciLevelsResult).to.deep.equal(defaultFibonnaciLevelsResult);
    });
  });
});

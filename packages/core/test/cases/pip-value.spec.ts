import { expect } from 'chai';
import 'mocha';

import { Matex, MatexPipValueCalculator } from '../../src';
import { testMatexConfig } from '../samples/config';

describe('PipValueCalculator', () => {
  let matex: Matex;

  beforeEach(() => {
    matex = new Matex(testMatexConfig);
  });

  describe('#pip()', () => {
    let pip: MatexPipValueCalculator;

    beforeEach(() => {
      pip = matex.pip();
    });

    it('should return a MatexPipValueCalcultor instance', () => {
      expect(typeof pip).to.equal('object');
      expect(pip instanceof MatexPipValueCalculator).to.equal(true);
    });
  });
});

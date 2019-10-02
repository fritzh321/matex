import { expect } from 'chai';
import 'mocha';

import { ReporterProvider } from '../src';

describe('ReporterProvider', () => {
  let reporter: ReporterProvider;

  beforeEach(() => {
    reporter = new ReporterProvider();
  });

  describe('report()', () => {
    it('should report a report state to a string', () => {
      expect(
        reporter.report({
          pipValue: {
            label: 'Pip Value:',
            value: 1.45252,
          },
          positionSize: {
            label: 'Position Size:',
            value: 100_000,
          },
        }),
      ).to.equal(`Pip Value: 1.45252\nPosition Size: 100000`);

      expect(
        reporter.report({
          pipValue: {
            label: 'Pip Value:',
            value: 1.45252,
          },
        }),
      ).to.equal(`Pip Value: 1.45252`);
    });
  });
});

import { IMatexConfig } from '../../src';

export const testMatexConfig: IMatexConfig = {
  exchangeProvider: {
    // tslint:disable-next-line: cyclomatic-complexity
    rates(base: string, counter: string) {
      let price: number = 0;

      if (base === 'EUR') {
        if (counter === 'USD' || counter === 'CAD') {
          price = 1.25;
        } else {
          price = 1;
        }
      } else if (base === 'USD') {
        if (counter === 'EUR') {
          price = 0.75;
        } else if (counter === 'AUD') {
          price = 1.6;
        } else {
          price = 1;
        }
      } else if (base === 'AUD') {
        price = 100;
      }

      return {
        price,
        symbol: `${base}/${counter}`,
        timestamp: Date.now(),
      };
    },
  },
};

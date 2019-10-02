import { Observer } from 'rxjs';

import { IQuote } from './quote.interface';

export interface IExchangeProvider {
  rates: (
    base: string,
    counter: string,
  ) => Observer<IQuote> | Promise<IQuote> | IQuote | null;
}

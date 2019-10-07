import { IQuote } from '@matex/providers';
import { isObservable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IMatexConfig } from '../interfaces';
import { MatexPipValueStateType } from '../states';

export class MatexPipValueMixin<
  S extends MatexPipValueStateType = MatexPipValueStateType
> {
  public setValue: (key: keyof S, value: any) => this;

  public pipPrecision: (pipPrecision: number) => this;

  public baseExchangeRate: (baseExchangeRate: number) => this;

  public baseListedSecond: (baseListedSecond: boolean) => this;

  public tradingPairExchangeRate: (tradingPairExchangeRate: number) => this;

  public isValid: () => boolean;

  public validState: S;

  protected config: IMatexConfig;

  public account(account: string) {
    return this.setValue('account', account);
  }

  public base(code: string) {
    return this.setValue('base', code);
  }

  public counter(code: string) {
    const { instrumentProvider } = this.config;

    if (instrumentProvider) {
      const instrumentMetadata = instrumentProvider.metadata(code);

      if (instrumentMetadata) {
        this.setValue('pipPrecision', instrumentMetadata.pip.precision);
      }
    }

    return this.setValue('counter', code);
  }

  protected async setExchangeRates() {
    const { exchangeProvider } = this.config;
    const { account, base, counter } = this.validState;
    const tradingPairQuoteAsync = exchangeProvider!.rates(base!, counter!);
    const tradingPairQuote = await this.getQuoteFromObject(
      tradingPairQuoteAsync,
    );

      this.setValue('tradingPairExchangeRate', tradingPairQuote.price);

      if (account === counter) {
        this.setValue('baseListedSecond', true);
    } else if (account !== base) {
      const accountBaseQuoteAsync = exchangeProvider!.rates(account!, base!);
      const accountBaseQuote = await this.getQuoteFromObject(
        accountBaseQuoteAsync,
      );
      this.setValue('baseExchangeRate', accountBaseQuote.price);
    }
  }

  protected async getQuoteFromObject(quotish: any) {
    let quote: IQuote;

    if (quotish instanceof Promise) {
      quote = await quotish;
    } else if (isObservable<IQuote>(quotish)) {
      quote = await quotish.pipe(take(1)).toPromise();
    } else {
      quote = quotish;
    }

    return quote;
  }
}

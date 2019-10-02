import { PipValueCalculator, StateValidator } from '@matex/calculators';
import { IQuote } from '@matex/providers';
import { isObservable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IMatexConfig } from '../interfaces';
import { IMatexPipValueState, initialMatexPipValueState } from '../states';

const matexPipValueValidators: Array<StateValidator<IMatexPipValueState>> = [
  ({ positionSize }) => positionSize > 0,
  ({ base, counter, account }) => !!(base && counter && account),
];

export class MatexPipValueCalculator extends PipValueCalculator<
  IMatexPipValueState,
  Promise<number>
> {
  constructor(
    protected config: IMatexConfig,
    protected initialState = initialMatexPipValueState,
    protected validators = matexPipValueValidators,
  ) {
    super(initialMatexPipValueState, matexPipValueValidators);
  }

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
        this.pipPrecision(instrumentMetadata.pip.precision);
      }
    }

    return this.setValue('counter', code);
  }

  public async value() {
    const { exchangeProvider } = this.config;

    if (this.isValid() && exchangeProvider) {
      const { account, base, counter } = this.validState;
      const tradingPairQuoteAsync = exchangeProvider.rates(base!, counter!);
      const tradingPairQuote = await this.getQuoteFromObject(
        tradingPairQuoteAsync,
      );
      this.tradingPairExchangeRate(tradingPairQuote.price);

      if (account === counter) {
        this.baseListedSecond(true);
      } else if (account !== base) {
        const accountBaseQuoteAsync = exchangeProvider.rates(account!, base!);
        const accountBaseQuote = await this.getQuoteFromObject(
          accountBaseQuoteAsync,
        );
        this.baseExchangeRate(accountBaseQuote.price);
      }

      return super.value();
    }

    return 0;
  }

  private async getQuoteFromObject(quotish: any) {
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

export const pip = (config: IMatexConfig) => {
  return new MatexPipValueCalculator(config);
};

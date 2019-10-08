import { RequiredMarginCalculator } from '@matex/calculators';
import { IQuote } from '@matex/providers';
import { applyMixins } from '@tutils/helpers';

import { IMatexConfig } from '../interfaces';
import { MatexPipValueMixin } from '../mixins';
import { matexRequiredMarginValidators } from '../validators';

import {
  initialMatexRequiredMarginState,
  MatexRequiredMarginStateType,
} from '../states';

export class MatexRequiredMarginCalculator extends RequiredMarginCalculator<
  MatexRequiredMarginStateType,
  Promise<number>
  > {
  public account: (code: string) => this;

  public base: (code: string) => this;

  public counter: (code: string) => this;

  protected getQuoteFromObject: (quote: any) => Promise<IQuote>;

  constructor(
    protected config: IMatexConfig,
    protected initialState = initialMatexRequiredMarginState,
    protected validators = matexRequiredMarginValidators,
  ) {
    super(initialState, validators);
  }

  public async value() {
    const { exchangeProvider } = this.config;

    if (this.isValid() && exchangeProvider) {
      await this.setExchangeRates();
      return super.value();
    }

    return 0;
  }

  protected async setExchangeRates() {
    const { exchangeProvider } = this.config;
    const { account, base, counter } = this.validState;
    if (account === base) {
      this.setValue('tradingPairExchangeRate', 1);
    } else {
      const tradingPairQuoteAsync = exchangeProvider!.rates(base!, counter!);
      const tradingPairQuote = await this.getQuoteFromObject(
        tradingPairQuoteAsync,
      );

      this.setValue('tradingPairExchangeRate', tradingPairQuote.price);

      if (account === counter) {
        this.setValue('baseListedSecond', true);
      } else {
        const accountBaseQuoteAsync = exchangeProvider!.rates(base!, account!);
        const accountBaseQuote = await this.getQuoteFromObject(
          accountBaseQuoteAsync,
        );
        this.setValue('baseExchangeRate', accountBaseQuote.price);
      }
    }
  }
}

applyMixins(MatexRequiredMarginCalculator, [MatexPipValueMixin]);

export const requiredMargin = (config: IMatexConfig) => {
  return new MatexRequiredMarginCalculator(config);
};

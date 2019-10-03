import { RequiredMarginCalculator } from '@matex/calculators';
import { applyMixins } from '@tutils/helpers';

import { IMatexConfig } from '../interfaces';
import { MatexPipValueMixin } from '../mixins';
import { matexPipValueValidators } from '../validators';

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

  protected setExchangeRates: () => Promise<void>;

  constructor(
    protected config: IMatexConfig,
    protected initialState = initialMatexRequiredMarginState,
    protected validators = matexPipValueValidators,
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
}

applyMixins(MatexRequiredMarginCalculator, [MatexPipValueMixin]);

export const requiredMargin = (config: IMatexConfig) => {
  return new MatexRequiredMarginCalculator(config);
};

import { PipValueCalculator } from '@matex/calculators';
import { applyMixins } from '@tutils/helpers';

import { IMatexConfig } from '../interfaces';
import { MatexPipValueMixin } from '../mixins';
import { initialMatexPipValueState, MatexPipValueStateType } from '../states';
import { matexPipValueValidators } from '../validators';

export class MatexPipValueCalculator extends PipValueCalculator<
  MatexPipValueStateType,
  Promise<number>
> {
  public account: (code: string) => this;

  public base: (code: string) => this;

  public counter: (code: string) => this;

  protected setExchangeRates: () => Promise<void>;

  constructor(
    protected config: IMatexConfig,
    protected initialState = initialMatexPipValueState,
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

applyMixins(MatexPipValueCalculator, [MatexPipValueMixin]);

export const pip = (config: IMatexConfig) => {
  return new MatexPipValueCalculator(config);
};

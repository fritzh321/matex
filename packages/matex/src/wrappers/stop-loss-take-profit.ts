import { applyMixins } from '@tutils/helpers';

import {
  StopLossTakeProfitCalculator,
  StopLossTakeProfitResult,
} from '@matex/calculators';

import { IMatexConfig } from '../interfaces';
import { MatexPipValueMixin } from '../mixins';
import { matexStopLossTakeProfitValidators } from '../validators';

import {
  initialMatexStopLossTakeProfitState,
  MatexStopLossTakeProfitStateType,
} from '../states';

export class MatexStopLossTakeProfitCalculator extends StopLossTakeProfitCalculator<
  MatexStopLossTakeProfitStateType,
  Promise<StopLossTakeProfitResult>
> {
  public account: (code: string) => this;

  public base: (code: string) => this;

  public counter: (code: string) => this;

  protected setExchangeRates: () => Promise<void>;

  constructor(
    protected config: IMatexConfig,
    protected initialState = initialMatexStopLossTakeProfitState,
    protected validators = matexStopLossTakeProfitValidators,
  ) {
    super(initialState, validators);
  }

  public async value() {
    const { exchangeProvider } = this.config;

    if (this.isValid() && exchangeProvider) {
      await this.setExchangeRates();
      return super.value();
    }

    return super.value();
  }
}

applyMixins(MatexStopLossTakeProfitCalculator, [MatexPipValueMixin]);

export const stopLossTakeProfit = (config: IMatexConfig) => {
  return new MatexStopLossTakeProfitCalculator(config);
};

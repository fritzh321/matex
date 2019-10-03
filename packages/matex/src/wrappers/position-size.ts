import { PositionSizeCalculator, PositionSizeResult } from '@matex/calculators';
import { applyMixins } from '@tutils/helpers';

import { IMatexConfig } from '../interfaces';
import { MatexPipValueMixin } from '../mixins';
import { matexPositionSizeValidators } from '../validators';

import {
  initialMatexPositionSizeState,
  MatexPositionSizeStateType,
} from '../states';

export class MatexPositionSizeCalculator extends PositionSizeCalculator<
  MatexPositionSizeStateType,
  Promise<PositionSizeResult>
> {
  public account: (code: string) => this;

  public base: (code: string) => this;

  public counter: (code: string) => this;

  protected setExchangeRates: () => Promise<void>;

  constructor(
    protected config: IMatexConfig,
    protected initialState = initialMatexPositionSizeState,
    protected validators = matexPositionSizeValidators,
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

applyMixins(MatexPositionSizeCalculator, [MatexPipValueMixin]);

export const positionSize = (config: IMatexConfig) => {
  return new MatexPositionSizeCalculator(config);
};

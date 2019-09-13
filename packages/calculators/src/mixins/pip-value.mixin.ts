import { PipValueState } from '../states';

export class PipValueMixin<S extends PipValueState = PipValueState> {
  public setValue: (key: keyof S, value: any) => this;

  public baseExchangeRate(baseExchangeRate: number) {
    return this.setValue('baseExchangeRate', baseExchangeRate);
  }

  public baseListedSecond(baseListedSecond: boolean) {
    return this.setValue('baseListedSecond', baseListedSecond);
  }

  public pipPrecision(pipPrecision: number) {
    return this.setValue('pipPrecision', pipPrecision);
  }

  public positionSize(positionSize: number) {
    return this.setValue('positionSize', positionSize);
  }

  public tradingPairExchangeRate(tradingPairExchangeRate: number) {
    return this.setValue('tradingPairExchangeRate', tradingPairExchangeRate);
  }
}

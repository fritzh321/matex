import { PositionEnum } from '../../enums';
import { TakeProfitState } from '../../states/take-profit.state';

export class TakeProfitMixin<S extends TakeProfitState> {
  public setValue: (key: keyof S, value: any) => this;

  public entryPrice(entryPrice: number) {
    return this.setValue('entryPrice', entryPrice);
  }

  public position(position: PositionEnum) {
    return this.setValue('position', position);
  }

  public takeProfitAmount(takeProfitAmount: number) {
    this.setValue('takeProfitPrice', 0);
    this.setValue('takeProfitPips', 0);
    return this.setValue('takeProfitAmount', takeProfitAmount);
  }

  public takeProfitPips(takeProfitPips: number) {
    this.setValue('takeProfitAmount', 0);
    this.setValue('takeProfitPrice', 0);
    return this.setValue('takeProfitPips', takeProfitPips);
  }

  public takeProfitPrice(takeProfitPrice: number) {
    this.setValue('takeProfitAmount', 0);
    this.setValue('takeProfitPips', 0);
    return this.setValue('takeProfitPrice', takeProfitPrice);
  }
}

import { PositionEnum } from '../../enums';
import { StopLossState } from '../../states/stop-loss.state';

export class StopLossMixin<S extends StopLossState> {
  public setValue: (key: keyof S, value: any) => this;

  public entryPrice(entryPrice: number) {
    return this.setValue('entryPrice', entryPrice);
  }

  public position(position: PositionEnum) {
    return this.setValue('position', position);
  }

  public stopLossAmount(stopLossAmount: number) {
    this.setValue('stopLossPips', 0);
    this.setValue('stopLossPrice', 0);
    return this.setValue('stopLossAmount', stopLossAmount);
  }

  public stopLossPips(stopLossPips: number) {
    this.setValue('stopLossAmount', 0);
    this.setValue('stopLossPrice', 0);
    return this.setValue('stopLossPips', stopLossPips);
  }

  public stopLossPrice(stopLossPrice: number) {
    this.setValue('stopLossAmount', 0);
    this.setValue('stopLossPips', 0);
    return this.setValue('stopLossPrice', stopLossPrice);
  }
}

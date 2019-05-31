export class BaseCalculator<S extends object = {}, R = {}> {
  protected state: S;

  protected result: R | null = null;

  constructor(private initialState: any = {}) {
    this.state = { ...initialState };
  }

  public reset() {
    this.result = null;
    this.state = { ...this.initialState };
    return this;
  }

  protected setValue(key: keyof S, value: any) {
    this.result = null;
    this.state[key] = value;
    return this;
  }
}

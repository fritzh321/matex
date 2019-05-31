export class BaseCalculator<T = {}> {
  protected data: T;

  protected result: number | null = null;

  protected setValue(key: keyof T, value: any) {
    this.result = null;
    this.data[key] = value;
    return this;
  }
}

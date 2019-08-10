import { StateValidator } from '../../types/state-validator.type';

export abstract class BaseCalculator<S extends object = {}, R = any> {
  protected state: S;

  protected result: R | null = null;

  protected validity = true;

  protected get validState(): S {
    return this.validity ? this.state : this.initialState;
  }

  constructor(
    protected initialState: S = {} as S,
    protected validators?: Array<StateValidator<S>>,
  ) {
    this.state = { ...initialState };
    this.checkValidity();
  }

  public reset(): this {
    this.result = null;
    this.state = { ...this.initialState };

    this.checkValidity();

    return this;
  }

  public isValid() {
    return this.validity;
  }

  public setState(state: Partial<S>): this {
    this.result = null;
    this.state = {
      ...this.state,
      ...state,
    };

    this.checkValidity();

    return this;
  }

  public setValue(key: keyof S, value: any): this {
    if (typeof value === 'number') {
      value = Math.abs(value);
    }

    this.result = null;
    this.state = {
      ...this.state,
      [key]: value,
    };

    this.checkValidity();

    return this;
  }

  public getValueForKey(key: keyof S): any {
    return this.state[key];
  }

  protected checkValidity() {
    const validators = this.validators;
    let validity = true;

    if (validators) {
      validity = validators.every(validator => validator(this.state));
    }

    this.validity = validity;
  }
}

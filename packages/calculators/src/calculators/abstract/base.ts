import { StateValidator } from '../../types/state-validator.type';

export abstract class BaseCalculator<S extends object = {}, R = {}> {
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
  }

  public reset() {
    this.result = null;
    this.state = { ...this.initialState };
    return this;
  }

  public valid() {
    return this.validity;
  }

  public setState(state: S): this {
    this.result = null;
    this.state = {
      ...state,
    };

    this.checkValidity();

    return this;
  }

  protected setValue(key: keyof S, value: any): this {
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

  protected checkValidity() {
    const validators = this.validators;
    let validity = true;

    if (validators) {
      validity = validators.every(validator => validator(this.state));
    }

    this.validity = validity;
  }
}

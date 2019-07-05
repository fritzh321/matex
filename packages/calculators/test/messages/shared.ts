export const SHOULD_RETURN_CALCULATOR_REFERENCE =
  'should return the reference of the calculator';

export const SHOULD_RESET_CALCULATOR = 'should reset the calculator';

export const SHOULD_MEMOIZE_LAST_VALUE = 'should memoize last value';

export const SHOULD_RETURN_CALCULATOR_INSTANCE = (className: string) => {
  return `should return an instance of the ${className} class`;
};

export const SHOULD_RETURN_DEFAULT_VALUE = (value: string) => {
  return `should return ${value} as a default value`;
};

export const LOW_PRICE = (price: number) => `the low price is ${price}`;

export const HIGH_PRICE = (price: number) => `the high price is ${price}`;

export const OPEN_PRICE = (price: number) => `the open price is ${price}`;

export const CLOSE_PRICE = (price: number) => `the close price is ${price}`;

export const COMPUTE_RIGHT_VALUES =
  'the calculator should compute the right values';

import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const numberOne = 1;
  const numberTwo = 2;
  test('should add two numbers', () => {
    expect(
      simpleCalculator({ a: numberOne, b: numberTwo, action: Action.Add }),
    ).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({ a: numberOne, b: numberTwo, action: Action.Subtract }),
    ).toBe(-1);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({ a: numberOne, b: numberTwo, action: Action.Multiply }),
    ).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({ a: numberOne, b: numberTwo, action: Action.Divide }),
    ).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: numberOne,
        b: numberTwo,
        action: Action.Exponentiate,
      }),
    ).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: numberOne, b: numberTwo, action: 'invalid' }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'ivalid', b: 'ivalid', action: 'invalid' }),
    ).toBe(null);
  });
});

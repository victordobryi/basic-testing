import { simpleCalculator, Action } from './index';
import { a, b } from '../constants';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(-1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(2);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a,
        b,
        action: Action.Exponentiate,
      }),
    ).toBe(1);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a, b, action: 'invalid' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'ivalid', b: 'ivalid', action: 'invalid' }),
    ).toBe(null);
  });
});

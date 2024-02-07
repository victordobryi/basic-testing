import { simpleCalculator, Action } from './index';
import { INVALID_VALUE, a, b } from '../constants';

const testCases = [
  { a, b, action: Action.Add, expected: 3 },
  { a, b, action: Action.Subtract, expected: -1 },
  { a, b, action: Action.Multiply, expected: 2 },
  { a, b, action: Action.Divide, expected: 0.5 },
  { a, b, action: Action.Exponentiate, expected: 1 },
  { a, b, action: INVALID_VALUE, expected: null },
  { a: INVALID_VALUE, b, action: Action.Divide, expected: null },
  { a, b: INVALID_VALUE, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly $action the result of $a, $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});

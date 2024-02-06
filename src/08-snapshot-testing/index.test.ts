import { elements, expectedLinkedList } from 'constants/index';
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });
});

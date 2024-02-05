import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import { FIFTY, ONE_HUNDRED, ONE_HUNDRED_AND_FIFTY } from '../constants';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(ONE_HUNDRED);

    expect(account.getBalance()).toBe(ONE_HUNDRED);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(ONE_HUNDRED);

    expect(() => account.withdraw(ONE_HUNDRED_AND_FIFTY)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(ONE_HUNDRED);
    const account2 = getBankAccount(ONE_HUNDRED);
    expect(() => account.transfer(ONE_HUNDRED_AND_FIFTY, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(ONE_HUNDRED);
    expect(() => account.transfer(ONE_HUNDRED_AND_FIFTY, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(ONE_HUNDRED);
    account.deposit(ONE_HUNDRED_AND_FIFTY);
    expect(account.getBalance()).toBe(ONE_HUNDRED + ONE_HUNDRED_AND_FIFTY);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(ONE_HUNDRED);
    account.withdraw(FIFTY);
    expect(account.getBalance()).toBe(ONE_HUNDRED - FIFTY);
  });

  test('should transfer money', () => {
    const account = getBankAccount(ONE_HUNDRED);
    const account2 = getBankAccount(ONE_HUNDRED);
    account.transfer(FIFTY, account2);
    expect(account.getBalance()).toBe(ONE_HUNDRED - FIFTY);
    expect(account2.getBalance()).toBe(ONE_HUNDRED + FIFTY);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(ONE_HUNDRED);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(ONE_HUNDRED);
    jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(ONE_HUNDRED_AND_FIFTY);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(ONE_HUNDRED_AND_FIFTY);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newBalance = null;
    const account = getBankAccount(ONE_HUNDRED);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

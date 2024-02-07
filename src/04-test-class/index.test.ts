import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import { TINY_VALUE, INITIAL_BALANCE, REDUNDANT_VALUE } from '../constants';

let account: BankAccount;
let account2: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    account = getBankAccount(INITIAL_BALANCE);
    account2 = getBankAccount(INITIAL_BALANCE);
  });
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(INITIAL_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(REDUNDANT_VALUE)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(REDUNDANT_VALUE, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(REDUNDANT_VALUE, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(INITIAL_BALANCE);
    account.deposit(REDUNDANT_VALUE);
    expect(account.getBalance()).toBe(INITIAL_BALANCE + REDUNDANT_VALUE);
  });

  test('should withdraw money', () => {
    account.withdraw(TINY_VALUE);
    expect(account.getBalance()).toBe(INITIAL_BALANCE - TINY_VALUE);
  });

  test('should transfer money', () => {
    account.transfer(TINY_VALUE, account2);
    expect(account.getBalance()).toBe(INITIAL_BALANCE - TINY_VALUE);
    expect(account2.getBalance()).toBe(INITIAL_BALANCE + TINY_VALUE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(INITIAL_BALANCE);
    const balance = await account.fetchBalance();
    expect(balance).toBe(INITIAL_BALANCE);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(REDUNDANT_VALUE);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(REDUNDANT_VALUE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newBalance = null;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

import { TIMER_SECOND, pathToFile } from '../constants';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  let timeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, TIMER_SECOND);

    expect(timeoutSpy).toHaveBeenCalledWith(callback, TIMER_SECOND);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, TIMER_SECOND);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(TIMER_SECOND);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  let intervalSpy: jest.SpyInstance;

  beforeEach(() => {
    intervalSpy = jest.spyOn(global, 'setInterval');
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, TIMER_SECOND);
    expect(intervalSpy).toBeCalledWith(callback, TIMER_SECOND);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, TIMER_SECOND);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(TIMER_SECOND);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(TIMER_SECOND);
    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(require('path'), 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toBeCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'This is the file content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(fileContent);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});

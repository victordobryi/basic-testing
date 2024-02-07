import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import { baseURL, postPath } from 'constants/index';
import { mockResponse } from '../../__mocks__/axios';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(postPath);
    expect(axiosSpy).toBeCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosSpy = jest.spyOn(axios, 'get');
    axiosSpy.mockResolvedValue({ data: [] });
    await throttledGetDataFromApi(postPath);
    expect(axiosSpy).toBeCalledWith(postPath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(postPath);
    expect(response).toBe(mockResponse);
  });
});

import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';
import { mockData, baseURL, postPath } from 'constants/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.spyOn(axios, 'create').mockImplementation(() => mockedAxios);
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.runAllTimers();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    mockedAxios.get.mockResolvedValue({});
    await throttledGetDataFromApi(postPath);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.get.mockResolvedValue({});
    throttledGetDataFromApi(postPath);
    jest.runAllTimers();
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should return response data', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const resultPromise = throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();
    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await resultPromise;

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });
});

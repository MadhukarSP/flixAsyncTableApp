import {renderHook} from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HttpClient, User} from '../services/HttpClient';
import {CACHE_KEY, useFetchUsers} from './FetchUsers.hooks';
import {act} from 'react-test-renderer';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../services/HttpClient');

describe('useFetchUsers', () => {
  const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
  const mockedHttpClient = HttpClient as jest.MockedClass<typeof HttpClient>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch users from API and update cache', async () => {
    const fetchedUsers: User[] = [
      {name: 'John', age: 30},
      {name: 'Jane', age: 25},
    ];

    (mockedHttpClient.fetchUsers as jest.Mock).mockResolvedValue(fetchedUsers);
    mockedAsyncStorage.getItem.mockResolvedValue(null);
    mockedAsyncStorage.setItem.mockResolvedValue(undefined);

    await act(async () => {
      const {result, waitForNextUpdate} = renderHook(() => useFetchUsers());

      expect(result.current).toBeUndefined();

      await waitForNextUpdate();

      const {loading, users} = result.current;

      expect(mockedHttpClient.fetchUsers).toHaveBeenCalled();
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(CACHE_KEY);
      expect(mockedAsyncStorage.setItem).toHaveBeenCalledTimes(1);

      // Assert on the final state after the update
      expect(loading).toBe(false);
      expect(users).toEqual(fetchedUsers);
    });
  });

  it('should use cached data if not expired', async () => {
    const cachedUsers: User[] = [
      {name: 'John', age: 30},
      {name: 'Jane', age: 25},
    ];
    const cachedData = {
      data: cachedUsers,
      timestamp: Date.now(),
    };

    (mockedHttpClient.fetchUsers as jest.Mock).mockResolvedValue([]);
    mockedAsyncStorage.getItem.mockResolvedValue(JSON.stringify(cachedData));
    mockedAsyncStorage.setItem.mockResolvedValue(undefined);

    await act(async () => {
      const {result, waitForNextUpdate} = renderHook(() => useFetchUsers());

      await waitForNextUpdate();

      expect(mockedHttpClient.fetchUsers).not.toHaveBeenCalled();
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(CACHE_KEY);
      expect(mockedAsyncStorage.setItem).not.toHaveBeenCalled();
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual(cachedUsers);
    });
  });

  it('should handle API fetch error', async () => {
    const errorMessage = 'Failed to fetch data';

    (mockedHttpClient.fetchUsers as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );
    mockedAsyncStorage.getItem.mockResolvedValue(null);
    mockedAsyncStorage.setItem.mockResolvedValue(undefined);

    const consoleLogSpy = jest.spyOn(console, 'log');

    await act(async () => {
      const {result, waitForNextUpdate} = renderHook(() => useFetchUsers());

      await waitForNextUpdate();

      expect(mockedHttpClient.fetchUsers).toHaveBeenCalled();
      expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(CACHE_KEY);
      expect(mockedAsyncStorage.setItem).not.toHaveBeenCalled();
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual([]);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Error while fetching or caching data:',
        expect.any(Error),
      );
    });
  });
});

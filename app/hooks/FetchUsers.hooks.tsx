import {useEffect, useState} from 'react';
import {HttpClient, User} from '../services/HttpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ERROR = 'Error';
export const CACHE_KEY = '@UserTableData';
const CACHE_EXPIRATION = 60 * 60 * 1000;

export function useFetchUsers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cachedData, setCachedData] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const cachedDataJSON = await AsyncStorage.getItem(CACHE_KEY);

      if (cachedDataJSON) {
        const cachedUsersData = JSON.parse(cachedDataJSON);
        const cacheExpiration = cachedUsersData.timestamp + CACHE_EXPIRATION;
        if (Date.now() < cacheExpiration) {
          setCachedData(cachedUsersData.data);
          return;
        }
      }

      const fetchedUsers = (await HttpClient.fetchUsers()) as User[];
      const newData = {data: fetchedUsers, timestamp: Date.now()};
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));

      setCachedData(fetchedUsers);
    } catch (e) {
      console.log('Error while fetching or caching data:', e);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchUsers();

    setLoading(false);
  }, []);

  return {users: cachedData, loading, fetchUsers};
}

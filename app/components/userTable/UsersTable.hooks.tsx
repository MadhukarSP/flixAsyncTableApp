import {useEffect, useState} from 'react';
import {User} from '../../services/HttpClient';

export function useSortedUsers({
  filteredUsers,
  sortBy,
  sortOrder,
}: {
  filteredUsers: User[];
  sortBy: keyof User | undefined;
  sortOrder: 'asc' | 'desc';
}) {
  if (sortBy) {
    const sortedArray = [...filteredUsers].sort((a: User, b: User) => {
      // @ts-ignore Object is possibly 'undefined', no idea why its still erroring out
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      // @ts-ignore Object is possibly 'undefined', no idea why its still erroring out
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });

    return sortOrder === 'asc' ? sortedArray : sortedArray.reverse();
  }
  return filteredUsers;
}

const DEBOUNCE_DELAY = 500;

export function useFilterUsersBySearchText({
  users,
  searchText,
}: {
  users: User[];
  searchText: string;
}) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const usersAfterFiltering = users.filter(user => {
        for (let column of Object.values(user)) {
          if (
            column.toString().toLowerCase().includes(searchText.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });

      setFilteredUsers(usersAfterFiltering);

      return () => {
        clearTimeout(debounceTimer);
      };
    }, DEBOUNCE_DELAY);
  }, [searchText, users]);

  return filteredUsers;
}

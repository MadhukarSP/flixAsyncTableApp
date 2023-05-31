import React, {useCallback, useState} from 'react';
import {User} from '../../services/HttpClient';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import Header from '../header/Header';
import RowItem from '../rowItems/RowItem';
import {useFilterUsersBySearchText, useSortedUsers} from './UsersTable.hooks';
import Footer from '../footer/Footer';

type Props = {
  users: User[];
};

export const ROW_PER_PAGE = 5;

export default function UsersTable({users}: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<keyof User | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ROW_PER_PAGE;
  const endIndex = startIndex + ROW_PER_PAGE;

  const filterUsersBySearchText = useFilterUsersBySearchText({
    users,
    searchText,
  });

  const sortedUsers = useSortedUsers({
    filteredUsers: filterUsersBySearchText,
    sortBy,
    sortOrder,
  });

  const onChangeSearchText = useCallback((text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  }, []);

  const triggerSortByColumn = useCallback(
    (columnName: keyof User) => {
      if (columnName === sortBy) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(columnName);
        setSortOrder('asc');
      }
    },
    [sortBy, sortOrder],
  );

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <View style={styles.userTableContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={onChangeSearchText}
        value={searchText}
      />
      <FlatList
        style={styles.userTable}
        data={paginatedUsers}
        keyExtractor={user => user.name}
        renderItem={({item}) => <RowItem item={item} />}
        ListHeaderComponent={
          <Header
            triggerSortByColumn={triggerSortByColumn}
            users={users}
            sortBy={sortBy}
          />
        }
      />
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortedUsers={sortedUsers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userTableContainer: {
    marginHorizontal: 10,
  },
  userTable: {
    borderWidth: 2,
    borderColor: '#eee',
    borderBottomWidth: 0,
    borderRadius: 4,
  },
  searchInput: {
    height: 42,
    marginVertical: 10,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
});

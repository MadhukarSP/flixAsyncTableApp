import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {User} from '../../services/HttpClient';
import {ROW_PER_PAGE} from '../userTable/UsersTable';

type Props = {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  sortedUsers: User[];
};

export default function Footer({
  currentPage,
  setCurrentPage,
  sortedUsers,
}: Props) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(sortedUsers.length / ROW_PER_PAGE);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * ROW_PER_PAGE;
  const endIndex = startIndex + ROW_PER_PAGE;

  return (
    <View style={styles.footer}>
      <Text style={styles.rowsDisplayedInfo} testID="rows-displayed">
        Rows Displayed: {startIndex + 1} -{' '}
        {Math.min(endIndex, sortedUsers.length)} of {sortedUsers.length}
      </Text>
      <TouchableOpacity onPress={handlePrevPage} testID="prev-button">
        <Text style={styles.paginationButton}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.pageInfo}>
        Page {currentPage} of {Math.ceil(sortedUsers.length / ROW_PER_PAGE)}
      </Text>
      <TouchableOpacity onPress={handleNextPage} testID="next-button">
        <Text style={styles.paginationButton}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowsDisplayedInfo: {
    marginTop: 5,
    fontSize: 16,
  },
  paginationButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
  },
});

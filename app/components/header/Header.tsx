import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {User} from '../../services/HttpClient';

type Props = {
  triggerSortByColumn: (columnName: keyof User) => void;
  users: User[];
  sortBy: string | undefined;
};
export default function Header({triggerSortByColumn, users, sortBy}: Props) {
  let columnNames: (keyof User)[] = [];
  if (users?.length) {
    columnNames = Object.keys(users[0]) as (keyof User)[];
  }
  return (
    <View style={styles.header}>
      {columnNames?.map(columnName => (
        <Text
          style={[
            styles.columnHeader,
            sortBy === columnName && styles.columnSorted,
          ]}
          onPress={() => triggerSortByColumn(columnName)}
          key={columnName}>
          {columnName}
        </Text>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  columnHeader: {
    flex: 1,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  columnSorted: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

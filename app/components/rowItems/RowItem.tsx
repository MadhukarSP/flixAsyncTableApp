import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {User} from '../../services/HttpClient';

type Props = {
  item: User;
};

export default function RowItem({item}: Props) {
  return (
    <View style={styles.row}>
      {[...Object.values(item)].map((element, key) => (
        <Text style={styles.cell} key={key}>
          {element}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    marginRight: 10,
  },
});

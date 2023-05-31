import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import UsersTable from './components/userTable/UsersTable';
import {useFetchUsers} from './hooks/FetchUsers.hooks';
import Button from './components/button/Button';

const App = () => {
  const {users, loading, fetchUsers} = useFetchUsers();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Refresh"
          onPress={() => fetchUsers()}
          disabled={loading}
        />
      </View>
      <View style={styles.tableContainer}>
        {loading ? <Text>Loading...</Text> : <UsersTable users={users} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
  },
  buttonContainer: {
    flex: 1,
  },
  tableContainer: {
    marginTop: 12,
    flex: 19,
  },
});

export default App;

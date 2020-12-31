import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Transaction } from '../components/Transaction';

import api from '../api/api';

const renderItem = ({item}) => {
  return <Transaction {...item} />;
};

const { height } = Dimensions.get('window');

const DashboardScreen = () => {
  const [ transactions, setTransactions ] = useState([]);
  const [ isLoading, setLoading ] = useState(false);

  // Normally I wouldn't do this here, but given time constraints...

  useLayoutEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      const data = await api.getTransactions();
      setTransactions(data);
      setLoading(false);
    };
    getTransactions();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.container}
            renderItem={renderItem}
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
          />
        )
      }
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 15,
  },
  container: {
    marginTop: 10,
    height: height - 40,
    width: '100%',
    justifyContent: 'flex-start',
  },
  icon: {
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    top: height / 2 - 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

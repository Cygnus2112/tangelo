import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { AUTH_CHECK } from '../actions/actions';

const { height } = Dimensions.get('window');

const src = require('../assets/icon-orange-24.png');

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: AUTH_CHECK, navigation});
    }, 2000);
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <Image source={src} style={{height: 55, width: 55}} resizeMode="contain" />
          <Text style={styles.logoText}>
            Tangelo
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: -100,
  },
  logoText: {
    fontSize: 46,
    marginLeft: 10,
  },
});

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { LOGOUT_REQUEST } from '../actions/actions';
import { Item } from '../components/AccountItem';

const items = [
  {
    title: 'Settings',
    icon: 'cog-outline',
    iconColor: 'blue',
  },
  {
    title: 'Notifications',
    icon: 'bell-outline',
    iconColor: 'orange',
  },
  {
    title: 'Privacy & Safety',
    icon: 'alert-rhombus-outline',
    iconColor: 'green',
  },
  {
    title: 'Support',
    icon: 'help-circle-outline',
    iconColor: 'red',
  },
  {
    title: 'Acknowledgements',
    icon: 'database',
    iconColor: 'teal',
  },
  {
    title: 'Logout',
    icon: 'logout',
    iconColor: 'teal',
  },
];

const AccountScreen = ({ navigation }) => {
  const {firstName, lastName} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: LOGOUT_REQUEST, navigation });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon size={150} name="account-circle" color="black" />
          <Text style={styles.header}>
            {`${firstName} ${lastName}`}
          </Text>
        </View>
        <View style={{flex: 1, width: '100%'}}>
          {items.map((item) => {
            return (
              <Item
                {...item}
                key={item.title}
                handlePress={item.title === 'Logout' ? logout : null}
              />
            )
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  icon: {
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

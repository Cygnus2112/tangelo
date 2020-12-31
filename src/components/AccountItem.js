import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Item = ({ title, icon, iconColor, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.item}>
        <View style={[styles.iconWrap, {paddingHorizontal: 15}]}>
          <Icon size={30} name={icon} color={iconColor} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20}}>
            { title }
          </Text>
        </View>
        <View style={styles.iconWrap}>
          <Icon size={30} name="chevron-right" color="grey" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

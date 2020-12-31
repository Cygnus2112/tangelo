import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const Transaction = ({ name, amount, date, imageUrl }) => {
  return (
    <View style={styles.item}>
      <View style={styles.avatar}>
        <Image source={{uri: imageUrl}} style={styles.avatar} />
      </View>
      <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', fontSize: 18}}>
          <Text style={{fontSize: 18}}>{ name }</Text>
          <Text style={{fontSize: 18}}>{ `$${amount} `}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 8, color: '#D3D3D3' }}>
          <Text style={{fontSize: 14}}>{ date }</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

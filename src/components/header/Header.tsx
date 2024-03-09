import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Header: React.FC<{title: string}> = ({title}) => {
  return (
    <View style={styles.headerView}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    padding: 20,
    backgroundColor: '#7d017d',
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: '#ffffff',
  },
});

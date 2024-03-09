import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ListItem: React.FC<{item: any}> = ({item}) => {
  const {symbol, quantity, ltp, avgPrice, close} = item;
  const currentValue = ltp * quantity;
  const investmentValue = avgPrice * quantity;
  const pAndLValue = currentValue - investmentValue;

  return (
    <View style={styles.root}>
      <View style={styles.rowView}>
        <Text style={styles.symbolText}>{symbol}</Text>
        <Text style={styles.plainText}>
          LTP:
          <Text style={styles.boldText}> ₹ {ltp}</Text>
        </Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.plainText}>{quantity}</Text>
        <Text style={styles.plainText}>
          P/L :<Text style={styles.boldText}> ₹ {pAndLValue.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {padding: 10, borderBottomWidth: 1.2, borderBottomColor: '#f2f2f2'},
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  plainText: {
    color: '#000000',
  },
  boldText: {
    color: '#000000',
    fontWeight: '700',
  },
});

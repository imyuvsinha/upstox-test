/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Header} from '../components/header/Header';
import {ListItem} from '../components/listitem/ListItem';
import BottomSheet from '../components/bottomsheet/BottomSheet';

const API_URL = 'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8';

interface Holding {
  symbol: string;
  quantity: number;
  ltp: number;
  avgPrice: number;
  close: number;
}

interface Item {
  title: string;
  value: string;
}

const Home: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [totalPNL, setTotalPNL] = useState<number>(0);
  const [todayPNL, setTodayPNL] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalCurrent, setTotalCurrentValue] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getHoldings();
  }, []);

  const getHoldings = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const response = await res.json();
      setHoldings(response?.userHolding);
      calculateProfitAndLoss(response?.userHolding);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openBottomSheet = () => {
    setShowBottomSheet(true);
  };

  const calculateProfitAndLoss = (values: Holding[]) => {
    const totalInvestmentValue = values.reduce(
      (acc, curr) => acc + curr.avgPrice * curr.quantity,
      0,
    );
    const totalCurrentValue = values.reduce(
      (acc, curr) => acc + curr.ltp * curr.quantity,
      0,
    );
    const todayPNLValue = values.reduce(
      (acc, curr) => acc + (curr.close - curr.ltp) * curr.quantity,
      0,
    );
    const totalPNLValue = totalCurrentValue - totalInvestmentValue;

    setTotalCurrentValue(totalCurrentValue);
    setTodayPNL(todayPNLValue);
    setTotalPNL(totalPNLValue);
    setTotalInvestment(totalInvestmentValue);
  };

  const renderBottomSheetContent = () => (
    <View>
      {items.map((itm, idx) => (
        <View
          key={idx}
          style={[
            styles.bottomSheetContent,
            {paddingVertical: idx === 3 ? 20 : 5},
          ]}>
          <Text style={styles.boldText}>{itm.title}</Text>
          <Text style={styles.boldText}>₹ {itm.value}</Text>
        </View>
      ))}
    </View>
  );

  const items: Item[] = [
    {title: 'Current Value:', value: totalCurrent.toFixed(2)},
    {title: 'Total Investment:', value: totalInvestment.toFixed(2)},
    {title: "Today's Profit & Loss:", value: todayPNL.toFixed(2)},
    {title: 'Profit & Loss:', value: totalPNL.toFixed(2)},
  ];

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={'#7d017d'} />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Header title="Upstox Holding" />
      <FlatList
        data={holdings}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={(item, idx) => idx.toString()}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
      <TouchableOpacity
        style={styles.bottomSheetButton}
        onPress={openBottomSheet}>
        <View style={styles.arrowIconContainer}>
          <Text style={styles.arrowIcon}>▲</Text>
        </View>
        <View style={styles.bottomSheetInfoContainer}>
          <Text style={styles.boldText}>Profit & Loss:</Text>
          <Text>₹ {totalPNL?.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      <BottomSheet
        isVisible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        children={renderBottomSheetContent()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetButton: {
    backgroundColor: 'white',
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#7d017d',
  },
  bottomSheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSheetInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 18,
  },
});

export default Home;

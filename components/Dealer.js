import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Hand from './Hand';

const Dealer = ({ dealerHand }) => {
  return (
    <View style={styles.dealer}>
      <Text>Dealer's Hand</Text>
      <Hand cards={dealerHand} />
    </View>
  );
};

const styles = StyleSheet.create({
  dealer: {
    marginBottom: 20,
  },
});

export default Dealer;

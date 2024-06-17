
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';

const Hand = ({ cards }) => {
  return (
    <View style={styles.hand}>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  hand: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default Hand;

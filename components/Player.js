import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Hand from './Hand';

const Player = ({ playerHand }) => {
  return (
    <View style={styles.player}>
      <Text>Player's Hand</Text>
      <Hand cards={playerHand} />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    marginBottom: 20,
  },
});

export default Player;

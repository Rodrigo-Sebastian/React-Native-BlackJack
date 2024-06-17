import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Player from './Player';
import Dealer from './Dealer';

const Game = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const startGame = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
  
    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({ suit, rank });
      }
    }
  
    shuffleDeck(deck);
  
    const playerInitialHand = [deck.pop(), deck.pop()];
    const dealerInitialHand = [deck.pop(), deck.pop()];
  
    setDeck(deck);
    setPlayerHand(playerInitialHand);
    setDealerHand(dealerInitialHand);
  };
  
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  };
  
  return (
    <View style={styles.container}>
      <Player playerHand={playerHand} />
      <Dealer dealerHand={dealerHand} />
      <Button title="Start Game" onPress={startGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF', 
    padding: 20,
  },
});

export default Game;

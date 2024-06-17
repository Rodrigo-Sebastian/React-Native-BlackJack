/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ card }) => {
  return (
    <View style={styles.card}>
      <Text>{card.rank}</Text>
      <Text>{card.suit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

export default Card;
*/

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import cards from './GameCards'; 

const Card = ({ card }) => {
  const cardId = `${card.rank.toLowerCase()}_of_${card.suit.toLowerCase()}`;
  const cardData = cards.find(c => c.id === cardId);

  if (!cardData) {
    console.warn(`Card data not found for id: ${cardId}`);
    return null; 
  }

  return (
    <View style={styles.card}>
      <Image source={cardData.image} style={styles.image} /> {/* Use cardData.image to display the image */}
      <View style={styles.cardDetails}>
        <Text style={styles.rank}>{card.rank}</Text>
        <Text style={styles.suit}>{card.suit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
  },
  cardDetails: {
    marginTop: 10,
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  suit: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Card;

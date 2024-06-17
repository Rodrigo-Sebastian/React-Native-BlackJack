import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Hand from '../components/Hand';
import cards from '../components/GameCards'; 
const GameScreen = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHandValue, setPlayerHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);
  const [gameState, setGameState] = useState('start'); 
  const [winner, setWinner] = useState(null);


  const startGame = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const newDeck = [];

    for (let suit of suits) {
      for (let rank of ranks) {
        newDeck.push({ suit, rank });
      }
    }

    shuffleDeck(newDeck);

    // Dela 2 cards till spelaren och 2 till dealern
    const playerInitialHand = [newDeck.pop(), newDeck.pop()];
    const dealerInitialHand = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(playerInitialHand);
    setDealerHand(dealerInitialHand);
    setGameState('playerTurn');
  };

  // Function för att shuffla däcken
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  // Function för att spelaren ska ta en till kort
  const playerHit = () => {
    const newDeck = [...deck];
    const newPlayerHand = [...playerHand, newDeck.pop()];
    setDeck(newDeck);
    setPlayerHand(newPlayerHand);

    // kolla om spelaren har överstigit 21an
    if (calculateHandValue(newPlayerHand) > 21) {
      endGame('dealer');
    }
  };

  // Funktion för att delarn ska ta en till kort
  const dealerHit = () => {
    const newDeck = [...deck];
    const newDealerHand = [...dealerHand, newDeck.pop()];
    setDeck(newDeck);
    setDealerHand(newDealerHand);

    // DB kolla om dealern ska ta en till kort
    if (calculateHandValue(newDealerHand) < 17) {
      dealerHit();
    } else {
      endGame();
    }
  };

  // Avslutat spel och visa vinnaren
  const endGame = (winner) => {
    setGameState('gameOver');
    if (winner === 'player') {
      setWinner('Player Wins!');
    } else if (winner === 'dealer') {
      setWinner('Dealer Wins!');
    } else {
      const playerValue = calculateHandValue(playerHand);
      const dealerValue = calculateHandValue(dealerHand);
      if (playerValue > 21 || (dealerValue <= 21 && dealerValue > playerValue)) {
        setWinner('Dealer Wins!');
      } else if (dealerValue > 21 || playerValue > dealerValue) {
        setWinner('Player Wins!');
      } else {
        setWinner('Push! It\'s a tie.');
      }
    }
  };

  // Funktion för att räkna totalt summan av kort
  const calculateHandValue = (hand) => {
    let total = 0;
    let aceCount = 0;

    for (let card of hand) {
      if (card.rank === 'A') {
        aceCount++;
      } else if (['J', 'Q', 'K'].includes(card.rank)) {
        total += 10;
      } else {
        total += parseInt(card.rank);
      }
    }

    for (let i = 0; i < aceCount; i++) {
      if (total + 11 > 21) {
        total += 1;
      } else {
        total += 11;
      }
    }

    return total;
  };

  //Uppdatera spelarens hand 
  useEffect(() => {
    setPlayerHandValue(calculateHandValue(playerHand));
  }, [playerHand]);

  // Uppdatera dealerns hand
  useEffect(() => {
    setDealerHandValue(calculateHandValue(dealerHand));
  }, [dealerHand]);

  // Starta om spelet
  const restartGame = () => {
    setGameState('start');
    setWinner(null);
  };

  return (
    <ImageBackground source={require('../assets/blackjack_table.jpg')} style={styles.container}>
      <Text style={styles.header}>Blackjack</Text>

      {gameState === 'start' && (
        <TouchableOpacity style={styles.button} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      )}

      {gameState === 'playerTurn' && (
        <View style={styles.gameArea}>
          <Text style={styles.statusText}>Your Hand: {playerHandValue}</Text>
          <Hand cards={playerHand} />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={playerHit}>
              <Text style={styles.buttonText}>Hit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setGameState('dealerTurn')}>
              <Text style={styles.buttonText}>Stand</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {gameState === 'dealerTurn' && (
        <View style={styles.gameArea}>
          <Text style={styles.statusText}>Dealer's Hand: {dealerHandValue}</Text>
          <Hand cards={dealerHand} />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={dealerHit}>
              <Text style={styles.buttonText}>Dealer's Turn</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {gameState === 'gameOver' && (
        <View style={styles.gameArea}>
          <Text style={styles.statusText}>Game Over</Text>
          <Text style={styles.resultText}>{winner}</Text>
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Restart Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover', 
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', 
  },
  gameArea: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  statusText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#fff', 
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', 
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#dc3545', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;

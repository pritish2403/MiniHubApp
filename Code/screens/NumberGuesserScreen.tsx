import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';

export default function NumberGuesserScreen() {
  const MAX_GUESSES = 10;

  const [target, setTarget] = useState(generateNumber());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [guessHistory, setGuessHistory] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);

  function generateNumber() {
    return Math.floor(Math.random() * 500) + 1;
  }

  function handleGuess() {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 500) {
      setFeedback('❗ Enter a number between 1 and 500');
      return;
    }

    Keyboard.dismiss();
    const newAttempts = attempts + 1;
    const updatedHistory = [...guessHistory, numGuess];

    setAttempts(newAttempts);
    setGuessHistory(updatedHistory);

    if (numGuess === target) {
      setFeedback('🎉 Correct Answer! *');
      setGameOver(true);
    } else if (numGuess < target) {
      setFeedback('📉 Too low');
    } else {
      setFeedback('📈 Too high end');
    }

    if (newAttempts >= MAX_GUESSES && numGuess !== target) {
      setFeedback(`❌ Game Over! The number was ${target} `);
      setGameOver(true);
    }

    setGuess('');
  }

  function restartGame() {
    setTarget(generateNumber());
    setGuess('');
    setFeedback('');
    setAttempts(0);
    setGuessHistory([]);
    setGameOver(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Number Guesser</Text>
      <Text style={styles.subtitle}>Guess a number between 1 and 500 end</Text>

      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        keyboardType="numeric"
        editable={!gameOver}
        placeholder="Enter your guess"
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        onPress={handleGuess}
        disabled={gameOver}
        style={[styles.button, gameOver && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Guess</Text>
      </TouchableOpacity>

      <Text style={styles.feedback}>{feedback}</Text>
      <Text style={styles.chances}>
        Attempts: {attempts} / {MAX_GUESSES} *
      </Text>

      {guessHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Your Guesses:</Text>
          <ScrollView style={styles.historyList}>
            {guessHistory.map((g, idx) => (
              <Text key={idx} style={styles.historyItem}>
                {idx + 1}. {g}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}

      {gameOver && (
        <TouchableOpacity onPress={restartGame} style={styles.restartButton}>
          <Text style={styles.restartText}>🔁 Restart Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  chances: {
    fontSize: 16,
    color: '#bbb',
  },
  historyContainer: {
    width: '100%',
    marginTop: 20,
    maxHeight: 150,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    padding: 10,
  },
  historyTitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  historyList: {
    paddingHorizontal: 4,
  },
  historyItem: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 3,
  },
  restartButton: {
    marginTop: 30,
    backgroundColor: '#00b894',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  restartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const WORD_LIST = [
  'apple', 'house', 'water', 'green', 'light', 'table', 'chair', 'happy', 'smile', 
  'dream', 'music', 'sweet', 'clock', 'grape', 'plant', 'brain', 'cloud', 'river', 
  'stone', 'sharp', 'brush', 'beach', 'camel', 'daisy', 'earth', 'fence', 'globe', 
  'honey', 'igloo', 'jolly', 'kites', 'lemon', 'mango', 'night', 'ocean', 'peace', 
  'queen', 'robot', 'stars', 'tiger', 'unity', 'vowel', 'whale', 'xerox', 'yacht', 
  'zebra', 'cabin', 'daisy', 'extra', 'frost'
];

const scrambleWord = (word: string): string => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
    .toUpperCase();
};

export default function WordUnscrambleScreen() {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pickNewWord = () => {
    const word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserGuess('');
    setMessage('');
    setTimer(30);
  };

  useEffect(() => {
    pickNewWord();
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setMessage(`⏰ Time's up! The word was "${currentWord.toUpperCase()}"`);
          return 30; // Reset after timeout
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [currentWord]);

  const checkGuess = () => {
    if (userGuess.trim().toLowerCase() === currentWord.toLowerCase()) {
      setMessage('✅ Correct!');
      setTimeout(pickNewWord, 1000);
    } else {
      setMessage('❌ Try again!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>🔤 Word Unscramble</Text>

      <Text style={styles.timer}>⏱️ {timer}s</Text>

      <View style={styles.card}>
        <Text style={styles.scrambled}>{scrambledWord}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Your Guess"
        placeholderTextColor="#888"
        value={userGuess}
        onChangeText={setUserGuess}
        onSubmitEditing={checkGuess}
      />

      <TouchableOpacity style={styles.button} onPress={checkGuess}>
        <Text style={styles.buttonText}>Checke</Text>
      </TouchableOpacity>

      {message !== '' && <Text style={styles.message}>{message}</Text>}

      <View style={styles.footer}>
        <TouchableOpacity onPress={pickNewWord}>
          <Text style={styles.next}>➡️ Next Word</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    padding: 24,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  timer: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
  },
  scrambled: {
    fontSize: 32,
    color: '#fff',
    letterSpacing: 4,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  next: {
    color: '#00bfff',
    fontSize: 16,
  },
});

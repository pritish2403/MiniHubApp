import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Problem = {
  question: string;
  answer: number;
};

const generateProblem = (): Problem => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const ops = ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let question = `${a} ${op} ${b}`;
  let answer = 0;
  switch (op) {
    case '+':
      answer = a + b;
      break;
    case '-':
      answer = a - b;
      break;
    case '×':
      answer = a * b;
      break;
    case '÷':
      question = `${a * b} ÷ ${b}`;
      answer = a;
      break;
  }

  return { question, answer };
};

export default function QuickMathScreen() {
  const [problem, setProblem] = useState<Problem>(generateProblem());
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const progress = useRef(new Animated.Value(1)).current;

  const nextProblem = () => {
    setProblem(generateProblem());
    setUserInput('');
    setMessage('');
    setTimer(5);
    progress.setValue(1);
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    nextProblem();
  };

  useEffect(() => {
    if (gameOver) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setMessage(`⏰ Time's up! Correct Answer: ${problem.answer}`);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(progress, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(countdown);
  }, [problem, gameOver]);

  const checkAnswer = () => {
    const numericInput = parseFloat(userInput.trim());
    if (numericInput === problem.answer) {
      setScore((prev) => prev + 1);
      setMessage('✅ Correct!');
      setTimeout(nextProblem, 1000);
    } else {
      setMessage(`❌ Wrong! Correct Answer: ${problem.answer}`);
      setGameOver(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>🧮 Quick Math</Text>

      {!gameOver && (
        <Animated.View
          style={[
            styles.timerBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      )}

      <Text style={styles.question}>{problem.question}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Answer"
        placeholderTextColor="#888"
        value={userInput}
        editable={!gameOver}
        onChangeText={setUserInput}
        onSubmitEditing={!gameOver ? checkAnswer : undefined}
      />

      {!gameOver ? (
        <TouchableOpacity style={styles.button} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Submite</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={resetGame}>
          <Text style={styles.buttonText}>🔁 Start Again e</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.message}>{message}</Text>
      <Text style={styles.score}>Score: {score}</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 24,
    paddingTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  timerBar: {
    height: 6,
    backgroundColor: '#007bff',
    borderRadius: 3,
    marginBottom: 30,
  },
  question: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  score: {
    color: '#0f0',
    fontSize: 16,
    textAlign: 'center',
  },
});

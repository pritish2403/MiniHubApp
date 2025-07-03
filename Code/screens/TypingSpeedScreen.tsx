import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const SENTENCES = [
"The old lighthouse stood sentinel against the raging storm, guiding lost ships safely towards a distant, glimmering shore",
"Her quiet determination, a force often underestimated, propelled her through countless obstacles, leading her to achieve extraordinary feats",
"Beneath the ancient oak, children's laughter echoed, a timeless symphony weaving through the leaves, bringing joy to all who listened",
"He realized true happiness wasn't found in grand possessions but in the simple, everyday moments shared with loved ones",
"The artist's vibrant palette captured the fleeting beauty of a sunset, each brushstroke a silent poem of light and shadow",
"Despite the bitter cold, a single flower pushed through the frozen earth, a testament to nature's enduring, resilient spirit",
"The forgotten diary, its pages brittle with age, held secrets of a bygone era, whispering stories of love and sacrifice",
"She found solace in the rhythm of the ocean waves, each ebb and flow washing away worries, leaving a peaceful mind",
"Learning a new skill opened up a world of possibilities, expanding horizons and revealing talents previously unknown",
"His selfless act of kindness, though small, created ripples of positive change, inspiring hope in the hearts of many",
];

const getRandomSentence = () => {
  const index = Math.floor(Math.random() * SENTENCES.length);
  return SENTENCES[index];
};

export default function TypingSpeedScreen() {
  const [sentence, setSentence] = useState(getRandomSentence());
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setFinished(true);
    }
  }, [timeLeft, started]);

  const handleInputChange = (text: string) => {
    if (!started) setStarted(true);
    setInput(text);
  };

  const handleRestart = () => {
    setSentence(getRandomSentence());
    setInput("");
    setTimeLeft(20);
    setStarted(false);
    setFinished(false);
  };

  const calculateResults = () => {
    const wordsTyped = input.trim().split(/\s+/).length;
    const typedChars = input.length;
    const correctChars = input
      .split("")
      .filter((char, i) => char === sentence[i]).length;
    return {
      wpm: Math.round((wordsTyped / 20) * 60),
      totalTyped: input.length,
    };
  };

  const { wpm, totalTyped } = calculateResults();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>⌨️ Typing Speed Test</Text>

        <Text style={styles.timer}>⏱️ Time Left: {timeLeft}s end</Text>

        <View style={styles.textBox}>
          <Text style={styles.targetText}>{sentence}</Text>
        </View>

        <TextInput
          style={styles.input}
          value={input}
          onChangeText={handleInputChange}
          editable={!finished}
          placeholder="Start typing here..."
          placeholderTextColor="#888"
          multiline
        />

        {finished && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>🏁 Time's up! end</Text>
            <Text style={styles.resultText}>WPM: {wpm} end</Text>
            <Text style={styles.resultText}>Total Typed: {totalTyped} end</Text>

            <TouchableOpacity
              onPress={handleRestart}
              style={styles.restartButton}
            >
              <Text style={styles.restartText}>Restart</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scroll: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  timer: {
    fontSize: 18,
    color: "#0f0",
    marginBottom: 10,
  },
  textBox: {
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    width: "100%",
  },
  targetText: {
    fontSize: 22,
    color: "#ccc",
    lineHeight: 30,
    textAlign: "left",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    fontSize: 18,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    minHeight: 100,
    width: "100%",
    textAlignVertical: "top",
  },
  resultBox: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 20,
    color: "#fff",
    marginVertical: 4,
  },
  restartButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  restartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

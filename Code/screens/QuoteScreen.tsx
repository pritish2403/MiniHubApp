import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function QuoteScreen() {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (err) {
      setError('Failed to load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (quote) {
      await Clipboard.setStringAsync(`"${quote}" — ${author}`);
      Alert.alert('Copied', 'Quote copied to clipboard');
    }
  };

  const shareQuote = async () => {
    if (quote) {
      try {
        await Share.share({
          message: `"${quote}" — ${author}`,
        });
      } catch (error) {
        Alert.alert('Error', 'Could not share quote.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inspire Me ✨</Text>

      <View style={styles.quoteBox}>
        {loading ? (
          <ActivityIndicator size="large" color="#333" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : quote ? (
          <>
            <Text style={styles.quoteText}>{quote}</Text>
            <Text style={styles.authorText}>— {author}</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>Press the button to get a quote!</Text>
        )}
      </View>

      <View style={styles.buttonGroup}>
        <Button title="New Quote" onPress={fetchQuote} />
        {quote && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={copyToClipboard} style={styles.actionButton}>
              <Text style={styles.actionText}>📋 Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareQuote} style={styles.actionButton}>
              <Text style={styles.actionText}>📤 Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#d1ab11',
  },
  quoteBox: {
    backgroundColor: '#fefefe',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minHeight: 120,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#444',
  },
  authorText: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 10,
    color: '#666',
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaa',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  buttonGroup: {
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionText: {
    fontWeight: '500',
    color: '#333',
  },
});

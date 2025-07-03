import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function HeightConverterScreen() {
  const [mode, setMode] = useState<'ft-to-cm' | 'cm-to-ft'>('ft-to-cm');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');
  const [result, setResult] = useState('');

  const convertToCM = () => {
    const f = parseFloat(feet) || 0;
    const i = parseFloat(inches) || 0;
    const totalCM = (f * 12 + i) * 2.54;
    setResult(`${totalCM.toFixed(2)} cm`);
  };

  const convertToFeetInches = () => {
    const totalInches = (parseFloat(cm) || 0) / 2.54;
    const feetPart = Math.floor(totalInches / 12);
    const inchesPart = totalInches % 12;
    setResult(`${feetPart} ft ${inchesPart.toFixed(1)} in`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            mode === 'ft-to-cm' && styles.activeToggle,
          ]}
          onPress={() => setMode('ft-to-cm')}
        >
          <Text style={styles.toggleText}>Feet → CM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            mode === 'cm-to-ft' && styles.activeToggle,
          ]}
          onPress={() => setMode('cm-to-ft')}
        >
          <Text style={styles.toggleText}>CM → Feet</Text>
        </TouchableOpacity>
      </View>

      {mode === 'ft-to-cm' ? (
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Feet"
            placeholderTextColor="#888"
            value={feet}
            onChangeText={setFeet}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Inches"
            placeholderTextColor="#888"
            value={inches}
            onChangeText={setInches}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Convert to CM" onPress={convertToCM} />
        </View>
      ) : (
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Centimeters"
            placeholderTextColor="#888"
            value={cm}
            onChangeText={setCm}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Convert to Feet/Inch" onPress={convertToFeetInches} />
        </View>
      )}

      {result !== '' && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#007bff',
  },
  toggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputGroup: {
    gap: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
  },
  result: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

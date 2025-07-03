import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function BMIScreen() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [idealRange, setIdealRange] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      setError('Please enter valid height and weight');
      setBMI(null);
      setCategory('');
      setIdealRange('');
      return;
    }

    const hMeters = h / 100;
    const bmiValue = w / (hMeters * hMeters);
    setBMI(bmiValue);
    setError('');

    if (bmiValue < 18.5) setCategory('Underweight 😟');
    else if (bmiValue < 25) setCategory('Normal 😊');
    else if (bmiValue < 30) setCategory('Overweight 😐');
    else setCategory('Obese 😟');

    const minWeight = (18.5 * hMeters * hMeters).toFixed(1);
    const maxWeight = (24.9 * hMeters * hMeters).toFixed(1);
    setIdealRange(`${minWeight} kg – ${maxWeight} kg`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Height"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <Text style={styles.unit}>cm</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Weight"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Text style={styles.unit}>kg</Text>
      </View>

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {bmi !== null && (
        <>
          <Text style={styles.resultText}>
            Your BMI is {bmi.toFixed(2)} — {category}
          </Text>
          <Text style={styles.idealText}>
            Ideal weight range: {idealRange}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, textAlign: 'center' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  unit: {
    color: '#aaa',
    fontSize: 16,
    width: 40,
    textAlign: 'center',
  },
  resultText: { fontSize: 18, color: '#fff', marginTop: 20, textAlign: 'center' },
  idealText: { fontSize: 16, color: '#aaa', marginTop: 10, textAlign: 'center' },
  errorText: { color: '#f44336', marginTop: 10, textAlign: 'center' },
});

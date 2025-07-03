import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Expense {
  id: string;
  label: string;
  amount: number;
}

export default function BudgetTrackerScreen() {
  const [income, setIncome] = useState<string>('');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  const addExpense = () => {
    if (!label || !amount) {
      Alert.alert('Error', 'Please enter both label and amount.');
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Enter a valid number greater than 0.');
      return;
    }
    const newExpense: Expense = {
      id: Date.now().toString(),
      label,
      amount: numericAmount,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setLabel('');
    setAmount('');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const remaining = parseFloat(income || '0') - totalExpenses;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.header}>💰 Budget Tracker</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Total Income (₹)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={income}
          onChangeText={setIncome}
          placeholder="e.g. 50000"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputFlex]}
          placeholder="Expense Label"
          placeholderTextColor="#888"
          value={label}
          onChangeText={setLabel}
        />
        <TextInput
          style={[styles.input, styles.inputFlex]}
          placeholder="Amount (₹)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Expenses: ₹{totalExpenses.toFixed(2)}</Text>
        <Text style={styles.summaryText}>
          Remaining: ₹{remaining.toFixed(2)}
        </Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseLabel}>{item.label}</Text>
            <View style={styles.amountGroup}>
              <Text style={styles.expenseAmount}>₹{item.amount.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => deleteExpense(item.id)}>
                <Text style={styles.deleteText}>✖</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No expenses yet.</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#aaa',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  inputFlex: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 80,
  },
  expenseItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseLabel: {
    color: '#fff',
    fontSize: 16,
  },
  amountGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expenseAmount: {
    color: '#f44336',
    fontSize: 16,
  },
  deleteText: {
    color: '#f44336',
    fontSize: 18,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

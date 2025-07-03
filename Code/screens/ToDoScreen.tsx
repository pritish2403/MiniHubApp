import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function ToDoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem('tasks');
    if (data) setTasks(JSON.parse(data));
  };

  const saveTasks = async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // Keep completed tasks at bottom
    const sorted = [...updated].sort((a, b) => Number(a.completed) - Number(b.completed));
    setTasks(sorted);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const renderItem = ({ item, drag, isActive }: any) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.task,
          { backgroundColor: isActive ? '#333' : '#1f1f1f' },
        ]}
      >
        <TouchableOpacity onPress={() => toggleTask(item.id)} style={{ flex: 1 }}>
          <Text style={[styles.taskText, item.completed && styles.completed]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#ff5252" />
        </TouchableOpacity>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Add a new task"
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <DraggableFlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setTasks(data)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 8,
  },
  task: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

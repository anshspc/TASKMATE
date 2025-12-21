import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './components/TaskItem';
import { colors } from './styles/globalStyles';

export default function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low'); // 'Low', 'Medium', 'High'
  const [timing, setTiming] = useState('None'); // 'None', '30m', '1h', '3h', 'Today'
  const [taskItems, setTaskItems] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for a live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load data on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('items');
        if (jsonValue != null) {
          setTaskItems(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  // Save data on change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonValue = JSON.stringify(taskItems);
        await AsyncStorage.setItem('items', jsonValue);
      } catch (e) {
        console.error("Failed to save tasks", e);
      }
    };
    saveTasks();
  }, [taskItems]);

  const handleAddTask = () => {
    if (!task) return;
    const newTask = {
      text: task,
      completed: false,
      priority: priority,
      timing: timing,
      createdAt: new Date().toISOString(),
    };
    setTaskItems([...taskItems, newTask]);
    setTask('');
    setPriority('Low'); // Reset priority
    setTiming('None'); // Reset timing
    Keyboard.dismiss();
  };

  const togglePrioritySelection = () => {
    if (priority === 'Low') setPriority('Medium');
    else if (priority === 'Medium') setPriority('High');
    else setPriority('Low');
  };

  const toggleTimingSelection = () => {
    if (timing === 'None') setTiming('30m');
    else if (timing === '30m') setTiming('1h');
    else if (timing === '1h') setTiming('3h');
    else if (timing === '3h') setTiming('Today');
    else setTiming('None');
  };

  const completeTask = (index) => {
    let itemsCopy = taskItems.filter((item, i) => i !== index);
    setTaskItems(itemsCopy);
  };

  const toggleTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemsWrapper}>
        {/* Header with Live Clock */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.dateText}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Text>
            <Text style={styles.title}>TaskMate</Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </Text>
          </View>
        </View>

        <FlatList
          data={taskItems}
          renderItem={({ item, index }) => (
            <TaskItem
              text={item.text}
              isCompleted={item.completed}
              priority={item.priority}
              createdAt={item.createdAt}
              timing={item.timing}
              onDelete={() => completeTask(index)}
              onToggle={() => toggleTask(index)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No tasks yet? Add one to get started!</Text>
            </View>
          )}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={togglePrioritySelection} style={styles.selectorButton}>
            <View style={[styles.prioritySelector,
            priority === 'Low' ? styles.low :
              priority === 'Medium' ? styles.medium : styles.high
            ]} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleTimingSelection} style={styles.timingSelector}>
            <Text style={styles.timingSelectorText}>⏱️ {timing}</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder={'Write a task'}
            value={task}
            onChangeText={text => setTask(text)}
          />

          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeBadge: {
    backgroundColor: '#F0ECF9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  selectorButton: {
    marginRight: 10,
  },
  prioritySelector: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderColor,
  },
  low: { backgroundColor: '#55BCF6' },
  medium: { backgroundColor: '#FFC069' },
  high: { backgroundColor: '#FF8A8A' },
  timingSelector: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timingSelectorText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginRight: 10,
    fontSize: 15,
    color: colors.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  addWrapper: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

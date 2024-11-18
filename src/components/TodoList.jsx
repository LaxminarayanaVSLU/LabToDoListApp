import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import TodoItem from './TodoItem';
import styles from '../assets/styles/todoItem';
import ModalAlert from './ModalAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList() {
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Doctor Appointment', completed: true},
    {id: 2, text: 'Meeting at School', completed: false},
  ]);

  const [text, setText] = useState('');
  const [modal, setModal] = useState(false);


  // Save tasks to AsyncStorage
  const saveTasksToStorage = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks to storage', e);
    }
  };

  // Load tasks from AsyncStorage
  const loadTasksFromStorage = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {
      console.error('Error loading tasks from storage', e);
    }
  };

   // Load tasks on app start
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);


  const animations = useRef({}).current;

  // Initialize animations for tasks
  useEffect(() => {
    tasks.forEach((task) => {
      if (!animations[task.id]) {
        animations[task.id] = new Animated.Value(0);
      }
    });
  }, [tasks]);

  // Animate a task when it's added
  const animateTaskAdd = (id) => {
    Animated.timing(animations[id], {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Animate a task when it's deleted
  const animateTaskDelete = (id, callback) => {
    Animated.timing(animations[id], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      callback();
    });
  };

  // Add a task
  function addTask() {
    const newTask = {id: Date.now(), text, completed: false};
    setTasks([...tasks, newTask]);
    setText('');

    setTimeout(() => animateTaskAdd(newTask.id), 0); // Animate after rendering
  }

  // Delete a task
  function deleteTask(id) {
    animateTaskDelete(id, () => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  // Toggle task completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  }

  // Update a task
  function updateTask(id, text) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, text} : task,
      ),
    );
    toggleModal();
  }

  function toggleModal() {
    setModal(true);
  }

  function toggleModalOff() {
    setModal(false);
  }

  // Render TodoList Component
  return (
    <>
      <ModalAlert showModal={modal} behavior={toggleModalOff} />
      <View>
        <FlatList
          bounces={true}
          data={tasks}
          renderItem={({item}) => (
            <Animated.View
              style={{
                transform: [
                  {
                    scale: animations[item.id] || 1,
                  },
                ],
                opacity: animations[item.id] || 1,
              }}>
              <TodoItem
                key={item.id}
                task={item}
                deleteTask={() => deleteTask(item.id)}
                toggleCompleted={() => toggleCompleted(item.id)}
                updateTask={(text) => updateTask(item.id, text)}
              />
            </Animated.View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{height: 20}}></View>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          style={{textAlign: 'center'}}
        />
        <View style={styles.todoItem}>
          <Pressable style={styles.addButton} onPress={addTask}>
            <Text style={{color: '#fff'}}>Add</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

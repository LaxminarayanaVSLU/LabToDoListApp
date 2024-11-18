import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, Pressable, Text} from 'react-native';
import TodoItem from './TodoItem';
import styles from '../assets/styles/todoItem';
import ModalAlert from './ModalAlert';

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([
    {id: 1, text: 'Doctor Appointment', completed: true},
    {id: 2, text: 'Meeting at School', completed: false},
  ]);

  const [text, setText] = useState('');
  const [modal, setModal] = useState(false);
  // Function to Add Task

  function addTask() {
    const newTask = {id: Date.now(), text, completed: false};
    setTasks([...tasks, newTask]);
    setText('');
  }

  function markAllAsCompleted() {
    setTasks(
      tasks.map(task => ({id: task.id, text: task.text, completed:true})),
    )
  }

  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  }

  function toggleModal(){
    setModal(true);
  }

  function toggleModalOff(){
    setModal(false);
  }

  function updateTask(id, text) {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, text: text} : task,
      ),
    );
    toggleModal();
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
          <TodoItem
            key={item.id}
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateTask={updateTask}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={{height: 20}}></View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="New Task"
        style={{textAlign: 'center'}}
      />

      <View style={styles.todoItem}>
        <Pressable style={styles.addButton} onPress={markAllAsCompleted}>
          <Text style={{color: '#fff'}}>Mark All Complete</Text>
        </Pressable>
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={{color: '#fff'}}>Add</Text>
        </Pressable>
      </View>
    </View>
    </>
  );
}

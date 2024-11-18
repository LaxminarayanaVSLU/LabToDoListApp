import React from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  TouchableHighlight,
  Switch,
} from 'react-native';
import styles from '../assets/styles/todoItem';

const TodoItem = ({task, deleteTask, toggleCompleted, updateTask}) => {
  const [text, setText] = React.useState(task.text);

  const getStyles = () => {
    let style = styles.todoItemText;
    if (task.completed) {
      return {...styles.todoItemText, ...styles.completed};
    }
    return style;
  };

  const setTextUpdated = changedText => {
    setText(changedText);
  };

  return (
    <View style={styles.todoItem}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={task.completed ? '#3570ff' : '#767577'}
        ios_backgroundColor="#3e3e3e"
        onChange={() => toggleCompleted(task.id)}
        value={task.completed}
      />
      {task.completed ? 
            <Text style={getStyles()}>{text}</Text> : 
            <TextInput onChangeText={setTextUpdated} value={text} maxLength={40} />
      }
      
      <View>
      {task.completed ? "" : <Pressable
        style={styles.addButton}
        onPress={() => updateTask(task.id, text)}>
        <Text style={{color: '#fff'}}>Save</Text>
      </Pressable>
      }
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}>
        <Text style={{color: '#fff'}}>Delete</Text>
      </Pressable>
      </View>
    </View>
  );
};

export default TodoItem;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row', // Flexbox with row direction (default in React Native)
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  todoItemText: {
    flex: 1, // Allow the text to take up remaining space
    marginRight: 8,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through', // React Native uses textDecorationLine instead of text-decoration
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#ff6347', // Tomato color
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 0,
    borderRadius: 4,
    alignItems: 'center', // Ensure text is centered if it's in a button-like element
    justifyContent: 'center', // Center content horizontally
  },
  addButton: {
    backgroundColor: '#81b0ff', // Tomato color
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 0,
    borderRadius: 4,
    alignItems: 'center', // Ensure text is centered if it's in a button-like element
    justifyContent: 'center', // Center content horizontally
  },
});

export default styles;

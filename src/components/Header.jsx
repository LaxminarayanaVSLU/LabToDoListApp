// Header.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 120,
    backgroundColor: '#81b0ff',
    justifyContent: 'flex-end',  // Aligns content at the bottom
    alignItems: 'center',         // Center the text horizontally
    elevation: 4,                 // Add shadow for Android
  },
  headerContent: {
    flexDirection: 'row',       // Align logo and title horizontally (side-by-side)
    alignItems: 'flex-end',     // Align the logo and text at the bottom
    paddingBottom: 10,          // Adds padding at the bottom for some space
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,  // Adjust width as needed
    height: 30, // Adjust height as needed
    marginRight: 5, // Space between logo and title
  }
});

export default Header;

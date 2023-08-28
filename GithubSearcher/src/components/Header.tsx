import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = () => {
  return (
    <View style={styles.header}>
        <Text style={styles.headerText} >My Awesome App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor : "gray"
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',

  },
});

export default Header;

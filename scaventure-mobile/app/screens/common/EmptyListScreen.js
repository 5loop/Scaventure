import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const EmptyListScreen = ({ title, description, icon = 'x' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nestedComponent}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.nestedComponent}>
        <Text style={styles.description}>{description}</Text>
        <Feather name={icon} size={45} color={Colors.grey} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
  },
  nestedComponent: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.grey,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    color: Colors.grey,
  },
});

export default EmptyListScreen;

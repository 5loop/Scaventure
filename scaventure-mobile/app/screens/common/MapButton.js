import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const MapButton = ({ text, onPress }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight style={styles.mapButton} onPress={onPress}>
        <Feather name="map-pin" size={32} color={Colors.darkSecondary} />
      </TouchableHighlight>
      <Text style={styles.mapTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.lightSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapTitle: {
    color: Colors.darkSecondary,
    maxWidth: 80,
    flex: 1, 
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});

export default MapButton;

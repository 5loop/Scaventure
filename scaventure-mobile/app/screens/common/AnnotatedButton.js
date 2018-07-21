import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../../constants/colors';

const AnnotatedButton = ({ buttonText, onPress, icon = 'plus', color = Colors.primaryColor, layout = 'right' }) => {
  return (
    <View style={layout === 'right' ? styles.buttonGroup : styles.buttonGroupLeft} >
      <View style={styles.nestedButtons}>
        { layout === 'right' &&
          <View style={[layout === 'right' ? styles.buttonTextContainer : styles.buttonTextContainerLeft, { backgroundColor: color }]}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        }
        <TouchableHighlight style={[styles.plusButton, { backgroundColor: color }]} onPress={onPress}>
          <Feather name={icon} color={Colors.white} size={27} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    height: 55,
    width: 55,
    backgroundColor: Colors.primaryColor,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nestedButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonGroup: {
    position: 'absolute',
    marginRight: 20,
    borderRadius: 55,
    marginBottom: 10,
    bottom: 0,
    right: 0,
  },
  buttonGroupLeft: {
    position: 'absolute',
    marginLeft: 20,
    borderRadius: 55,
    marginBottom: 10,
    bottom: 0,
    left: 0,
  },
  buttonTextContainer: {
    marginBottom: 25,
    marginRight: 8,
    height: 45,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
  },
  buttonTextContainerLeft: {
    marginBottom: 25,
    marginLeft: 8,
    height: 45,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // Border stuff
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
  },
  buttonText: {
    color: Colors.white,
  },
});

export default AnnotatedButton;

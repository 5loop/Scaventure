import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

/** -- Local Imports */
import Colors from '../../constants/colors';

export default class QRStep extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.h1}>{ this.props.step.description }</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
});

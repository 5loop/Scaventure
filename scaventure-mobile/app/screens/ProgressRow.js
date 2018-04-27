import React from 'react';
import { Text, View, ListView, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242542',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  
  label: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Arial',
    color: 'white'
  }, 
  doneButton: {
    borderRadius: 5,
    backgroundColor: '#EAEAEA',
    padding: 5,
  },
});

class ProgressRow extends React.Component {
  render() {
    return ( 
      <View style={styles.container}>
        <Text style={styles.label}> Quest: {this.props.progress.title} </Text>
        <Text style={styles.label}> Points: {this.props.progress.pointsEarned} </Text>
        <Text style={styles.label}> Time: {this.props.progress.timeTaken} seconds</Text>
      </View>
    );
  }
}

export default ProgressRow;

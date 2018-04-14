import React from 'react';
import { Text, View, ListView, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
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
        <Text style={styles.label}> 
          Quest: {this.props.progress.title} | 
          Points: {this.props.progress.pointsEarned} | 
          Time: {this.props.progress.timeTaken} seconds
        </Text>
      </View>
    );
  }
}

export default ProgressRow;

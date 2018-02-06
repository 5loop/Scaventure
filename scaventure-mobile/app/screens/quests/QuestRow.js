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
    marginRight: 20
  },
  label: {
    fontSize: 20,
    fontWeight: '300'
  }, 
  doneButton: {
    borderRadius: 5,
    backgroundColor: '#EAEAEA',
    padding: 5,
  }
});



class QuestRow extends React.Component {
  
  render() {
    console.log(this.props.quest);
    return( 
      <View style={styles.container}>
        <Text style={styles.label}> {this.props.quest.title}</Text>
      </View>
    );
  }
}

export default QuestRow;

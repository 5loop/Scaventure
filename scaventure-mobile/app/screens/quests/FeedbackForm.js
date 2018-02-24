import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
// import { Sae } from 'react-native-textinput-effects';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,                           
    backgroundColor: Colors.white,          
    padding: 18,
  },
  button: {
    height: 38,
    borderRadius: 18,
    backgroundColor: Colors.tertiaryColor,
    margin: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
  },
});

class FeedbackForm extends React.Component {
 
  // TODO ctor with state
  render() {
    return ( 
      <View style={styles.container}>
        <TextField
          label='Title'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
        />
        <TextField
          label='Description'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          multiline
        />
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={()=> console.log('Adding New')}>Add New</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default FeedbackForm;

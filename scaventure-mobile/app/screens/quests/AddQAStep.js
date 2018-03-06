import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableHighlight } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from '../../constants/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box'
import { Container, Content, List, ListItem, Radio } from 'native-base';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';



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

  inputStyle: {
    fontSize: 20,
    width: '90%',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor:'#C0C0C0',
  },

  inputLable: {
    fontSize: 20,
    fontWeight: '300',
  },
  textIpt: {
    marginLeft: 7.5,
    fontSize: 12,
    height: 25,
    width: 185,
    
    
    
  },


  

});



class AddQAStep extends React.Component {
  onSelect(index, value){
    this.setState({
      
    })
  }

  onPress(){
  
      const data = {
        question: this.state.question,
        
        options: {
          type: "Point",
          coordinates: [this.state.option1, this.state.option2, this.state.option3],
          answer: this.state.TextInput,
        }
      }
      
      

}

  render() {    
    return ( 
      <View style={styles.container}>
          <View>
          <TextField
          label='Question'
          baseColor={Colors.secondaryColor}
          tintColor={Colors.primaryColor}
          onChangeText={(question)=> this.setState({question})}
        />
        <RadioGroup
        onSelect = {(index, value) => this.onSelect(index, value)}>
        <RadioButton value={'item1'} >
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 1'
            onChangeText={(option1) => this.setState({ option1 })}
          />
        </RadioButton>
 
        <RadioButton value={'item2'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 2'
            onChangeText={(option2) => this.setState({ option2 })}
          />
        </RadioButton>
 
        <RadioButton value={'item3'}>
        <TextInput
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Option 3'
            onChangeText={(option3) => this.setState({ option3 })}
          />
        </RadioButton>
      </RadioGroup>

      <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={this.onPress.bind(this)}>Add New</Text>
        </TouchableHighlight>
      
      </View> 
      </View>
    );
  }
}

export default AddQAStep;

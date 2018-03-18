import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import Colors from '../../constants/colors';
 
import {
    Alert,
    Text,
    Button,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
export default class QRsteps extends Component {
  state = {
    text: 'default_text',
  };

  btnPressed = () => {
    console.log("button pressed.");
    const text = this.state.text;
    if (text === '') {
      Alert.alert('Alert', 'Your answer cannot be empty.');
    } else {
      // Alert.alert('Alert', text);
      // implement add qr step
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text>Enter your answer: </Text>
        <TextInput
          style={styles.input}
          placeholder="Type something here..."
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='purple'
          fgColor='white'
        />
        <Button
          title="Confirm"
          color={Colors.primaryColor}
          onPress={this.btnPressed.bind(this)}
        />
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
});
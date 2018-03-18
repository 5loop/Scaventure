import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import Colors from '../../constants/colors';
import { TextField } from 'react-native-material-textfield';

import {
  Alert,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { addStep } from '../../actions/questActions';
 
class QRsteps extends Component {
  state = {
    text: 'default_text',
  };

  btnPressed = () => {
    const { quest } = this.props.navigation.state.params;
    const { text, description } = this.state;
    
    if (!text || (text && text.trim() === '')) {
      Alert.alert('Alert', 'Your answer cannot be empty.');
    } else if (!description || (description && description.trim() === '')) {
      Alert.alert('Alert', 'Description cannot be empty.');
    } else {
      const startLocation = {       
        type: 'Point', 
        coordinates: [42, 42],
      };

      const data = {
        description,
        startLocation,
        stepLocation: startLocation,
        points: 10,
        stepNumber: 0,
        qrCode: text,
      };

      this.props.addStep('qr', quest._id, data).then(() => {
        this.props.navigation.goBack();
      });
    }
  }
 
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextField
            label='Description'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(description) => this.setState({ description })}
            multiline
            characterRestriction={300}
            maxLength={300}
            style={{ width: 400 }}
          />
          <TextField
            label='Answer'
            baseColor={Colors.secondaryColor}
            tintColor={Colors.primaryColor}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            characterRestriction={100}
            maxLength={100}
          />
          <View style={styles.qrStyle}> 
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
  },
  qrStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addStep }, dispatch);
}

export default connect(null, mapDispatchToProps)(QRsteps);

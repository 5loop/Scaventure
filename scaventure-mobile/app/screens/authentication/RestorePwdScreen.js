// reset pwd
import React from 'react';
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';  

import {
  Text, TextInput, View, StyleSheet, ActivityIndicator, Keyboard,
  Image, ImageBackground, TouchableOpacity, Alert, TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import * as sessionActions from '../../actions/sessionActions';

const renderIf = require('render-if');
const Device = require('react-native-device-detection');

class RestorePwdScreen extends React.Component {
  static navigationOptions = {
    title: 'RestorePwd',
    header: null,
  };
  constructor() {
    super();
    this.state = {
      textStatus: true,
      fieldsStatus: false,
      myText: 'Send Code',
    };
  }
  stackNav = () => {
    this.props.navigation.goBack(null);
  }
  btnPressed = () => {
    const email = this.state.email;
    const emailREGEX = /\S+@\S+\.\S+/;

    if (this.state.myText === 'Send Code') {
      if (emailREGEX.test(String(email).toLowerCase()) === false) {
        Alert.alert('Alert', 'Email is not valid.');
      } else {
        // TODO - implement send code
        this.props.actions.sendCode(
          { email: this.state.email.toLowerCase() }
        ).then(() => {
          Alert.alert('Alert', 'Confirmation code sent. Please check your email inbox.');
          this.setState({ fieldsStatus: true, myText: 'Confirm' });
        }).catch((e) => {
          console.log(e);
          Alert.alert('Error', 'Failed to send code!');
        });
      }
    } else if (this.state.myText === 'Confirm') {
      // Validate input, set error & return if not valid
      const code = this.state.code;
      const passwd = this.state.password;
      
      if (emailREGEX.test(String(email).toLowerCase()) === false) {
        Alert.alert('Alert', 'Email is not valid.');
      } else if (!code || code.length !== 6) {
        Alert.alert('Alert', 'Code is not correct.');
      } else if (!passwd || passwd.length < 6) {
        Alert.alert('Alert', 'Password must have at least 6 characters/numbers.');
      } else {
        // Set Loader (some status indicating that HTTP call is in progress)
        this.setState({ textStatus: false });
        // implement change password
        this.props.actions.resetPasswd(
          { email: this.state.email.toLowerCase(), key: this.state.code, password: this.state.password }
        ).then(() => {
          console.log('Updated password');
          Alert.alert('Info.', 'You password has been updated.');
          this.props.navigation.navigate('Login');
        }).catch((e) => {
          // display error
          console.log(e);
          Alert.alert('Error', 'Something went wrong!');
        }).then(() => {
          this.setState({ textStatus: true });
        });
      }
    } else {
      Alert.alert('Alert', 'Something went wrong.');
    }
  }

  render() {
    const ifFieldStatusOK = renderIf(this.state.fieldsStatus);
    if (Device.isIphoneX) {
      Object.assign(styles, {
        logo: {
          marginTop: 129,
          alignSelf: 'center',
        },
      });
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground
          style={styles.bg}
          source={require('../../../assets/images/bg1.jpg')}
        >
          <View style={styles.topRow}>
            <Feather name="arrow-left" color={Colors.black} size={28} onPress={this.stackNav} /> 
            <Text style={styles.title}>Reset Password</Text>
          </View>

          <Image
            style={styles.logo}
            source={require('../../../assets/images/Scaventure1.png')}
          />

          <View style={[styles.inputField, styles.inputMargin]}>
            <Feather name="mail" color={Colors.black} size={28} />
            <TextInput
              style={styles.textIpt}
              placeholder='Email'
              onChangeText={(email) => this.setState({ email })}
              keyboardType='email-address'
            />
          </View>

          <View style={styles.inputField}>
            {ifFieldStatusOK(<Feather name="hash" color={Colors.black} size={28} />)}
            {ifFieldStatusOK(
              <TextInput
                style={styles.textIpt}
                placeholder='Confirmation code'
                onChangeText={(code) => this.setState({ code })}
                keyboardType='numeric'
              />
            )}
          </View>

          <View style={styles.inputField}>
            {ifFieldStatusOK(<Feather name="lock" color={Colors.black} size={28} />)}
            {ifFieldStatusOK(
              <TextInput
                style={styles.textIpt}
                onChangeText={(password) => this.setState({ password })}
                placeholder='New password'
                secureTextEntry
              />
            )}
          </View>

          <TouchableOpacity style={[styles.btn, styles.confirmBtn]} onPress={this.btnPressed.bind(this)}>
            { this.state.textStatus
              ? <Text style={styles.btnText}>{this.state.myText}</Text>
              : <ActivityIndicator style={styles.loading} size="small" color="#00ff00" /> }
          </TouchableOpacity>

        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 42,
    marginTop: 42,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
  inputField: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20.5,
  },
  inputMargin: {
    marginTop: 90,
  },
  textIpt: {
    marginLeft: 7.5,
    fontSize: 12,
    height: 25,
    width: 185,
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtn: {
    backgroundColor: Colors.primaryColor,
    width: 212,
    height: 38,
    marginLeft: 82,
    marginTop: 104,
  },
});

/* -> Redux Setup */
function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(RestorePwdScreen);

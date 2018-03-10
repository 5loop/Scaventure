// Signup screen
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

const Device = require('react-native-device-detection');

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Signup',
    header: null,
  };
  constructor() {
    super();
    this.state = {
      textStatus: true,
    };
  }
  stackNav = () => {
    this.props.navigation.goBack(null);
  }
  btnPressed = () => {
    // Validate input, set error & return if not valid
    const email = this.state.email;
    const passwd = this.state.password;
    const cmPasswd = this.state.cmpassword;
    const emailREGEX = /\S+@\S+\.\S+/;

    if (emailREGEX.test(String(email).toLowerCase()) === false) {
      Alert.alert('Alert', 'Email is not valid.');
    } else if (!passwd || passwd.length < 6) {
      Alert.alert('Alert', 'Password must have at least 6 characters/numbers.');
    } else if (passwd !== cmPasswd) {
      Alert.alert('Alert', 'Password does not match.');
    } else {
      // Set Loader (some status indicating that HTTP call is in progress)
      this.setState({ textStatus: false });
      this.props.actions.registerUser(
        { email: this.state.email, password: this.state.password }
      ).then(() => { 
        console.log('Logged in');
        Alert.alert('Info.', 'Verification email sent. Please login to your email account and click link to confirm.');
        // TODO @Yalong -> Navigate to 'We Sent you verification email screen'
        this.props.navigation.navigate('Login');
      }).catch((e) => { 
        // display error that could not login
        Alert.alert('Error', 'Something went wrong!');
        console.log(e); 
      }).then(() => {
        // Release Loader (HTTP call has ended)
        this.setState({ textStatus: true });
      });
    }
  }

  render() {
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
          source={require('../../../assets/images/bg.png')}
        >
          <View style={styles.topRow}>
            <Feather name="arrow-left" color={Colors.black} size={28} onPress={this.stackNav} /> 
            <Text style={styles.title}>Sign Up</Text>
          </View>

          <Image
            style={styles.logo}
            source={require('../../../assets/images/Scaventure.png')}
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
            <Feather name="lock" color={Colors.black} size={28} />
            <TextInput
              style={styles.textIpt}
              placeholder='Password'
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View style={styles.inputField}>
            <Feather name="lock" color={Colors.black} size={28} />
            <TextInput
              style={styles.textIpt}
              onChangeText={(cmpassword) => this.setState({ cmpassword })}
              placeholder='Confirm Password'
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={[styles.btn, styles.signupBtn]} onPress={this.btnPressed}>
            { this.state.textStatus 
              ? <Text style={styles.btnText}>Confirm</Text>
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
    marginLeft: 77,
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
  signupBtn: {
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

export default connect(null, mapDispatchToProps)(SignupScreen);

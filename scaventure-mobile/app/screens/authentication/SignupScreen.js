// Login screen
import React from 'react';

import {
  Text, TextInput, View, StyleSheet,
  Image, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/colors';

const Device = require('react-native-device-detection');

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'Signup',
    header: null,
  };
  stackNav = () => {
    this.props.navigation.goBack(null);
  }
  btnPressed = () => {
    console.log('button pressed');
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
            onChangeText={(text) => this.setState({ text })}
          />
        </View>

        <View style={styles.inputField}>
          <Feather name="user" color={Colors.black} size={28} />
          <TextInput
            style={styles.textIpt}
            placeholder='Username'
            onChangeText={(text) => this.setState({ text })}
          />
        </View>

        <View style={styles.inputField}>
          <Feather name="lock" color={Colors.black} size={28} />
          <TextInput
            style={styles.textIpt}
            onChangeText={(text) => this.setState({ text })}
            placeholder='Password'
          />
        </View>

        <TouchableOpacity style={[styles.btn, styles.signupBtn]} onPress={this.btnPressed}>
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>

        {/* <View style={[styles.btn, styles.signupBtn]}>
          <Button
            title="Sign up"
            color="white"
            onPress={this.btnPressed}
          />
        </View> */}
      </ImageBackground>
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
  },
  signupBtn: {
    backgroundColor: Colors.primaryColor,
    width: 212,
    height: 38,
    marginLeft: 82,
    marginTop: 104,
  },
});

export default SignupScreen;

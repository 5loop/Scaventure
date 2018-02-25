// Login screen
import React from 'react';

import {
  Text, TextInput, View, StyleSheet, Button,
  Image, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/colors';

const Device = require('react-native-device-detection');

class LoginScreen extends React.Component {
  stackNav = () => {
    this.props.navigation.navigate('DrawerOpen');
  }
  btnPressed = () => {
    console.warn('button pressed');
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
          <Feather name="menu" color={Colors.black} size={28} onPress={this.stackNav} />
          <Text style={styles.title}>Login</Text>
        </View>

        <Image
          style={styles.logo}
          source={require('../../../assets/images/Scaventure.png')}
        />

        <View style={[styles.inputField, styles.inputMargin]}>
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
            secureTextEntry
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot?</Text>
        </TouchableOpacity>

        <View style={[styles.btn, styles.signinBtn]}>
          <Button
            title="Sign in"
            color="white"
            onPress={this.btnPressed}
          />
        </View>

        <Text style={styles.caption}>Don't have account yet?</Text>

        <View style={[styles.btn, styles.signupBtn]}>
          <Button
            title="Sign up"
            color="white"
            onPress={this.btnPressed}
          />
        </View>
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
    marginLeft: 91,
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
    marginTop: 130,
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
  forgot: {
    fontSize: 9,
    textAlign: 'right',
    marginRight: 87.5,
  },
  btn: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 19,
  },
  signinBtn: {
    backgroundColor: Colors.primaryColor,
    width: 212,
    height: 38,
    marginLeft: 82,
    marginTop: 104,
  },
  caption: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 20,
  },
  signupBtn: {
    backgroundColor: Colors.secondaryColor,
    width: 136,
    height: 38,
    marginLeft: 120,
    marginTop: 6,
  },
});

export default LoginScreen;

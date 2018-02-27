// Login screen
import React from 'react';
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';  

import {
  Text, TextInput, View, StyleSheet,
  Image, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Local Imports
import Colors from '../../constants/colors';
import * as sessionActions from '../../actions/sessionActions';

const Device = require('react-native-device-detection');

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };
  stackNav = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  btnPressed = () => {
    // TODO @Yalong -> Validate input, set error & return if not valid
    // TODO @Yalong -> Set Loader (some status indicating that HTTP call is in progress)

    this.props.actions.loginUser({ email: this.state.user, password: this.state.password }).then(() => { 
      console.log('Logged in');
      this.props.navigation.navigate('PublicQuests');
    }).catch((e) => { 
      // TODO @Yalong -> display error that could not login
      console.log(e); 
    }).then(() => {
      // TODO @Yalong -> Release Loader (HTTP call has ended)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
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
            underlineColorAndroid='transparent'
            style={styles.textIpt}
            placeholder='Username'
            onChangeText={(user) => this.setState({ user })}
          />
        </View>

        <View style={styles.inputField}>
          <Feather name="lock" color={Colors.black} size={28} />
          <TextInput
            style={styles.textIpt}
            onChangeText={(password) => this.setState({ password })}
            placeholder='Password'
            secureTextEntry
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot} onPress={() => navigate('RestorePwd')}>Forgot?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.signinBtn]} onPress={this.btnPressed}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.caption}>Don't have account yet?</Text>

        <TouchableOpacity style={[styles.btn, styles.signupBtn]} onPress={() => navigate('Signup')}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>

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
  forgot: {
    fontSize: 9,
    textAlign: 'right',
    marginRight: 87.5,
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

/* -> Redux Setup */
function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LoginScreen);

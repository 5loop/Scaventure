import {  StackNavigator } from 'react-navigation';
import React from 'react';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import RestorePwdScreen from './screens/authentication/RestorePwdScreen';


export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  RestorePwd: {
    screen: RestorePwdScreen,
  },
});

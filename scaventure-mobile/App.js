import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import axios from 'axios';

import Router from './app/router';
import store from './app/store';

// for debug
import { loginUser } from './app/actions/sessionActions';

store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));

// global axios settings
axios.defaults.headers.post['Content-Type'] = 'application/json';

// This is the starting point of it all
export default class AppDrawer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AppDrawer', () => AppDrawer);

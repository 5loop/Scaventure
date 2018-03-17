import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import axios from 'axios';
import store from './app/store';
import Layout from './app/layout';

// import { loginUser } from './app/actions/sessionActions';

// store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));
// global axios settings
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class AppDrawer extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AppDrawer', () => AppDrawer);

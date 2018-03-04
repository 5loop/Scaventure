import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import axios from 'axios';

import Router from './app/router';
import store from './app/store';
import { loginUser } from './app/actions/sessionActions';

<<<<<<< HEAD
store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));
=======
// for debug
// import { loginUser } from './app/actions/sessionActions';

// store.dispatch(loginUser({ email: 'scaventure@scv.com', password: 'testtest' }));

>>>>>>> b25ce627ee2ab6325eb8ac53bea761f6451212eb
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

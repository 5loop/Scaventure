import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import Router from './app/router';
import store from './app/store';

// This is the starting point of it all
export default class AppDrawer extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('AppDrawer', () => AppDrawer);
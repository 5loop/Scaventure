import React, { Component } from 'react';

import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import Router from './router';
import AuthRouter from './authNavigation';

const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: Router,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
      SignedOut: {
        screen: AuthRouter,
        navigationOptions: {
          gesturesEnabled: false,
        },
      },
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    }
  );
};

class RootNavgator extends React.Component {
  render() { 
    const Layout = createRootNavigator(this.props.authenticated);
    return <Layout />;
  }
}

// component will receive props
function mapStateToProps(state) {
  return {
    authenticated: state.authenticated.authenticated,
  };
}

export default connect(mapStateToProps, null)(RootNavgator);

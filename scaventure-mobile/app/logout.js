import React from 'react';
import { View, SafeAreaView, Button, AsyncStorage } from 'react-native';
import { DrawerItems } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutUser } from './actions/sessionActions';
import Colors from './constants/colors';

class LogoutNavOption extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 30 }}>
        <SafeAreaView>
          <DrawerItems {...this.props.drawer} />
          <Button 
            title="Logout" 
            color={Colors.secondaryColor} 
            onPress={() => this.props.logoutUser()}
          />
        </SafeAreaView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(LogoutNavOption);

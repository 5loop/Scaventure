import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// STYLING //
import Colors from '../app/constants/colors';

// //// SCREENS ////////
import QuestScreen from './screens/quests/QuestScreen';
import SettingsScreen from './screens/SettingsScreen';
import QuestInfo from './screens/quests/QuestInfo';
import MapTest from './screens/MapTest';
import QuestLocation from './screens/quests/QuestLocation';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import RestorePwdScreen from './screens/authentication/RestorePwdScreen';

// The drawer top-icon 
const Hamburger = ({ navigation }) => <Feather name="menu" color={Colors.white} size={28} onPress={() => navigation.navigate('DrawerOpen')} />;

const headerStyle = {
  backgroundColor: Colors.primaryColor,
  borderBottomColor: Colors.secondaryColor,
  borderBottomWidth: 3,
  paddingLeft: 20,
};

const headerTitleStyle = {
  color: Colors.white,
  fontSize: 18,
};

const screenToStack = (screen, screenName, title) => StackNavigator({
  [screenName]: {
    screen,
    navigationOptions: ({ navigation }) => ({
      title,
      headerStyle,
      headerTitleStyle,
      headerLeft: <Hamburger navigation={navigation} />,
    }),
  },
});

class ToBeImplemented extends React.Component {
  render() {
    return ( 
      <View>
        <Text style={{ paddingTop: 30 }}> COMING SOON, FOLKS!!! 
        </Text> 
      </View>
    );
  }
}

// Stack appears on top of the screen
// const LoginScreenStack = screenToStack(LoginScreen, 'LoginScreen', 'Login');
const PublicQuestsStack = screenToStack(QuestScreen, 'PublicQuests', 'Public Quests');
const PrivateQuestsStack = screenToStack(ToBeImplemented, 'PrivateQuests', 'Private Quests');
const MyQuestsStack = screenToStack(ToBeImplemented, 'MyQuests', 'My Quests');

const CompletedQuestsStack = screenToStack(ToBeImplemented, 'CompletedQuests', 'Completed Quests');
const SettingsStack = screenToStack(SettingsScreen, 'Settings', 'Settings');
const QuestInfoStack = StackNavigator({
  QuestInfo: {
    screen: QuestInfo,
    navigationOptions: ({ navigation }) => ({
      title: 'Quest Information',
      headerStyle,
      headerTitleStyle,
      headerLeft: <Hamburger navigation={navigation} />,
    }),
  },
  QuestLocation: {
    screen: QuestLocation,
    navigationOptions: ({ navigation }) => ({
      title: 'Quest Location',
      headerStyle,
      headerTitleStyle,
      headerLeft: <Hamburger navigation={navigation} />,
    }),
  }

});

const MapStack = screenToStack(MapTest, 'MapView', 'Map View');

export default DrawerNavigator({
  QuestInfo: {
    screen: QuestInfoStack,
  },
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  RestorePwd: {
    screen: RestorePwdScreen,
  },
  PublicQuests: {
    screen: PublicQuestsStack,
  },
  PrivateQuests: {
    screen: PrivateQuestsStack,
  },
  MyQuests: {
    screen: MyQuestsStack,
  },
  CompletedQuests: {
    screen: CompletedQuestsStack,
  },
  Settings: {
    screen: SettingsStack,
  },
  MapStack: {
    screen: MapStack,
  },
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor,
    style: {
      flex: 1,
      paddingTop: 15,
    },
  },
});

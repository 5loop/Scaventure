import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// STYLING //
import Colors from '../app/constants/colors';

// //// SCREENS ////////
import QuestScreen from './screens/quests/QuestScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/authentication/LoginScreen';

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

export default DrawerNavigator({
  Login: {
    screen: LoginScreen,
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
}, {
  contentOptions: {
    activeTintColor: Colors.primaryColor,
    style: {
      flex: 1,
      paddingTop: 15,
    },
  },
});

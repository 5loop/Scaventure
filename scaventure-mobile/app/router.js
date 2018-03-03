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
import QuestLocation from './screens/quests/QuestLocation';
import AddQuest from './screens/quests/AddQuest';
import LoginScreen from './screens/authentication/LoginScreen';
import SignupScreen from './screens/authentication/SignupScreen';
import RestorePwdScreen from './screens/authentication/RestorePwdScreen';
import FeedbackForm from './screens/quests/FeedbackForm';
import QuestStartLocation from './screens/gameplay/QuestStartLocation';

// The drawer top-icon 
const Hamburger = ({ navigation }) => <Feather name="menu" color={Colors.white} size={28} onPress={() => navigation.navigate('DrawerOpen')} />;

const GoBack = ({ navigation }) => <Feather name="arrow-left" color={Colors.white} size={28} onPress={() => navigation.goBack()} />;

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

const AuthNavigation = StackNavigator({
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

// Stack appears on top of the screen
const PublicQuestsStack = StackNavigator({
  PublicQuests: {
    screen: QuestScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Public Quests',
      headerStyle,
      headerTitleStyle,
      headerLeft: <Hamburger navigation={navigation} />,
    }),
  },
  AddQuest: {
    screen: AddQuest,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Quest',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
  QuestInfo: {
    screen: QuestInfo,
    navigationOptions: ({ navigation }) => ({
      title: 'Quest Information',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
  QuestLocation: {
    screen: QuestLocation,
    navigationOptions: ({ navigation }) => ({
      title: 'Quest Location',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
  FeedbackForm: {
    screen: FeedbackForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Feedback',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
  QuestStartLocation: {
    screen: QuestStartLocation,
    navigationOptions: ({ navigation }) => ({
      title: 'Quest Start Location',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
});

// screenToStack(QuestScreen, 'PublicQuests', 'Public Quests');
const PrivateQuestsStack = screenToStack(ToBeImplemented, 'PrivateQuests', 'Private Quests');
const MyQuestsStack = screenToStack(ToBeImplemented, 'MyQuests', 'My Quests');
const CompletedQuestsStack = screenToStack(ToBeImplemented, 'CompletedQuests', 'Completed Quests');

export default DrawerNavigator({
  Login: {
    screen: AuthNavigation,
  },
  PublicQuests: {
    screen: PublicQuestsStack,
  },
  MyQuests: {
    screen: MyQuestsStack,
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

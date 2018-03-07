import { DrawerNavigator, StackNavigator } from 'react-navigation';

import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

// STYLING //
import Colors from '../app/constants/colors';

// //// SCREENS ////////
import QuestScreen from './screens/quests/QuestScreen';
import QuestInfo from './screens/quests/QuestInfo';
import QuestLocation from './screens/quests/QuestLocation';
import AddQuest from './screens/quests/AddQuest';

import FeedbackForm from './screens/quests/FeedbackForm';
import AddQAStep from './screens/quests/AddQAStep';
import MyQuestScreen from './screens/quests/MyQuestScreen';
import QuestStartLocation from './screens/gameplay/QuestStartLocation';
import LogoutNavOption from './logout';
import QuestStepList from './screens/questSteps/QuestStepList';
import EditStep from './screens/questSteps/EditStep';

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

const AddQuestStack = {
  screen: AddQuest,
  navigationOptions: ({ navigation }) => ({
    title: 'Add Quest',
    headerStyle,
    headerTitleStyle,
    headerLeft: <GoBack navigation={navigation} />,
  }),
};

const QuestInfoStack = {
  screen: QuestInfo,
  navigationOptions: ({ navigation }) => ({
    title: 'Quest Information',
    headerStyle,
    headerTitleStyle,
    headerLeft: <GoBack navigation={navigation} />,
  }),
};

const QuestLocationStack = {
  screen: QuestLocation,
  navigationOptions: ({ navigation }) => ({
    title: 'Quest Location',
    headerStyle,
    headerTitleStyle,
    headerLeft: <GoBack navigation={navigation} />,
  }),
};

const FeedbackFormStack = {
  screen: FeedbackForm,
  navigationOptions: ({ navigation }) => ({
    title: 'Add Feedback',
    headerStyle,
    headerTitleStyle,
    headerLeft: <GoBack navigation={navigation} />,
  }),
};

const QuestStartLocationStack = {
  screen: QuestStartLocation,
  navigationOptions: ({ navigation }) => ({
    title: 'Quest Start Location',
    headerStyle,
    headerTitleStyle,
    headerLeft: <GoBack navigation={navigation} />,
  }),
};

const AddQAStepStack = {
  screen: AddQAStep,
  navigationOptions: ({ navigation }) => ({
    title: 'Add QA Step',  
    headerStyle,
    headerTitleStyle,
    headerLeft: <GoBack navigation={navigation} />,
  }),
}

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
  AddQAStep: AddQAStepStack,
  AddQuest: AddQuestStack,
  QuestInfo: QuestInfoStack,
  QuestLocation: QuestLocationStack,
  FeedbackForm: FeedbackFormStack,
  QuestStartLocation: QuestStartLocationStack,
});

const MyQuestsStack = StackNavigator({
  myQuest: {
    screen: MyQuestScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'My Quests',
      headerStyle,
      headerTitleStyle,
      headerLeft: <Hamburger navigation={navigation} />,
    }),
  },  
  QuestStepList: {
    screen: QuestStepList,
    navigationOptions: ({ navigation }) => ({
      title: 'Step List',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
  EditStep: {
    screen: EditStep,
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Step',
      headerStyle,
      headerTitleStyle,
      headerLeft: <GoBack navigation={navigation} />,
    }),
  },
  AddQAStep: AddQAStepStack,
  AddQuest: AddQuestStack,
  QuestInfo: QuestInfoStack,
  QuestLocation: QuestLocationStack,
  FeedbackForm: FeedbackFormStack,
  QuestStartLocation: QuestStartLocationStack,
});

// screenToStack(QuestScreen, 'PublicQuests', 'Public Quests');
const PrivateQuestsStack = screenToStack(ToBeImplemented, 'PrivateQuests', 'Private Quests');
// const MyQuestsStack = screenToStack(myQuestStack, 'MyQuests', 'My Quests');
const CompletedQuestsStack = screenToStack(ToBeImplemented, 'CompletedQuests', 'Completed Quests');


export default DrawerNavigator({
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
      paddingTop: 30,
    },
  },
  contentComponent: (props) => (
    <LogoutNavOption drawer={props} />
  ),
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
}
);

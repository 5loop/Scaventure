import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

////// SCREENS ////////
import QuestScreen    from './screens/quests/QuestScreen';
import SettingsScreen from './screens/SettingsScreen';

// The drawer top-icon 
const Hamburger = ({navigation}) => {
  return <Feather name="menu" size={35} onPress={ () => navigation.navigate('DrawerOpen') }/>
}

const QuestStack = StackNavigator({
  Quests: {
    screen: QuestScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Quests',
      headerLeft:  <Hamburger navigation={navigation}/>
    })
  }
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerLeft:  <Hamburger navigation={navigation}/>
    })
  }
});


export default DrawerNavigator({
  Quests: {
    screen: QuestStack,
  },
  Settings: {
    screen: SettingsStack
  }
}, {
  contentOptions: {
  activeTintColor: '#e91e61',
  style: {
    flex: 1,
    paddingTop: 15,
  }
 }
});
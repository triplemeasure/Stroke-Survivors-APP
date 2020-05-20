import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ForumScreen from '../screens/ForumScreen';
import MessageScreen from '../screens/MessageScreen';
import MineScreen from '../screens/MineScreen';
import Post from '../screens/Post';
import SharePost from '../screens/SharePost';
import MyMedicalTeam from '../screens/MyMedicalTeam';
import InfoDetails from '../screens/InfoDetails';
import MyFriends from '../screens/MyFriends';
import MyCollection from '../screens/MyCollection';
import Setting from '../screens/Setting';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    headerStyle: {
      height: 90
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 45
    },
  },
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
  ),
};

HomeStack.path = '';

const ForumStack = createStackNavigator(
  {
    Forum: ForumScreen,
    Post: Post,
    SharePost: SharePost,
  },
  config
);

ForumStack.navigationOptions = {
  tabBarLabel: 'Forum',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'} />
  ),
};

ForumStack.path = '';

const MessageStack = createStackNavigator(
  {
    Message: MessageScreen,
  },
  config
);

MessageStack.navigationOptions = {
  tabBarLabel: 'Message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-mail' : 'md-mail'} />
  ),
};


MessageStack.path = '';

const MineStack = createStackNavigator(
  {
    Mine: {
      screen: MineScreen
    },
    MyMedicalTeam: {
      screen: MyMedicalTeam
    },
    InfoDetails: {
      screen: InfoDetails
    },
    MyFriends: {
      screen: MyFriends
    },
    MyCollection: {
      screen: MyCollection
    },
    Setting: {
      screen: Setting
    },
  },
  config
);

MineStack.navigationOptions = {
  tabBarLabel: 'Mine',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

MineStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ForumStack,
  MessageStack,
  MineStack,
}, {
  tabBarOptions: {
    style: {
      height: 70
    },
    labelStyle: {
      fontSize: 20,
    }
  }
});

tabNavigator.path = '';

export default tabNavigator;

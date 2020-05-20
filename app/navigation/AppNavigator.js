import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen';
import UserType from '../screens/UserTypeScreen';
import SecurityQuestion from '../screens/SecurityQuestionScreen';
import SecurityQuestionLogin from '../screens/SecurityQuestionLoginScreen';
import Search from '../screens/SearchScreen';
import UserCard from '../screens/UserCardScreen';
import MyPostings from '../screens/MyPostings';

import FeedbackScreen from '../screens/FeedbackScreen';
import Message from '../screens/MessageScreen';
import FaceLogin from '../screens/PhotoLoginScreen';
import Photo from '../screens/PhotoScreen';

export default createAppContainer(
  createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    
    Login: {
      screen: Login,
    },
    FaceLogin:{
      screen: FaceLogin,
    },
    SecurityQuestionLogin: {
      screen: SecurityQuestionLogin,
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Photo:{
      screen: Photo,
    },
    UserType: {
      screen: UserType,
    },
    SecurityQuestion: {
      screen: SecurityQuestion,
    },
    Search: {
      screen: Search,
    },
    Message:{
      screen: Message,
    },
    UserCard: {
      screen: UserCard,
    },
    MyPostings: {
      screen: MyPostings,
    },
    Feedback: {
      screen: FeedbackScreen,
    },

  }, {
    navigationOptions: {

    },
  })

);

import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';
import { pTd } from '../utils/utils';

export const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{ left: {width: pTd(100), height: pTd(100) }, right: {width: pTd(80), height: pTd(80) } }}
    imageStyle={{ left: {width: pTd(100), height: pTd(100) }, right: {width: pTd(80), height: pTd(80) } }}
  />
);


export const renderBubble = (props) => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: { borderColor: 'transparent', borderWidth: 4 },
      right: {borderColor: 'transparent'},
    }}
    usernameStyle={{fontSize: pTd(35) }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    containerStyle={{

    }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: { backgroundColor: 'transparent' },
      right: { backgroundColor: 'transparent' },
    }}
    textStyle={{
      left: { color: 'black'},
      right: { color: 'white'},
    }}
    customTextStyle={{ fontSize: pTd(50), lineHeight: pTd(60) }}
  />
);

export const renderCustomView = ({ user }) => (
  <View style={{ minHeight: 20, alignItems: 'center' }}>
    <Text>
      Current user:
      {user.name}
    </Text>
    <Text>From CustomView</Text>
  </View>
);

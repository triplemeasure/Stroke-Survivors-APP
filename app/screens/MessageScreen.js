import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import initialMessages from '../IM/messages';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from '../IM/InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from '../IM/MessageContainer';
import { init, connect, ErrorCode} from "rongcloud-react-native-imlib";
import { addReceiveMessageListener , getUnreadCount,getMessage,getHistoryMessages} from "rongcloud-react-native-imlib";
import { sendMessage, ConversationType, ObjectName } from "rongcloud-react-native-imlib";
import { setOnReceiveMessageListen } from "rongcloud-react-native-imlib";
import AsyncStorage from '@react-native-community/async-storage';
import { pTd, url } from '../utils/utils';

//var username = "test";


init("k51hidwqkvvqb");

function onSuccess(userId) {
  console.log("连接成功：" + userId);
}

function onError(errorCode) {
  console.log("连接失败：" + errorCode);
}

function onTokenIncorrect() {
  console.log("Token 不正确或已过期");
}

async function connectRongCloud(){ 
  const username = await AsyncStorage.getItem('username');
  let args = "getToken?userID=" + username + "&name=1111&potraitURI=1111"
  fetch(url+args, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((result) => {
    return result.data.token
  })
  .then((token) => {
    connect(token,onSuccess,onError,onTokenIncorrect);
    console.log(token)
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}

connectRongCloud();


const Chats = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = (newMessages = []) => {
    const conversationType = ConversationType.PRIVATE;
    const targetId ='test';
    console.log(targetId);
    const content = { objectName: ObjectName.Text, content: text};
    const callback = {
      success(messageId) {
        console.log("发送成功：" + messageId, content);
      },
      error(errorCode) {
        console.log("发送失败：" + errorCode);
      }
    };
    sendMessage({ conversationType, targetId, content }, callback);

    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

 useEffect(() => {
  const listener = addReceiveMessageListener(message => {
    console.log(message);
    newMessages = {
      _id: message.message.messageId,
      text: message.message.content.content,
      createdAt: new Date(Date.now()),
      user: {
        _id: 2,
        name: message.message.senderUserId,
        avatar: 'https://placeimg.com/140/140/any',
      },
    }
        
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  });
}, []);

  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Aaron',
        avatar: 'https://placeimg.com/150/150/any',
      }}
      alignTop
      alwaysShowSend
      scrollToBottom
      //showUserAvatar
      renderAvatarOnTop
      renderUsernameOnMessage
      bottomOffset={26}
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderAvatar={renderAvatar}
      renderBubble={renderBubble}
      renderMessage={renderMessage}
      renderMessageText={renderMessageText}
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
  );
};

export default Chats;
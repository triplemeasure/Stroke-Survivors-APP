import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={40}
      style={{ marginBottom: -7, }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

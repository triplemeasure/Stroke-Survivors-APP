import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, FlatList } from 'react-native';

import Style from '../styles/styles'

import Status from '../components/Status.js'
import NavBar from '../components/NavBar'

import { pTd,url } from '../utils/utils';
import Search from '../components/Search'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


export default class MyPostings extends Component {
    

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      userType: "",
      token:'',
      username:'',
    };
  }

  async componentDidMount() {
    const userType = await AsyncStorage.getItem('userType');
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    this.setState({userType:userType,username: username,token: token });
    console.log('this.state ',this.state.userType,this.state.username,this.state.token);

    let args = "api/v1/who/" + username + "?token=" + token

    fetch(url + args)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData.data.lists);
        this.setState({
          data: this.state.data.concat(responseData.data.lists),
          loaded: true
        });
      });
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderArticle}
        style={styles.list}
        keyExtractor={item => item.id}
      />
    );
  }


  renderArticle({ item }) {
    return (
      <View style={styles.container}>
          <TouchableOpacity
           onPress={() => this.props.navigation.navigate("Postings")}
           accessibilityLabel="Posting detail"
       >

                                    
        <View style={{
            backgroundColor: '#FFF',
            padding: pTd(30),
            marginBottom: 1
        }}>
            <View style={{}}>
                <Text style={{ color: '#101010', fontSize: pTd(36), lineHeight: pTd(40), marginBottom: pTd(20) }}>{item.article_name}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={{ fontSize: pTd(26), color: '#61676F', lineHeight: pTd(30), }}>{item.created_at}</Text>
                <Ionicons name="ios-chatboxes" size={pTd(40)} style={{ color: '#8c8c8c', }} />
            </View>
        </View>


        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});











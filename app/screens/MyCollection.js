import React, { Component } from 'react';
import Style from '../styles/styles'
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { pTd, url } from '../utils/utils'
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class MyCollection extends Component {
    
    

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }


  async componentDidMount() {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    //this.setState({username:username,token: token });
    let args = "api/v1/favoriteArticle?username=" + username+ "&token=" + token
    console.log(args)
    fetch(url + args)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
            this.setState({
            data: responseData.data.list,
            loaded: true
            })
        }).catch(
            error => console.log(error)
        )
  }



  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderCollection}
        // renderItem={this.hello()}
        keyExtractor={item => item.id}
      />
    );
  }


      renderCollection({ item }) {

        return (
            <View style={Style.container}>
                <TouchableOpacity onPress={() => { navigate('Post') }}
                    accessibilityLabel="Collection posting details"
                >
                    <View style={{
                        backgroundColor: '#FFF',
                        padding: pTd(40),
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <View style={{
                            flex: 1
                        }}>
                            <Text style={{ color: '#101010', fontSize: pTd(36), lineHeight: pTd(40), marginBottom: pTd(20) }}>{item.article_name}</Text>
                            <Text style={{ color: '#8c8c8c', fontSize: pTd(30), lineHeight: pTd(32), marginBottom: pTd(20) }}>{item.content}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image resizeMode='cover' style={{ width: pTd(42), height: pTd(42), borderRadius: pTd(21), marginRight: pTd(25) }} source={require('../assets/images/robot-prod.png')} />
                                <Text style={{ fontSize: pTd(26), color: '#8c8c8c', lineHeight: pTd(30), }}>{item.created_at}</Text>
                            </View>
                        </View>
                        <View style={{}}>
                            <Image resizeMode='cover' style={{ width: pTd(206), height: pTd(148) }} source={require('../assets/images/robot-prod.png')} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
        
    }
  
  
}

const styles = StyleSheet.create({

});











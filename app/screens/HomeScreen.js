import React, { Component } from 'react';
import { StyleSheet, Text, View,FlatList, TextInput, TouchableOpacity, Image, Button, Alert, ScrollView } from 'react-native';
import { pTd, url } from '../utils/utils';
import Search from '../components/Search';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userType: " ",
      username:'',
      token: '',
      date: []
    };
  }

  
  async componentDidMount() {
    const userType = await AsyncStorage.getItem('userType');
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    this.setState({userType:userType,username: username,token: token });
    console.log('this.state ',this.state.userType,this.state.username,this.state.token);

    let args = "getdoctor"
    fetch(url+args, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("getdoctor",result.data);
        console.log("0",result.data[0].username,result.data[0].duration);

        this.setState(
          { data :[
            {username: result.data[0].username, duration: result.data[0].duration},
            {username: result.data[1].username, duration: result.data[1].duration},
            {username: result.data[2].username, duration: result.data[2].duration},
            {username: result.data[3].username, duration: result.data[3].duration},
            {username: result.data[4].username, duration: result.data[4].duration},
            {username: result.data[5].username, duration: result.data[5].duration},
            {username: result.data[6].username, duration: result.data[6].duration},
            {username: result.data[7].username, duration: result.data[7].duration},
            {username: result.data[8].username, duration: result.data[8].duration},
          ]}
        )
        console.log(this.state.data);
        // console.log(result.data[0].username)
        // console.log(result.data[0].duration)
        //this.setState({doctorName : result.data.username})

    })
    .catch((error) => {
        console.error('Error:', error);
    })
  }

  
  
  render() {
    let userType = this.state.userType;
    let data = this.state.data;
    return (
      
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View style={{ backgroundColor: '#fff' }}>
          <Search></Search>
        </View>
        <View style={{ height: pTd(15), backgroundColor: "#f4f4f4", marginVertical: pTd(10), marginTop: 0 }}></View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
          <View>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Message',{receiver:item.username}) }} accessibilityLabel="Mesaage">
              <View style={{
                backgroundColor: '#FFF',
                padding: pTd(30),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={{}}>
                  <Image resizeMode='cover' style={{ width: pTd(140), height: pTd(100) }} source={require('../assets/images/robot-prod.png')} />
                </View>
                <View style={{
                  flex: 1,
                  marginHorizontal: pTd(20)
                }}>
                  <Text style={{ color: '#101010', fontSize: pTd(36), lineHeight: pTd(40), marginBottom: pTd(20) }}>{item.username}</Text>
                  <Text style={{ color: '#8c8c8c', fontSize: pTd(30), lineHeight: pTd(32), marginBottom: pTd(20) }}>{item.duration} years</Text>
                </View>

                {userType != "doctor"?(
                  <Follow doctor_name = {item.username}></Follow>
                ):(
                  <View></View>
                )}
              </View>
            </TouchableOpacity>
            <View style={{ height: pTd(15), backgroundColor: "#f4f4f4", marginVertical: pTd(10), marginTop: 0 }}></View>
          </View>
          }
        />
      </View>

    )
  }



  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigation.navigate('App');
  };
}

class Follow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      follow: false,
      token:'',
      username: '',
    }
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    this.setState({username:username,token: token });
  }

  

  addFollow() {
    let args = "api/v1/follow?doctor_name=" + this.props.doctor_name + "&patient_name=" + this.state.username + "&token=" + this.state.token
    console.log(args);
    fetch(url+args, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if(result.code == 200){
        this.setState({follow:true});
        Alert.alert('Reminder','Follow successfully', [{ text: 'OK' }]);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  deleteFollow() {
    let args = "api/v1/followed?doctor_name=" + this.props.doctor_name + "&patient_name=" + this.state.username + "&token=" + this.state.token
    fetch(url+args, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if(result.code == 200){
        this.setState({follow:false});
        Alert.alert('Reminder','Unfollow successfully', [{ text: 'OK' }]);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  render() {
    const { follow } = this.state
    return (
      <TouchableOpacity
        onPress={() => {
          if (follow) {
            this.deleteFollow("1")
          } else {
            this.addFollow("1")
          }
        }}
        style={{ paddingVertical: pTd(10), paddingHorizontal: pTd(20), borderRadius: pTd(25), backgroundColor: '#ff9800', }}
        accessibilityLabel=" "
      >
        <Text style={{ fontSize: pTd(28), color: '#fff', lineHeight: pTd(30), opacity: follow ? .5 : 1 }} accessibilityLabel="Follow" >Follow</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // marginLeft:40,
    alignItems: "center",
    marginTop: 80,
    // flexDirection:"row",
    flex: 1
  },
  Inputstyle: {
    marginTop: 20,
    textAlign: 'center',
    width: 300,
    height: 40,
    borderColor: "#42c4c6",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
  },
  button1: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 140,
    height: 50,
    borderColor: "#befffe",
    // marginLeft:10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#42c4c6",

  },
  button2: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 140,
    height: 50,
    borderColor: "#befffe",
    // marginLeft:10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#42c4c6",
    marginLeft: 20,

  },
})


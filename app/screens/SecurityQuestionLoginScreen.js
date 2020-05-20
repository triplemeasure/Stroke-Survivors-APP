import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert, TouchableOpacityBase, Modal, Animated } from 'react-native';
import { pTd,url } from '../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker,Provider } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Radio from '../components/Radio'

export default class SecurityQuestionScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answer:'',
            noteValue: '',
            noteText: '',
            visible: false,
            data: [
                { value: '1', label: "What's your father's name?" }, 
                { value: '2', label: "What's your mother's name?" },
                { value: '3', label: "What's your grandpa's name?" },
                { value: '4', label: "What's your grandma's name?" },
                { value: '5', label: "What's your tutor's name? "},
            ],
            username: '',
            address:'', 
            duration:'', 
            password:"", 
            faceToken:"",
            userType:"", 
            QA:"",


        }
    }

    static navigationOptions = {
        title: 'Security Question login',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: pTd(30),
        },
    };

    login(){
        let args = "authF?username=" + this.state.username + "&security_question=" + this.state.noteText+this.state.answer
        console.log(args)
        fetch(url + args, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("login",result)
            this.setState({token: result.data.token})
            if(result.code==200){
                this.props.navigation.navigate("Home");
                this.storeToken();
            }else{
                Alert.alert('Reminder', 'Wrong username or password', [{ text: 'OK' }]);
            }
        })
        .catch((error) =>{
            console.error('Error:', error)
        })
    }

    async storeToken(){
        try {
            await AsyncStorage.setItem('token', this.state.token);
            await AsyncStorage.setItem('username', this.state.username);
            console.log("stored", this.state.token,this.state.username);
        }catch (e) {}
    }
    


    // async storeQA(){
    //     try {
    //         await AsyncStorage.setItem('QA', this.state.noteText+this.state.answer);
    //         console.log("stored", this.state.noteText+this.state.answer);
    //     }catch (e) {}
    // }

    // async componentDidMount() {
    //     let username = await AsyncStorage.getItem('username');
    //     let address = await AsyncStorage.getItem('address');
    //     let duration = await AsyncStorage.getItem('duration');
    //     let password = await AsyncStorage.getItem('password');
    //     let faceToken = await AsyncStorage.getItem('faceToken');
    //     let userType = await AsyncStorage.getItem('userType');
    //     //let QA = await AsyncStorage.getItem('QA');
    //     //console.log(username, address, duration, password, faceToken, userType, QA);
    //     this.setState({username:username,address: address, duration:duration[0], password:password, faceToken: faceToken, userType:userType})
    //     console.log(this.state.username)
    // }


    render() {
        const { noteValue, noteText, data, visible } = this.state
        return (
            <Provider>
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.InputBox}
                    placeholder="Enter my username"
                    editable={true}
                    onChangeText={(text) => {this.state.username = text }}
                />
                <View style={{ marginTop: pTd(50) }}>
                    <View style={[styles.tabs]}>
                        <View style={[styles.tab]}>
                            <Text style={[styles.tabText]}>Security Question</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.info}>
                    <Picker
                        okText={"OK"}
                        dismissText={"Cancel"}
                        data={data}
                        cols={1}
                        value={noteValue}
                        onChange={(value, next) => {
                            console.log(value, next)
                            data.map((item, index) => {
                                if (item.value == value) {
                                    this.setState({
                                        noteText: item.label
                                    })
                                }
                            })
                            this.setState({
                                noteValue: value
                            })
                        }}
                        indicatorStyle={{ height: pTd(60) }}
                    >
                        <TouchableOpacity style={styles.InputBox} >
                            <View style={styles.Inputstyle}>
                                <Text style={styles.InputText}>{noteText}</Text>
                            </View>
                            <View style={{}}>
                                <Ionicons
                                    name={"md-arrow-dropdown"}
                                    size={pTd(60)}
                                    style={{}}
                                    color={"#000"}
                                />
                            </View>
                        </TouchableOpacity>
                    </Picker>
                    <TextInput style={styles.InputBox}
                        placeholder="Answer"
                        editable={true}
                        onChangeText={(text) => {
                            this.state.answer = text
                        }}
                    />
                </View>
                <View style={{ marginTop: pTd(50) }}>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.login();
                            }} 
                            style={styles.button}
                            accessibilityLabel="Next"
                        >
                            <Text
                                style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: pTd(60),
        flex: 1,
        paddingTop: pTd(30)
    },
    InputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: pTd(50),
        textAlign: 'center',
        height: pTd(100),
        borderColor: "#ff9800",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: pTd(40),
        paddingHorizontal: pTd(30)
    },
    Inputstyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    InputText: {
        flex: 1,
        fontSize: pTd(36),
        color: '#61676F',
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginBottom: 30
    },
    tab: {
        flex: 1
    },
    tabText: {
        fontSize: pTd(60),
        lineHeight: pTd(90),
        textAlign: 'center'
    },
    button: {
        justifyContent: 'center',
        textAlign: 'center',
        height: pTd(100),
        borderColor: "#befffe",
        // marginLeft:10,
        borderWidth: pTd(1),
        borderRadius: pTd(20),
        backgroundColor: "#42c4c6",
    },
    info: {
        marginBottom: pTd(30),
        marginTop: pTd(0)
    },
})


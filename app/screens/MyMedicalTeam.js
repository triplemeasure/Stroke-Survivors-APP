import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, Alert, AsyncStorage, ScrollView } from 'react-native';
import { pTd } from '../utils/utils';
import Search from '../components/Search'

import { SwipeAction } from '@ant-design/react-native'


export default class MyMedicalTeam extends Component {

    static navigationOptions = {
        title: 'My Patients',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    title: 'Attending doctor',
                    date: 'Stroke Classroom'
                },
                {
                    title: 'Attending doctor',
                    date: 'Stroke Classroom'
                },
            ]
        }
    }
    
    handleDelete(data, index) {
        let list = [...this.state.list]
        list.splice(index, 1)
        this.setState({
            list
        })
    }
    
    render() {
        const { list } = this.state
        
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
                {list.map((item,index)=>{
                return (<SwipeAction
                    autoClose
                    key={index}
                    style={{ backgroundColor: 'transparent' }}
                    right={[{
                        text: 'Delete',
                        onPress: () => {
                            this.handleDelete(item, index)
                        },
                        style: { backgroundColor: 'red', color: 'white' },
                    }]}
                >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Chat') }}
                    accessibilityLabel="Chat"
                    >
                        <View style={{
                            backgroundColor: '#FFF',
                            padding: pTd(30),
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 1
                        }}>
                            <View style={{}}>
                                <Image resizeMode='cover' style={{ width: pTd(140), height: pTd(100) }} source={require('../assets/images/robot-prod.png')} />
                            </View>
                            <View style={{
                                flex: 1,
                                marginHorizontal: pTd(20)
                            }}>
                                <Text style={{ color: '#101010', fontSize: pTd(36), lineHeight: pTd(40), marginBottom: pTd(20) }}>{item.title}</Text>
                                <Text style={{ color: '#8c8c8c', fontSize: pTd(30), lineHeight: pTd(32), marginBottom: pTd(20) }}>{item.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </SwipeAction>)
                })}
            </ScrollView>
        )
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigation.navigate('App');
    };
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


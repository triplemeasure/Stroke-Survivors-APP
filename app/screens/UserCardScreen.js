import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert, AsyncStorage } from 'react-native';
import { pTd } from '../utils/utils';

import Radio from '../components/Radio'

export default class UserCardScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            btn: 'Contact',
        }
    }

    static navigationOptions = {
        title: ' ',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    render() {
        const { btn } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: '#fff', padding: pTd(30) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{}}>
                            <Image resizeMode='cover' style={{ width: pTd(140), height: pTd(100) }} source={require('../assets/images/robot-prod.png')} />
                        </View>
                        <View style={{
                            flex: 1,
                            marginHorizontal: pTd(20)
                        }}>
                            <Text style={{ color: '#101010', fontSize: pTd(36), lineHeight: pTd(40), marginBottom: pTd(20) }}>Stroke Classroom</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: pTd(30) }}>
                        <Text style={{ color: '#101010', fontSize: pTd(30), lineHeight: pTd(40), marginBottom: pTd(20) }}>Illness/Doctor years:</Text>
                        <Text style={{ color: '#101010', fontSize: pTd(30), lineHeight: pTd(40), marginBottom: pTd(20) }}>Area: XX XX</Text>
                    </View>
                </View>
                <View style={{ height: pTd(15), backgroundColor: "#E6E7E8", }}></View>
                <TouchableOpacity style={{ backgroundColor: '#fff', padding: pTd(30) }} onPress={() => {
                    if (btn == 'Contact') {
                        this.props.navigation.navigate('Chat')
                        return
                    }
                    this.setState({
                        btn: 'Contact'
                    })
                }}>
                    <Text style={{ color: '#101010', fontSize: pTd(30), lineHeight: pTd(40), textAlign: 'center' }}>{btn}</Text>
                </TouchableOpacity>
            </ScrollView >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: pTd(50)
    },
})


import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert} from 'react-native';
import { pTd } from '../utils/utils';
import AsyncStorage from '@react-native-community/async-storage';
import Radio from '../components/Radio'

export default class UserTypeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            patient: true,
            dotor: false,
        }
    }

    static navigationOptions = {
        title: 'User Type',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    handleChangeTab(active) {
        this.setState({
            active
        })
    }

    async storeUserType(){
        if (this.state.patient == true){
            try {
                await AsyncStorage.setItem('userType', "0");
                console.log("stored", "0");
            }catch (e) {}
        }else{
            try {
                await AsyncStorage.setItem('userType', "1");
                console.log("stored", "1");
            }catch (e) {}
        }
    }

    render() {
        const { patient, dotor } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{ marginTop: 10 }}>
                    <View style={[styles.tabs]}>
                        <View
                            style={[styles.tab]}
                        >
                            <Text style={[styles.tabText]}>User Type</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.info}>
                    <Radio checked={patient} onChange={(patient) => this.setState({ patient, dotor: !patient })}>Patient</Radio>
                    <Radio checked={dotor} onChange={(dotor) => this.setState({ patient: !dotor, dotor })}>Doctor</Radio>
                </View>
                <View style={{ marginTop: pTd(50) }}>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={async() => {
                                this.storeUserType();
                                this.props.navigation.navigate("SecurityQuestion");
                            }} //添加点击事件
                            style={styles.button}
                            accessibilityLabel="Next"
                        >
                            <Text
                                style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: pTd(60),
        flex: 1,
        paddingTop: pTd(30)
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


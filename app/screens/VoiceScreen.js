import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert, AsyncStorage, TouchableOpacityBase, Modal, Animated } from 'react-native';
import { pTd } from '../utils/utils';
import { Switch } from '@ant-design/react-native';


export default class VoiceScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false,
        }
    }

    static navigationOptions = {
        title: 'Screen Reader',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    onSwitchChange = value => {
        this.setState({
            checked: value,
        });
    };

    render() {
        const { checked } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{ marginTop: 10 }}>
                    <View style={[styles.tabs]}>
                        <View
                            style={[styles.tab]}
                        >
                            <Text style={[styles.tabText]}
                                accessibilityLabel="Screen Reader"
                            >Screen Reader</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.info}>
                    <Switch
                        checked={this.state.checked}
                        onChange={this.onSwitchChange}
                        color="#ffdc18"
                    />
                </View>
                <View style={{ marginTop: pTd(50) }}>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Login")} //添加点击事件
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
        marginTop: pTd(50),
        alignItems: 'center',
    },
})


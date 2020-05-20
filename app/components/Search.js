import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert, AsyncStorage } from 'react-native';
import { pTd } from '../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Radio from '../components/Radio'

export default class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            patient: false,
            dotor: false,
        }
    }

    static navigationOptions = {
        title: 'Search',
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

    render() {
        const { active, patient, dotor } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{ marginTop: pTd(0) }}>
                    <View style={styles.Inputstyle}>
                        <TextInput style={styles.Input}
                            placeholder="Search"
                            editable={true}
                        />
                        <TouchableOpacity>
                            <Ionicons
                                name={"md-search"}
                                size={pTd(60)}
                                style={{}}
                                color={"#000"}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ height: 1, backgroundColor: '#000', marginTop: pTd(60) }}></View>
                    <View style={[styles.info, { marginTop: pTd(20) }]}>
                        <TouchableOpacity>
                            <Text style={styles.infoText}>Recommerd</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[styles.infoText, { color: '#03468F' }]}>All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: pTd(20) }}></View>
                    <View style={{}}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Ionicons
                                name={"md-search"}
                                size={pTd(40)}
                                style={{}}
                                color={"#000"}
                            />
                            <Text style={[styles.infoText, { fontSize: pTd(30), lineHeight: pTd(60), marginLeft: pTd(10) }]}>XXXXXXXX</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Ionicons
                                name={"md-search"}
                                size={pTd(40)}
                                style={{}}
                                color={"#000"}
                            />
                            <Text style={[styles.infoText, { fontSize: pTd(30), lineHeight: pTd(60), marginLeft: pTd(10) }]}>XXXXXXXX</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: pTd(30),
        paddingVertical: pTd(30),
    },
    Inputstyle: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        height: pTd(100),
        borderColor: "#ff9800",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: pTd(40),
        paddingRight: pTd(30)
    },
    Input: {
        flex: 1,
        textAlign: 'center',
        height: pTd(100),
        fontSize: pTd(40),
    },
    InputButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: pTd(100),
        height: pTd(100),
    },
})


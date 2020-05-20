import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, Switch } from 'react-native';
import Style from '../styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { pTd,url } from '../utils/utils';
import AsyncStorage from '@react-native-community/async-storage';



class Setting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            address: null,
            username: null,
        };

        this.onSwitchChange = value => {
            this.setState({
                checked: value,
            });
        };

    }
    async componentDidMount() {
        const username = await AsyncStorage.getItem('username');
        let args = "getInfoFromName/" + username
        fetch(url+args, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result.data)
            this.setState({username : result.data.username})
            this.setState({icon : result.data.icon})
            this.setState({address : result.data.address})
            this.setState({duration:result.data.duration})
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }
    

    

    render() {
        const { navigation } = this.props
        const { navigate } = navigation
        
        return (
            <View style={Style.container}>
                {/* <NavBar
                    title="Setting"
                    back={() => navigate.goBack()}
                /> */}
                <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
                    <View style={Style.cells}>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <Text style={[Style.cellText]}>Avatar</Text>
                                <Image resizeMode='cover' style={[Style.cellIcon, { width: pTd(100), height: pTd(100), }]} source={require('../assets/images/robot-prod.png')} />
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom]}>
                                <Text style={[Style.cellText]}>name</Text>
                                <Text style={Style.cellExtra}>{this.state.username} </Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell]}>
                                <Text style={[Style.cellText]}>Address</Text>
                                <Text style={Style.cellExtra}>{this.state.address}</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={Style.cells}>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom]}>
                                <Text style={[Style.cellText]}>Duration</Text>
                                <Text style={Style.cellExtra}>{this.state.duration} years</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom]}>
                                <Text style={[Style.cellText]}>Night mode</Text>
                                <Switch
                                    checked={this.state.checked}
                                    onChange={this.onSwitchChange}
                                    color="#ffdc18"
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom]}>
                                <Text style={[Style.cellText]}>App Scoring</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: pTd(20) }}></View>
                </ScrollView>
            </View>
        )
    }
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
}

export default Setting

const styles = StyleSheet.create({


})

Setting.navigationOptions = {
    title: 'Setting',
};


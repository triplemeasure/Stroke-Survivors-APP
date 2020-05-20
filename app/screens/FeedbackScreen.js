import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, AsyncStorage, TextInput, } from 'react-native';
import Style from '../styles/styles'
import { pTd } from '../utils/utils'

export default class Feedback extends Component {

    static navigationOptions = {
        title: 'Feedback',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.state = {
            userType: ''
        }
    }

    async componentDidMount() {
        let userType = await AsyncStorage.getItem('userType')
        this.setState({
            userType
        })
    }

    render() {
        const { userType } = this.state
        const { navigation } = this.props
        const { navigate } = navigation;

        console.log(this.props)
        return (
            <View style={Style.container}>
                <TextInput style={{ flex: 1, fontSize: pTd(50), color: '#61676F', textAlignVertical: 'top', padding: 15 }} placeholder="suggetions / problems" multiline></TextInput>
                <TouchableOpacity onPress={() => {
                    Alert.alert('提示', '评论成功', [{ text: '确定' }]);
                    this.props.navigation.pop()
                }}>
                    <View style={{ padding: pTd(50), alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#ccc' }}>
                        <Text style={{ fontSize: pTd(50), color: '#61676F', lineHeight: pTd(60), borderWidth: 1, borderColor: '#ccc', padding: pTd(30), borderRadius: pTd(20) }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
}


const styles = StyleSheet.create({


})


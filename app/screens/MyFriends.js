import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import Style from '../styles/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { pTd } from '../utils/utils'

class MyFriends extends Component {
    
    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { navigation } = this.props
        const { navigate } = navigation
        return (
            <View style={Style.container}>
                <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
                    <View style={Style.cells}>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#e51c23',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#e51c23', lineHeight: pTd(88), textAlign: 'center' }}>A</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>Alice</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#ff9800',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#ff9800', lineHeight: pTd(88), textAlign: 'center' }}>B</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>Bob</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#ffdc1c',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#ffdc1c', lineHeight: pTd(88), textAlign: 'center' }}>C</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>Cindy</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#259b24',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#259b24', lineHeight: pTd(88), textAlign: 'center' }}>D</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>David</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#28b8a1',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#28b8a1', lineHeight: pTd(88), textAlign: 'center' }}>E</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>Eric</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#3f51b5',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#3f51b5', lineHeight: pTd(88), textAlign: 'center' }}>F</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>Frank</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[Style.cell, Style.lineBottom, { alignItems: 'center', }]}>
                                <View style={{
                                    width: pTd(88),
                                    height: pTd(88),
                                    borderWidth: 1,
                                    borderColor: '#8828b8',
                                    borderRadius: pTd(44),
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(28), color: '#8828b8', lineHeight: pTd(88), textAlign: 'center' }}>G</Text>
                                </View>
                                <Text style={[Style.cellText, { lineHeight: pTd(90) }]}>Grace</Text>
                                <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae',  }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: pTd(20) }}></View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
}

export default MyFriends

const styles = StyleSheet.create({


})

MyFriends.navigationOptions = {
    title: 'My friends',
};


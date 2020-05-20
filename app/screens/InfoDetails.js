import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import Style from '../styles/styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { pTd } from '../utils/utils'

class InfoDetails extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { navigation } = this.props
        const { navigate } = navigation
        return (
            <View style={Style.container}>
                {/* <NavBar
                    title=" "
                    style={{
                        backgroundColor: '#ffdc18',
                        borderBottomColor: '#ffdc18'
                    }}
                    back={() => navigate.goBack()}
                /> */}
                <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
                    <View style={[Style.cell, { backgroundColor: '#ffdc18' }]}>
                        <Image resizeMode='cover' style={[Style.cellIcon, { width: pTd(120), height: pTd(120), borderRadius: pTd(120 / 2) }]} source={require('../assets/images/robot-prod.png')} />
                        <View style={Style.cellBody}>
                            <View style={styles.header}>
                                <Text style={styles.title}>User</Text>
                            </View>
                            <Text style={styles.info}>Attending doctor</Text>
                            <Text style={styles.info}>Internal Medicine-NeurologyNational Hospital</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingLeft: pTd(30),
                        backgroundColor: '#fff',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: pTd(20),
                            borderBottomWidth: .5,
                            borderBottomColor: '#ececec'
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                flex: 1,
                                alignItems: 'center',
                                paddingVertical: pTd(5),
                                borderRightWidth: .5,
                                borderRightColor: '#ececec'
                            }}>
                                <Text style={{ fontSize: pTd(40), color: '#000', lineHeight: pTd(42), marginBottom: pTd(10) }}>12 years</Text>
                                <Text style={{ fontSize: pTd(20), color: '#c1c1c1', lineHeight: pTd(22), }}>of medical work</Text>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                flex: 1,
                                alignItems: 'center',
                                paddingVertical: pTd(5),
                                borderRightWidth: .5,
                                borderRightColor: '#ececec'
                            }}>
                                <Text style={{ fontSize: pTd(40), color: '#000', lineHeight: pTd(42), marginBottom: pTd(10) }}>499</Text>
                                <Text style={{ fontSize: pTd(20), color: '#c1c1c1', lineHeight: pTd(22), }}>patients one year</Text>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                flex: 1,
                                alignItems: 'center',
                                paddingVertical: pTd(5)
                            }}>
                                <Text style={{ fontSize: pTd(40), color: '#000', lineHeight: pTd(42), marginBottom: pTd(10) }}>4.9</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Ionicons name="md-star"
                                        size={pTd(32)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(32)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(32)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(32)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(32)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: pTd(20),
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Ionicons name="md-arrow-dropdown-circle"
                                size={pTd(34)}
                                style={{ color: "#444444", marginRight: pTd(10) }}
                                color=""
                            />
                            <Text style={{ fontSize: pTd(30), color: '#000', lineHeight: pTd(32), }}>Physician's Certification</Text>
                        </View>
                    </View>
                    <View style={[Style.cells, {}]}>
                        <View style={{
                            borderBottomWidth: .5,
                            borderBottomColor: '#ececec'
                        }}>
                            <Text style={{ fontSize: pTd(30), color: '#000', lineHeight: pTd(90), }}>Good at</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <View style={{
                                    paddingVertical: pTd(10),
                                    paddingHorizontal: pTd(30),
                                    borderWidth: 1,
                                    borderColor: '#f4f4f4',
                                    borderRadius: pTd(24),
                                    overflow: 'hidden',
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(26), color: '#ffdc18', lineHeight: pTd(28), }}>xxx</Text>
                                </View>
                                <View style={{
                                    paddingVertical: pTd(10),
                                    paddingHorizontal: pTd(30),
                                    borderWidth: 1,
                                    borderColor: '#f4f4f4',
                                    borderRadius: pTd(24),
                                    overflow: 'hidden',
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(26), color: '#ffdc18', lineHeight: pTd(28), }}>xxx</Text>
                                </View>
                                <View style={{
                                    paddingVertical: pTd(10),
                                    paddingHorizontal: pTd(30),
                                    borderWidth: 1,
                                    borderColor: '#f4f4f4',
                                    borderRadius: pTd(24),
                                    overflow: 'hidden',
                                    marginRight: pTd(30)
                                }}>
                                    <Text style={{ fontSize: pTd(26), color: '#000', lineHeight: pTd(28), }}>xxxxxx</Text>
                                </View>
                            </View>
                            <TextInput style={{ fontSize: pTd(26), color: '#000', lineHeight: pTd(36), textAlignVertical: 'top' }} />
                        </View>
                        <View style={{
                            borderBottomWidth: .5,
                            borderBottomColor: '#ececec'
                        }}>
                            <Text style={{ fontSize: pTd(30), color: '#000', lineHeight: pTd(90), }}>Personal profile</Text>
                            <TextInput multiline={true} style={{ height: pTd(180), fontSize: pTd(26), color: '#000', lineHeight: pTd(36), textAlignVertical: 'top' }} />
                        </View>
                        <View style={{
                            paddingVertical: pTd(30),
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: pTd(20), color: '#aeaeae', lineHeight: pTd(22), }}>more ></Text>
                        </View>
                    </View>
                    <View style={[Style.cells, {}]}>
                        <View style={{
                            borderBottomWidth: .5,
                            borderBottomColor: '#ececec'
                        }}>
                            <Text style={{ fontSize: pTd(30), color: '#000', lineHeight: pTd(90), }}>Patient evaluation</Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{ fontSize: pTd(30), color: '#61676F', lineHeight: pTd(40), }}>Anonymous user</Text>
                                    <Text style={{ fontSize: pTd(30), color: '#61676F', lineHeight: pTd(40), }}>XXXX-XX-XX 00:00</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: pTd(30)
                                }}>
                                    <Ionicons name="md-star"
                                        size={pTd(20)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(20)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(20)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(20)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                    <Ionicons name="md-star"
                                        size={pTd(20)}
                                        style={{ color: "#ff9800", paddingHorizontal: 1 }}
                                        color=""
                                    />
                                </View>
                            </View>
                            <Text style={{ fontSize: pTd(30), color: '#61676F', lineHeight: pTd(40), marginBottom: pTd(30) }}>XXXX-XX-XX</Text>
                        </View>
                        <View style={{
                            paddingVertical: pTd(30),
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: pTd(20), color: '#aeaeae', lineHeight: pTd(22), }}>more ></Text>
                        </View>
                    </View>
                    <View style={[Style.cells, {}]}>
                        <View style={{
                        }}>
                            <Text style={{ fontSize: pTd(30), color: '#000', lineHeight: pTd(90), }}>Patient evaluation</Text>
                        </View>
                        <View style={[Style.cell, Style.lineBottom, Style.lineTop]}>
                            <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                            <Text style={Style.cellText}>National Hospital</Text>
                            <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                        </View>
                        <View style={[Style.cell, Style.lineBottom,]}>
                            <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                            <Text style={Style.cellText}>Contact number</Text>
                            <Text style={Style.cellExtra}>XXXXXX </Text>
                            <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2 }} />
                        </View>
                        <View style={[Style.cell,]}>
                            <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                            <Text style={Style.cellText}>XXXXXXXXXXXXXXXXXXXX </Text>
                            <Ionicons name="ios-arrow-forward" size={pTd(30)} style={{ color: '#aeaeae', marginTop: 2, }} />
                        </View>
                    </View>
                    <View style={{ height: pTd(20) }}></View>
                </ScrollView>
                <View style={{
                    height: pTd(110),
                    backgroundColor: '#ffdc18',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: pTd(32), color: '#fff', lineHeight: pTd(110), textAlign: 'center' }}>Contact</Text>
                </View>
            </View>
        )
    }
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
}

export default InfoDetails

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: pTd(28),
        color: '#000',
        lineHeight: pTd(30),
        marginBottom: pTd(5),
        marginRight: pTd(10)
    },
    info: {
        fontSize: pTd(22),
        color: '#000',
        lineHeight: pTd(30),
        marginBottom: pTd(5)
    },
    good: {
        fontSize: pTd(22),
        color: '#000',
        lineHeight: pTd(24),
        marginBottom: pTd(10)
    },
    col: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    star: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starText: {
        fontSize: pTd(20),
        color: '#ff9800',
        lineHeight: pTd(22),
        marginLeft: pTd(10)
    },
    work: {
        borderRadius: pTd(18),
        height: pTd(36),
        borderWidth: 0.5,
        borderColor: '#28b8a1',
        paddingHorizontal: pTd(15)
    },
    workText: {
        lineHeight: pTd(34),
        fontSize: pTd(20),
        color: '#28b8a1',
    }

})

InfoDetails.navigationOptions = {
    title: ' ',
    // headerTintColor:'#ffdc18'
};


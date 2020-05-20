// 引入 react 依赖
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native';

import { pTd } from '../utils/utils';

// 引入专用组件
import { ScreenWidth, ScreenHeight } from '../utils/utils'

class Radio extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props)
    }

    render() {
        const { checked, children, onChange } = this.props
        return (
            <TouchableOpacity
                onPress={() => onChange ? onChange(true) : null}
            >
                <View style={styles.radio}>
                    <View style={[styles.radioIconBox, checked ? styles.radioIconBoxActive : {}]}>
                        <View style={[styles.radioIcon, checked ? styles.radioIconActive : {}]} />
                    </View>
                    <Text style={styles.radioText}>{children}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Radio

const styles = StyleSheet.create({
    radioText: {
        fontSize: pTd(36),
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioIconBox: {
        width: pTd(40),
        height: pTd(40),
        borderWidth: pTd(3),
        borderColor: '#ff9800',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: pTd(20),
        marginRight: pTd(20)
    },
    radioIconBoxActive: {
        borderColor: '#ff9800',
    },
    radioIcon: {
        width: pTd(20),
        height: pTd(20),
        backgroundColor: '#fff',
        borderRadius: pTd(20)
    },
    radioIconActive: {
        backgroundColor: '#ff9800',
    }
})

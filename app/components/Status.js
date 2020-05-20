// 引入 react 依赖
import React, { Component } from 'react';
import { Text, View, Platform, StatusBar } from 'react-native';

// 引入专用组件
import { ScreenWidth, ScreenHeight } from '../utils/utils'

class Status extends Component {
	static propTypes = {

	}

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const { backgroundColor, style, barStyle } = this.props
		let height = StatusBar.currentHeight || 0
		if (Platform.OS == 'ios') {
			height = 22
		}
		if (Platform.OS == 'ios' && ScreenWidth / ScreenHeight < 9 / 16) {
			height = 44
		}
		return (
			<View style={[{ height, backgroundColor: backgroundColor || '#fff' }, style]}>
				<StatusBar
					backgroundColor={backgroundColor || '#fff'}
					translucent={true}
					barStyle={barStyle || 'dark-content'}
				/>
			</View >
		)
	}
}

export default Status

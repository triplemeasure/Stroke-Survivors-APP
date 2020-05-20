// 引入 react 依赖
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

// antd 按需加载
import Ionicons from 'react-native-vector-icons/Ionicons';

class NavBar extends Component {

	constructor(props) {
		super(props)
		this.state = {
			theme: {
				color: '#000',
				extra: '#eee',
				backgroundColor: '#fff',
				borderColor: '#f4f4f4'
			},
			transparent: {
				color: '#fff',
				extra: '#eee',
				backgroundColor: 'transparent',
				borderColor: 'transparent'
			},
			dark: {
				color: '#fff',
				extra: '#eee',
				backgroundColor: '#000',
				borderColor: '#f4f4f4'

			},
			bright: {
				color: '#000',
				extra: '#eee',
				backgroundColor: '#fff',
				borderColor: '#f4f4f4'

			},
		}
	}

	componentWillMount() {
		this.getTheme()
	}

	getBnckType() {
		const { backType } = this.props
		// switch (backType) {
		// 	case 'dark':
		// 		// return require('../../static/images/icon-bank.png');
		// 	case 'bright':
		// 		// return require('../../static/images/icon-bank-white.png');
		// 	default:
		// 		// return require('../../static/images/icon-bank.png');
		// }
	}

	getBack() {
		const { back } = this.props
		const { theme } = this.state;
		console.log(back, 10)
		if (back) {
			return (
				<TouchableOpacity
					onPress={() => {
						back()
						// Actions.pop()
					}}
					style={[styles.icon, { marginRight: 20, padding: 5 }]}
				>
					<Ionicons name="md-arrow-back" size={30} color={theme.color} />
				</TouchableOpacity>
			)
		} else {
			return (
				<View style={[styles.icon, { marginRight: 20 }]}></View>
			)
		}
	}

	getExtra() {
		const { extra, extraStyle, extraOnPress } = this.props
		const { theme } = this.state;
		if (extra) {
			return (
				<View style={{
				}}>
					<TouchableOpacity
						onPress={() => { extraOnPress ? extraOnPress() : null }}
						style={{
							paddingRight: 15,
						}}>
						<Text allowFontScaling={false} style={[{ fontSize: 14, color: theme.color, lineHeight: 44, textAlign: 'right' }, extraStyle]}>{extra}</Text>
					</TouchableOpacity>
				</View>
			)
		} else {
			return (
				<View style={[styles.icon, { marginLeft: 20 }]}></View>
			)
		}
	}

	getTheme() {
		const { type } = this.props
		switch (type) {
			case 'dark':
				this.setState({
					theme: this.state.dark
				})
				return
			case 'bright':
				this.setState({
					theme: this.state.bright
				})
				return
			case 'transparent':
				this.setState({
					theme: this.state.transparent
				})
				return
			default:
				return
		}
	}

	render() {
		const { theme } = this.state;
		return (
			<View style={
				[
					styles.container,
					{
						backgroundColor: theme.backgroundColor,
						borderBottomColor: theme.borderColor
					},
					this.props.style
				]
			}>
				{this.getBack()}
				<View style={styles.headerTitle}>
					<Text allowFontScaling={false} style={[styles.headerTitleText, { color: theme.color }, this.props.titleStyle]}>{this.props.title}</Text>
				</View>
				{this.getExtra()}
			</View>
		)
	}
}

export default NavBar

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 44,
		zIndex: 100,
		borderBottomWidth: .5,
	},
	containerDark: {
		backgroundColor: '#fff'
	},
	positioning: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		width: 44,
		height: 54,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconItem: {
	},
	iconImg: {
		width: 18,
		height: 18
	},
	positioningText: {
		fontSize: 17,
		color: '#888888',
		marginLeft: 0,
	},
	headerIcon: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerSearch: {
		flex: 1,
		height: 36,
		paddingLeft: 0,
		marginRight: 15,
	},
	input: {
		flex: 1,
		fontSize: 14,
		height: 36,
		backgroundColor: '#EEEEEE',
		borderRadius: 3,
		borderWidth: 0,
		padding: 0,
		paddingLeft: 15,
		paddingRight: 15,
	},
	headerTitle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	headerTitleText: {
		fontSize: 16,
		lineHeight: 44,
		textAlign: 'center',
		color: '#000'
	},
	absolute: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	transparent: {
		backgroundColor: 'transparent',
	},
	white: {
		backgroundColor: 'transparent',
	}
});




import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import Style from '../styles/styles'

import Status from '../components/Status.js'
import NavBar from '../components/NavBar'

import { pTd } from '../utils/utils'

export default class MineScreen extends Component {

  static navigationOptions = {
    title: 'Mine',
  };

  static propTypes = {

  }

  constructor(props) {
    super(props)
    this.state = {
      userType: '',
      username:'',
    }
  }

  async componentDidMount() {
    let userType = await AsyncStorage.getItem('userType')
    let username = await AsyncStorage.getItem('username')
    this.setState({
      userType:userType,
      username:username,
    })
  }

  render() {
    const { userType } = this.state
    const { navigation } = this.props
    const { navigate } = navigation;

    console.log(this.props)
    return (
      <View style={Style.container}>
        <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
          <TouchableOpacity style={[Style.cells, { marginTop: 0 }]} onPress={() => navigate('Setting')}
            accessibilityLabel="Setting"
          >
            <View style={Style.cell}>
              <Image resizeMode='cover' style={[Style.cellIcon, { width: pTd(120), height: pTd(120), }]} source={require('../assets/images/robot-prod.png')} />
              <Text style={{marginLeft:pTd(30),marginTop:pTd(20),fontSize:pTd(45)}}>{this.state.username}</Text>
            </View>
          </TouchableOpacity>
          <View style={Style.cells}>
            <TouchableOpacity onPress={() => navigate('MyCollection')}
              accessibilityLabel="My collection"
            >
              <View style={[Style.cell, Style.lineBottom]}>
                <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                <Text style={Style.cellText}>My collection</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('MyPostings')}
              accessibilityLabel="My postings"
            >
              <View style={[Style.cell, Style.lineBottom]}>
                <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                <Text style={Style.cellText}>My Postings</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigate('MyFriends')}>
              <View style={[Style.cell, Style.lineBottom]}>
                <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                <Text style={Style.cellText}>My friends</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigate('MyMedicalTeam')}
              accessibilityLabel="My medical team"
            >
              <View style={Style.cell}>
                <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                <Text style={Style.cellText}>{userType != 'patient' ? 'My Patients' : 'My Medical Team'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={Style.cells}>
            <TouchableOpacity onPress={() => navigate('Feedback')}
              accessibilityLabel="Feedback"
            >
              <View style={Style.cell}>
                <Image resizeMode='cover' style={Style.cellIcon} source={require('../assets/images/robot-prod.png')} />
                <Text style={Style.cellText}>Feedback</Text>
              </View>
            </TouchableOpacity>
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


const styles = StyleSheet.create({


})


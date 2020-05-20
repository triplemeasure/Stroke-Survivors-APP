import React, { Component } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { pTd,url } from '../utils/utils';
import Search from '../components/Search'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [],
      userType: "",
      token:'',
      username:'',
    };
  }

  async componentDidMount() {
    const userType = await AsyncStorage.getItem('userType');
    const username = await AsyncStorage.getItem('username');
    const token = await AsyncStorage.getItem('token');
    this.setState({userType:userType,username: username,token: token });
    console.log('this.state ',this.state.userType,this.state.username,this.state.token);

  
    let args = "api/v1/articles?token=" + token
    console.log(args)
    fetch(url+args, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("articles", result)
        console.log("articles", result.data.lists)
        this.setState({resultList: this.state.resultList.concat(result.data.lists)})
        //this.setState({icon : result.data.icon})
        //this.setState({address : result.data.address})
        //少了一个duration  this.setState({})
    })
    .catch((error) => {
        console.error('Error:', error);
    })
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const onPressRightButtonFunc = params.openPublisher || function () { }
    return {
      title: 'Forum',
    }
  }

  _separator = () => {
    return (
      class Separator extends Component {
        render() {
          return (
            <View style={{
              height: pTd(10), backgroundColor: "#E6E7E8",
              // paddingTop:pTd(5),paddingBottom:pTd(5)
            }} />
          );
        }
      }
    );
  }


  changeZan(data) {
    let resultList = [...this.state.resultList]

    resultList.map((item, index) => {
      if (item.objectId == data.objectId) {
        item.isZan = !data.isZan
        if (!data.isZan) {
          Alert.alert('Reminder', 'Delete from my favorites successfully', [{ text: 'OK' }]);
          this.setState({
            follow: false
          })
        } else {
          Alert.alert('Reminder','Add to my favorites successfully', [{ text: 'OK' }]);
          this.setState({
            follow: true
          })
        }
      }
    })


    this.setState({
      resultList
    })
  }


  render() {
    const { resultList } = this.state
    return (
      
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SharePost")}
            accessibilityLabel="Share Post"
          >
            <View style={styles.top}>
              <View style={styles.topLeft}>
                <Image
                  source={require('../assets/images/questionMark.png')}
                  style={{ height: pTd(120), width: pTd(120) }}
                />
              </View>
              <View style={styles.topRight}>
                <Text style={{ fontSize: pTd(45) }}>Post</Text>
                <Text style={{ fontSize: pTd(5) }}></Text>
                <Text style={{ color: "gray", fontSize: pTd(24) }}>express your experience or confusion</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ height: pTd(15), backgroundColor: "#E6E7E8", marginTop: pTd(20) }}></View>

          <FlatList
            data={resultList}
            ItemSeparatorComponent={this._separator()}
            renderItem={({ item }) =>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Post",{item:item.id})}
                >
                  <View style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: pTd(25), }}>
                      <Text numberOfLines={1} style={styles.title}>{item.article_name}</Text>
                      <TouchableOpacity
                        onPress={() => this.changeZan(item)}
                      >
                        <Ionicons name={item.isZan ? "ios-heart" : "ios-heart-empty"} size={30} color={'rgb(254, 220, 24)'} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.content} numberOfLines={1}>{item.content}</Text>
                    <View style={{ flexDirection: "row", marginBottom: pTd(25) }}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("UserCard")}>
                        <Image source={require('../assets/images/robot-dev.png')} style={styles.icon} />
                      </TouchableOpacity>
                      <Text style={styles.posterID} numberOfLines={1}>{item.created_by}</Text>
                      <View style={styles.commentIntro}>
                        <Text style={styles.commentCount}>{item.commentCount}</Text>
                        {/* <Image source={require('../assets/images/questionMark.png')} style={styles.commentPic} /> */}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            }
          >
          </FlatList>
        </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  top: {
    height: pTd(120),
    flexDirection: "row",
    marginTop: pTd(20),
  },
  topLeft: {
    marginLeft: pTd(50),
    width: pTd(120),
    height: pTd(120),
  },
  topRight: {
    height: pTd(120),
    width: pTd(420),
    marginLeft: pTd(10),
  },
  refresh: {
    height: pTd(70),
    flexDirection: "row",
    flex: 1,
    // alignItems: "flex-end",
    justifyContent: 'flex-end',
    paddingVertical: pTd(10),
    marginBottom: pTd(10),
  },
  title: {
    fontSize: pTd(35),
    padding: pTd(25),
  },
  content: {
    paddingLeft: pTd(35),
    color: "gray",
    fontSize: pTd(30),
    paddingBottom: pTd(25),
    paddingRight: pTd(35),
  },
  icon: {
    width: pTd(60),
    height: pTd(60),
    marginLeft: pTd(20),
    backgroundColor: "pink",
    borderRadius: 50,
    borderWidth: pTd(1),
    // borderColor:"rgb(254, 220, 24)",
    borderColor: "#E6E7E8",
  },
  posterID: {
    fontSize: pTd(33),
    color: "gray",
    marginLeft: pTd(20),
    marginTop: pTd(20)
  },
  commentIntro: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-end',
    paddingRight: pTd(25),
  },
  commentCount: {
    fontSize: pTd(30),
    color: "gray",
    paddingTop: pTd(20),
  },
  commentPic: {
    height: pTd(80),
    width: pTd(80),
    // backgroundColor:"pink",
    marginLeft: pTd(10),
  }
});



// module.exports = PostStack;
// exports = PostStack;

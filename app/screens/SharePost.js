import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    AppRegistry,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { pTd,url } from '../utils/utils';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            subject: '',
            content: '',
            token:'',
        };
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('username');
        const token = await AsyncStorage.getItem('token');
        this.setState({username: username,token: token });
        console.log('this.state ',this.state.username,this.state.token);
    }

    addArticle() {
        console.log(this.state.subject);
        console.log(this.state.content);
        console.log(this.state.username);
        
        let args = "api/v1/article?token=" + this.state.token + "&article_name=" + this.state.subject + "&content=" + this.state.content +"&created_by=" + this.state.username
        console.log(args);
        fetch(url+args, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("add article", result)
            if(result.code==200){
                Alert.alert('Reminder', 'Post successfully', [{ text: 'OK' }]);
            }else{
                Alert.alert('Reminder', 'Post failed', [{ text: 'OK' }]);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
      }
    


    render() {
        return (
            //   <ScrollView>   
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.container}
                // enabled
                >
                    <View style={styles.top}>
                    <TouchableOpacity
                        onPress={() => {
                            this.addArticle()
                            this.props.navigation.pop();
                                        
                        }} 
                        style={styles.button}
                        accessibilityLabel="Post"
                    >
                    <Text style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Post</Text>
                    </TouchableOpacity>                       
                    </View>

                    <View style={{ height: pTd(5), backgroundColor: "#E6E7E8" }}></View>

                    <TextInput
                        autoCapitalize="none"
                        placeholder="Input your subject"
                        style={styles.inputSubject}
                        // onChangeText = {text => onChangeText(text)}
                        onChangeText={(text) => {
                            this.setState({ subject: text })
                        }}
                    // value = {value}
                    />
                    <View style={{ height: pTd(2), backgroundColor: "#E6E7E8" }}></View>

                    <TextInput
                        autoCapitalize="none"
                        placeholder="Input your description"
                        style={styles.inputContent}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({ content: text })
                        }}
                    />
                </KeyboardAvoidingView>
            </View>
            // </KeyboardAvoidingView>
            //   </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        // flex:1,
        flexDirection: "row",
        padding: pTd(30),
        paddingBottom: pTd(20)
    },
    right: {
        flex: 1,
        // justifyContent:"flex-end",
        alignItems: "flex-end",
    },
    cancel: {
        color: "gray",
        fontSize: pTd(40)
    },
    post: {
        color: "gray",
        fontSize: pTd(40),
    },
    inputSubject: {
        height: pTd(100),
        fontSize: pTd(45),
        fontWeight: 'bold',
        paddingLeft: pTd(30),
        marginTop: pTd(10),
        marginBottom: pTd(20),
        paddingRight: pTd(30)
    },
    inputContent: {
        fontSize: pTd(40),
        paddingLeft: pTd(30),
        paddingRight: pTd(30),
        marginTop: pTd(10),
    },
    button: {
        flex: 1,
        marginLeft:pTd(300),
        //alignItems: "flex-end",
        justifyContent: 'center',
        textAlign: 'center',
        height: pTd(100),
        //width: pTd(100),
        borderColor: "#befffe",
        // marginLeft:10,
        borderWidth: pTd(1),
        borderRadius: pTd(20),
        backgroundColor: "#42c4c6",
    },
})





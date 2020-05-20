import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert } from 'react-native';
import { pTd, url } from '../utils/utils';
import { Picker,Provider } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import Radio from '../components/Radio'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token:null,
            firstName: null,
            lastName: null,
            username:null,
            password:null,
            confirmPassword: null,
            visible: false,
            active: 0,
            patient: true,
            doctor: false,
            addressValue: '',
            addressText: 'Address',
            data: [
                { value: '1', label: 'China' },
                { value: '2', label: 'New Zealand' },
                { value: '3', label: 'America' },
            ],
            durationValue: '',
            durationText: 'Duration',
            data2: [
                { value: '1', label: '1 year' },
                { value: '2', label: '2 years' },
                { value: '3', label: '3 years' },
                { value: '4', label: '4 years' },
                { value: '5', label: '5 years' },
                { value: '6', label: '6 years' },
                { value: '7', label: '7 years' },
                { value: '8', label: '8 years' },
                { value: '9', label: '9 years' },
                { value: '10', label: '10 years' },
                { value: '11', label: '11 years' },
                { value: '12', label: '12 years' },
                { value: '13', label: '13 years' },
                { value: '14', label: '14 years' },
                { value: '15', label: '15 years' },
                { value: '16', label: '16 years' },
                { value: '17', label: '17 years' },
                { value: '18', label: '18 years' },
                { value: '19', label: '19 years' },
                { value: '20', label: '20 years or more' },
            ],
        }
    }

    static navigationOptions = {
        title: 'Login',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    async componentDidMount() { 
        
        try {
            await AsyncStorage.setItem('userType', 'patient');
            console.log("default userType patient");
        }catch(e){}
        
    }

    async storeLoginInfo() {
        try {
            await AsyncStorage.setItem('username', this.state.username);
            console.log("stored", this.state.username);
            await AsyncStorage.setItem('token', this.state.token);
            console.log("stored", this.state.token);
        } catch (e) {
          // saving error
        }
    }

    async storeUserType(value) {
        try {
          await AsyncStorage.setItem('userType', value);
          console.log("userType changed to", value);
        } catch (e) {
          // saving error
        }
    }

    async storeRegisterInfo() {
        try {
            await AsyncStorage.setItem('username', this.state.firstName+this.state.lastName);
            console.log("stored", this.state.firstName+this.state.lastName);
            await AsyncStorage.setItem('address', this.state.addressText);
            console.log("stored", this.state.addressText);
            await AsyncStorage.setItem('duration', this.state.durationText);
            console.log("stored", this.state.durationText);
            await AsyncStorage.setItem('password', this.state.password);
            console.log("stored", this.state.password);
            this.props.navigation.navigate("Photo");
        } catch (e) {
          // saving error
        }
    }

    handleChangeTab(active) {
        this.setState({
            active
        })
    }

    login(username,password){
        let args = "auth?username=" + username + "&password=" + password

        fetch(url + args, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("login",result)
            this.setState({token: result.data.token})
            if(result.code==200){
                this.props.navigation.navigate("Home");
                this.storeLoginInfo();
            }else{
                Alert.alert('Reminder', 'Wrong username or password', [{ text: 'OK' }]);
            }
        })
        .catch((error) =>{
            console.error('Error:', error)
        })
    }

    render() {
        const { active, patient, doctor, addressValue, addressText, data, visible, durationValue, durationText, data2} = this.state
        return (
            <Provider>
            <ScrollView style={styles.container}>
                <View style={{ marginTop: 10 }}>
                    <View style={[styles.tabs]}>
                        <TouchableOpacity
                            style={[styles.tab, active == 0 ? styles.activeTab : {}]}
                            onPress={() => this.handleChangeTab(0)}
                            accessibilityLabel="Login"
                        >
                            <Text style={[styles.tabText, active == 0 ? styles.activeTabText : {}]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, active == 1 ? styles.activeTab : {}]}
                            onPress={() => this.handleChangeTab(1)}
                            accessibilityLabel="Register"
                        >
                            <Text style={[styles.tabText, active == 1 ? styles.activeTabText : {}]}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {active == 0 && (
                    <View style={{}}>
                        <View style={{}}>
                            <TextInput onChangeText={(text) => this.setState({username: text})} style={styles.InputBox}
                                placeholder="Username"
                                editable={true}
                            />
                            <TextInput onChangeText={(text) => this.setState({password: text})} style={styles.InputBox}
                                placeholder="Password"
                                editable={true}
                                password={true}
                                secureTextEntry={true}
                            />
                            <View style={styles.info}>
                                <Radio checked={patient} onChange={(patient) => {
                                    this.setState({ patient, doctor: !patient })
                                    this.storeUserType("patient");
                                }}>Patient</Radio>
                                <Radio checked={doctor} onChange={(doctor) => {
                                    this.setState({ patient: !doctor, doctor })
                                    //await AsyncStorage.setItem('userType', 'doctor');
                                    this.storeUserType("doctor");
                                }}>Doctor</Radio>
                            </View>
                        </View>
                        <View style={{ marginTop: pTd(30) }}>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => this.login(this.state.username,this.state.password)} 
                                    style={styles.button}
                                    accessibilityLabel="Confirm"
                                >
                                    <Text
                                        style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginTop: pTd(20) }}>
                            <TouchableOpacity
                                onPress={async () => {
                                    this.props.navigation.navigate("FaceLogin")
                                }} 
                                style={styles.button}
                                accessibilityLabel="Face Recognition Login"
                            >
                                <Text style={{ color: 'white', fontSize: pTd(40), textAlign: "center" }}>Face Recognition Login</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{ marginTop: pTd(30) }}
                            onPress={() => this.props.navigation.navigate("SecurityQuestionLogin")}
                            accessibilityLabel="Forget password click me"
                        >
                            <Text style={{ fontSize: pTd(36), color: '#61676F', textAlign: 'center' }}>
                                <Text style={{ marginRight: 20 }}>Forget Password</Text>
                                <Text style={{ color: '#3A6FA7', }}>  click me</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {active == 1 && (
                    <View style={{}}>
                        <View style={{}}>
                            <TextInput
                                style={styles.InputBox}
                                placeholder="First Name"
                                editable={true}
                                onChangeText={(text) => {
                                    this.state.firstName = text
                                }}
                            />
                            <TextInput
                                style={styles.InputBox}
                                placeholder="Last Name"
                                editable={true}
                                password={true}
                                onChangeText={(text) => {
                                    this.state.lastName = text
                                }}
                            />
                            <Picker
                                okText={"OK"}
                                dismissText={"Cancel"}
                                data={data}
                                cols={1}
                                value={addressValue}
                                onChange={(value, next) => {
                                    console.log(value, next)
                                    data.map((item, index) => {
                                        if (item.value == value) {
                                            this.setState({
                                                addressText: item.label
                                            })
                                        }
                                    })
                                    this.setState({
                                        addressValue: value
                                    })
                                }}
                                indicatorStyle={{ height: pTd(60) }}
                            >
                                <TouchableOpacity style={styles.InputBox} >
                                    <View style={styles.Inputstyle}>
                                        <Text style={styles.InputText}>{addressText}</Text>
                                    </View>
                                    <View style={{}}>
                                        <Ionicons
                                            name={"md-arrow-dropdown"}
                                            size={pTd(60)}
                                            style={{}}
                                            color={"#000"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                            <Picker
                                okText={"OK"}
                                dismissText={"Cancel"}
                                data={data2}
                                cols={1}
                                value={durationValue}
                                onChange={(value, next) => {
                                    console.log(value, next)
                                    data2.map((item, index) => {
                                        if (item.value == value) {
                                            this.setState({
                                                durationText: item.label
                                            })
                                        }
                                    })
                                    this.setState({
                                        durationValue: value
                                    })
                                }}
                                indicatorStyle={{ height: pTd(60) }}
                            >
                                <TouchableOpacity style={styles.InputBox} >
                                    <View style={styles.Inputstyle}>
                                        <Text style={styles.InputText}>{durationText}</Text>
                                    </View>
                                    <View style={{}}>
                                        <Ionicons
                                            name={"md-arrow-dropdown"}
                                            size={pTd(60)}
                                            style={{}}
                                            color={"#000"}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </Picker>
                            <TextInput style={styles.InputBox}
                                placeholder="Password"
                                editable={true}
                                password={true}
                                secureTextEntry={true}
                                accessibilityLabel="Password"
                                onChangeText={(text) => {
                                    this.state.password = text
                                }}
                            />
                            <TextInput style={styles.InputBox}
                                placeholder="Confirm Password"
                                editable={true}
                                password={true}
                                secureTextEntry={true}
                                accessibilityLabel="Confirm password"
                                onChangeText={(text) => {
                                    this.state.confirmPassword = text
                                }}
                            />
                        </View>
                        <View style={{ marginTop: pTd(50),marginBottom: pTd(50) }}>
                            <View style={{}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.firstName == null || this.state.lastName == null) {
                                            Alert.alert('Error', 'Name cannot be empty', [{ text: 'OK' }]);
                                            return
                                        }
                                        if (this.state.password != this.state.confirmPassword) {
                                            Alert.alert('Error', 'Inconsistent password', [{ text: 'OK' }]);
                                            return
                                        }
                                        this.storeRegisterInfo();
                                        
                                    }} 
                                    style={styles.button}
                                    accessibilityLabel="Next"
                                >
                                    <Text
                                        style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                )}
            </ScrollView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: pTd(60),
        flex: 1,
        paddingTop: pTd(30)
    },
    InputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: pTd(25),
        textAlign: 'center',
        height: pTd(100),
        borderColor: "#ff9800",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: pTd(40),
        paddingHorizontal: pTd(30)
    },
    Inputstyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    tab: {
        flex: 1
    },
    activeTab: {
        borderBottomColor: '#ff9800',
        borderBottomWidth: pTd(8)
    },
    tabText: {
        fontSize: pTd(60),
        lineHeight: pTd(90),
        textAlign: 'center'
    },
    activeTabText: {
        color: '#ff9800'
    },
    button: {
        justifyContent: 'center',
        textAlign: 'center',
        height: pTd(100),
        borderColor: "#befffe",
        // marginLeft:10,
        borderWidth: pTd(1),
        borderRadius: pTd(20),
        backgroundColor: "#42c4c6",
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: pTd(30)
    },
    infoText: {
        fontSize: pTd(36),
    },
    InputText: {
        flex: 1,
        fontSize: pTd(36),
        color: '#61676F',
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


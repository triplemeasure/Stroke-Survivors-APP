import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert, AsyncStorage, TouchableOpacityBase, Modal, Animated } from 'react-native';
import { pTd, ScreenWidth ,url} from '../utils/utils';
import { RNCamera } from 'react-native-camera';
import { Picker,Provider } from '@ant-design/react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Radio from '../components/Radio'

export default class Photo extends Component {

    constructor(props) {
        super(props)
        this.state={
            username:"",
            faceToken:'',
            token:"",
        }
    }

    static navigationOptions = {
        title: 'Face Recognition Login',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: pTd(42),
        },
    };

    

    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true, doNotSave:true};
          const data = await this.camera.takePictureAsync(options);
          //console.log(data);
          this.compareFace(data.base64);

        }
    };

    compareFace(photo){
        let args1 = "getFaceToken/" + this.state.username
        console.log(args1)
        fetch(url + args1, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("face token",result)
            console.log("face token",result.data.face_picture)
            this.setState({faceToken:result.data.face_picture})
            let faceToken = this.state.faceToken;
            console.log(faceToken);
            let url_face = "https://api-cn.faceplusplus.com/facepp/v3/compare";
            let formData = new FormData();
            formData.append("api_key","cp3CEAl0wi89b6GVu5m4qoXOchjknsuB");
            formData.append("api_secret","7G2uT34x9T7vWaSlEj7wJrDf58d-WRob");
            formData.append("face_token1", faceToken);
            formData.append('image_base64_2', photo);
            fetch(url_face , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
            })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                console.log(result.confidence);
                if(result.confidence>70){
                    let args2 = "authF?username="+ this.state.username
                    console.log(args2)
                    fetch(url+args2, {
                        method: 'GET'
                    })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result.data.token);
                        this.setState({token:result.data.token});
                        this.storeToken();
                        console.log(result.code);
                        if(result.code==200){
                            this.props.navigation.navigate("Home");
                        }
                    })
                }else{
                    Alert.alert('Error', 'Sorry, can not recognize your face!', [{ text: 'OK' }]);
                }
            }).catch(error)
        })
        .catch((error) => {
            
        })
    }

    async storeToken(){
        try {
            await AsyncStorage.setItem('token', this.state.token);
            await AsyncStorage.setItem('token', this.state.username);
            console.log("stored", this.state.token,this.state.username);
        }catch (e) {}
    }
    


    render() {
        //const { checked, uri } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{ marginVertical: pTd(30) }}>
                    <View style={[styles.tabs]}>
                        <View
                            style={[styles.tab]}
                        >
                            <TextInput
                                style={styles.InputBox}
                                placeholder="Enter my username"
                                editable={true}
                                onChangeText={(text) => {
                                    this.state.username = text
                                }}
                            />
                            <Text style={[styles.tabText]}
                                accessibilityLabel="Please face the camera."
                            >Please face the camera.</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: ScreenWidth - pTd(120), height: ScreenWidth - pTd(120), }}>
                    <View style={{ width: ScreenWidth - pTd(120), height: ScreenWidth - pTd(120), borderRadius: (ScreenWidth - pTd(120)) / 2, backgroundColor: '#ccc', overflow: 'hidden' }}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.front}
                        //flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                        />
                    </View>
                </View>
                
                    <View style={{ marginTop: pTd(30), marginBottom: pTd(30) }}>
                        <View style={{}}>
                            <TouchableOpacity
                                onPress={async () => {
                                    
                                    this.takePicture();

                                }} 
                                style={styles.button}
                                accessibilityLabel="Confirm"
                            >
                                <Text style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                <View style={{ marginTop: pTd(5), marginBottom: pTd(50) }}>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: pTd(60),
        flex: 1,
        //paddingTop: pTd(30)
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
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: pTd(10)
    },
    tab: {
        flex: 1
    },
    tabText: {
        fontSize: pTd(40),
        lineHeight: pTd(60),
        textAlign: 'center'
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
        marginBottom: pTd(30),
        marginTop: pTd(50),
        alignItems: 'center',
    },
    preview:{
        //flex:1,
        //marginLeft: pTd(20),
        //marginTop: pTd(80),
        width:pTd(500),
        height:pTd(500)
    },
})


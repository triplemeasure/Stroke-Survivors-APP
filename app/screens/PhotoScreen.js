import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, Alert,TouchableOpacityBase, Modal, Animated } from 'react-native';
import { pTd, ScreenWidth } from '../utils/utils';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

export default class PhotoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faceToken:null
        }
        
    }
    
    static navigationOptions = {
        title: 'Face Photo',
        headerStyle: {
            height: 90
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 45
        },
    };

    takePicture = async() => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true, doNotSave:true};
          const data = await this.camera.takePictureAsync(options);
          //console.log(data);
          this.getFaceToken(data.base64);
          //this.getGaze(data.base64);
        }
    };

    getFaceToken(photo){
        let url_face = "https://api-cn.faceplusplus.com/facepp/v3/detect";
        let formData = new FormData();
        formData.append("api_key","cp3CEAl0wi89b6GVu5m4qoXOchjknsuB");
        formData.append("api_secret","7G2uT34x9T7vWaSlEj7wJrDf58d-WRob");
        formData.append("return_landmark", "1");
        formData.append('image_base64', photo);
        console.log('111');

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
            console.log(result.faces[0].face_token);
            this.setState({faceToken:result.faces[0].face_token});
            console.log(this.state.faceToken);
            this.storeFaceToken();
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    async storeFaceToken(){
        try {
            await AsyncStorage.setItem('faceToken', this.state.faceToken);
            console.log("stored", this.state.faceToken);
        }catch (e) {}

    }


    render() {
        //const { checked, uri } = this.state
        return (
            <ScrollView style={styles.container}>
                <View style={{}}>
                    <View style={[styles.tabs]}>
                        <View
                            style={[styles.tab]}
                        >
                            <Text style={[styles.tabText]}
                                accessibilityLabel="Take a photo of your face so that you can log in using face recognition."
                            >Take a photo of your face so that you can log in using face recognition.</Text>
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
                    <View style={{ marginTop: pTd(40), marginBottom: pTd(50) }}>
                        <View style={{}}>
                            <TouchableOpacity
                                onPress={async () => {
                                    this.takePicture();
                                    this.props.navigation.navigate("UserType")
                                    
                                    

                                    // if (this.camera) {
                                    //     let photo = await this.camera.takePictureAsync();
                                    //     console.log(photo)
                                    //     this.setState({
                                    //         isShowCamera: false,
                                    //         uri: photo.uri
                                    //     })
                                    // }
                                }} 
                                style={styles.button}
                                accessibilityLabel="Take a photo"
                            >
                                <Text style={{ color: 'white', fontSize: 30, textAlign: "center" }}>Take a photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: pTd(60),
        flex: 1,
        paddingTop: pTd(30)
    },
    // InputBox: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginTop: pTd(50),
    //     textAlign: 'center',
    //     height: pTd(100),
    //     borderColor: "#ff9800",
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     fontSize: pTd(40),
    //     paddingHorizontal: pTd(30)
    // },
    // Inputstyle: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // InputText: {
    //     flex: 1,
    //     fontSize: pTd(36),
    //     color: '#61676F',
    // },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
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
    // info: {
    //     marginBottom: pTd(30),
    //     marginTop: pTd(50),
    //     alignItems: 'center',
    // },
    preview:{
        //flex:1,
        //marginLeft: pTd(20),
        //marginTop: pTd(80),
        width:pTd(500),
        height:pTd(500)
    },
})


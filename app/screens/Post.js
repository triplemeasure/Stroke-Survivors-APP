import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, FlatList, View, Image, Button, Alert, SafeAreaView, ScrollView, TouchableOpacity,InteractionManager,Animated } from 'react-native';
import { pTd,url } from '../utils/utils';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      live: false,
      down:0,
      gaze:0,
      lastGaze:0,
      time:'',
      subject:'',
      content: '',
      author:'',
      article_id: '',
      username: '',
      token:'',
      myComment: '',
      commentList: [],
    }
  }

  async componentDidMount() {
    const article_id = this.props.navigation.getParam('item');
    const token = await AsyncStorage.getItem('token');
    const username = await AsyncStorage.getItem('username');
    this.setState({article_id:article_id,token:token,username:username});
    //console.log(article_id,"hdacjdc");
    let args = "api/v1/articles/" + article_id +"?token="+token
    console.log(args)
    fetch(url+args, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("articles", result);
        // console.log(result.data.article_name);
        // console.log(result.data.created_by);
        // console.log(result.data.created_at);
        // console.log(result.data.content);
        this.setState({subject:result.data.article_name,content:result.data.content,author:result.data.created_by,time:result.data.created_at});
    })
    .catch((error) => {
        console.error('Error:', error);
    })

    let args2 = "api/v1/comments?article_id=" + article_id +"&token="+token
    console.log("args2",args2)

    fetch(url+args2, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("comments", result);
        console.log("comments", result.data.lists)
        this.setState({commentList: result.data.lists})
        // console.log(result.data.content);
        // console.log(result.data.created_by);
        // console.log(result.data.created_at);
        //this.setState({content_c:result.data.content,author_c:result.data.created_by,time:result.data.created_at});

    })
    .catch((error) => {
        console.error('Error:', error);
    })
  }

  addComment(){
    let args3 = "api/v1/comment?article_id=" + this.state.article_id + "&created_by="+ this.state.username + "&content="+this.state.myComment+"&token="+this.state.token
    console.log("args3",args3);
    fetch(url+args3, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("comments", result);
        if(result.code==200){
          Alert.alert('Reminder', 'Comment successfully ', [{ text: 'OK' }]);
          this.props.navigation.pop();
        }
        
    })
    .catch((error) => {
        console.error('Error:', error);
    })

  }

  componentWillUnmount()
  {
    this.timer1 && clearTimeout(this.timer1);
    this.timer2 && clearTimeout(this.timer2);

  }

  autoOffset(){
    this.timer2 = setInterval(()=>{
      this.state.down = this.state.down + pTd(100);
      this.scrollview.scrollTo({x:0, y:this.state.down, animated:true});
      console.log("这张照片的gaze比上一张大，开始下移");
    },1000)
  }

  eyeTracking(){
    this.timer1 = setInterval(()=>{
      clearTimeout(this.timer2);
      this.takePicture();
      console.log("这张照片的gaze是",this.state.gaze,"而上一张的gaze是", this.state.lastGaze);

      if(this.state.gaze > this.state.lastGaze){
        console.log("这张照片的gaze比上一张大");
        this.autoOffset();
      }else{
        console.log("这张照片的gaze比上一张小，不动");
      }
      this.state.lastGaze = this.state.gaze;
      console.log("这张照片的gaze变成了lastGaze",this.state.lastGaze);
      
    },3000)
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, doNotSave:true};
      const data = await this.camera.takePictureAsync(options);
      this.getGaze(data.base64);
    }
  };

  getGaze(photo){
    let url = "https://api-cn.faceplusplus.com/facepp/v3/detect";
    let formData = new FormData();
    formData.append("api_key","cp3CEAl0wi89b6GVu5m4qoXOchjknsuB");
    formData.append("api_secret","7G2uT34x9T7vWaSlEj7wJrDf58d-WRob");
    formData.append("return_landmark", "1");
    formData.append("return_attributes", "eyegaze");
    formData.append("image_base64", photo);

    fetch(url , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
      })
      .then((response) => response.json())
      .then((result) => {
        const radius = result.faces[0].face_rectangle.width;
        const Dy1 = result.faces[0].attributes.eyegaze.left_eye_gaze.vector_y_component;
        const Dy2 = result.faces[0].attributes.eyegaze.right_eye_gaze.vector_y_component;
        const Dy = (Dy1 + Dy2) / 2;
        const Oy  = (result.faces[0].landmark.left_eye_center.y + result.faces[0].landmark.right_eye_center.y) / 2 - result.faces[0].face_rectangle.top;
        this.state.gaze = (Oy + radius * Dy) / radius ;
        console.log("这张照片计算出的gaze", this.state.gaze);
      })
      .catch((error) => {
        //console.error('Error:', error);
      })
  }

  render() {
    const { result, live } = this.state
    return (
      <ScrollView ref={(ref) => this.scrollview = ref} style={styles.container} >

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.eyeTracking();
            }}>
          <Text style={{ color:'pink', fontSize: pTd(35)}}>Use eye-tracking</Text>
        </TouchableOpacity>

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
        /></View>

        <Text style={styles.title}>{this.state.subject}</Text>
        <View style={{ flexDirection: 'row', alignItems: "center", paddingRight: 10 }}>
          <Image source={require('../assets/images/dh.jpg')} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.user_ID}>{this.state.author}</Text>
            <Text style={styles.date}>{this.state.time}</Text>
          </View>
          {
            live ?
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Reminder','Unfollow successfully', [{ text: 'OK' }]);
                  this.setState({
                    live: !live
                  })

                }}
                style={{ paddingVertical: pTd(10), paddingHorizontal: pTd(20), borderRadius: pTd(25), backgroundColor: '#ff9800', }}
                accessibilityLabel=" "
              >
                <Text style={{ fontSize: pTd(28), color: '#fff', lineHeight: pTd(30), opacity: live ? .5 : 1 }} accessibilityLabel="Follow" >Follow</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                onPress={() => {
                  this.setState({ live: !live })
                  Alert.alert('Reminder','Follow successfully', [{ text: 'OK' }]);
                }}
                style={{ paddingVertical: pTd(10), paddingHorizontal: pTd(20), borderRadius: pTd(25), backgroundColor: '#ff9800', }}
                accessibilityLabel=" "
              >
                <Text style={{ fontSize: pTd(28), color: '#fff', lineHeight: pTd(30), opacity: live ? .5 : 1 }} accessibilityLabel="Follow" >Follow</Text>
              </TouchableOpacity>

          }

        </View>
        
        <Text style={styles.content}>{this.state.content}</Text>
        
        <View style={{ height: pTd(20), backgroundColor: 'rgba(0,0,0,0.05)' }} />
        <Text style={styles.comments}>Comments</Text>

        <FlatList
          data={this.state.commentList}
          renderItem={({ item }) =>
            <View style={{ marginVertical: pTd(20) }}>
              <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <Image source={require('../assets/images/hz.jpg')} style={styles.icon} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.user_ID}>{item.created_by}</Text>
                  <Text style={styles.date}>{item.created_at}</Text>
                </View>
              </View>
            <Text style={styles.content}>{item.content}</Text>
            </View>}
        />
        <View style={{ borderTopWidth: 1, borderTopColor: '#ccc' }}>

          <TextInput onChangeText={(text) => this.setState({myComment: text})} 
            style={{ height: pTd(300), fontSize: pTd(50), color: '#61676F', textAlignVertical: 'top', padding: 15 }} 
            placeholder="comments" multiline></TextInput>
          <TouchableOpacity onPress={() => {
            this.addComment();
          }}>
            <View style={{ padding: pTd(50), alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#ccc' }}>
              <Text style={{ fontSize: pTd(50), color: '#61676F', lineHeight: pTd(60), borderWidth: 1, borderColor: '#ccc', padding: pTd(30), borderRadius: pTd(20) }}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: pTd(54),
    fontWeight: 'bold',
    marginTop: pTd(15),
    marginHorizontal: pTd(30),
    marginVertical: pTd(20)
  },
  icon: {
    width: pTd(100),
    height: pTd(100),
    marginHorizontal: pTd(20),
    borderRadius: pTd(50),
    overflow: 'hidden'
  },
  user_ID: {
    fontSize: pTd(40),
    fontWeight: 'bold',
  },
  date: {
    flex: 1,
    fontSize: pTd(30),
    color: "grey",
    justifyContent: 'flex-end',
    textAlign: 'left',
  },
  content: {
    fontSize: pTd(36),
    marginVertical: pTd(20),
    marginHorizontal: pTd(20),
  },
  comments: {
    fontSize: pTd(35),
    fontWeight: 'bold',
    color: "grey",
    marginTop: pTd(15),
    marginHorizontal: pTd(20),
    marginVertical: pTd(30)
  },

  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  button:{
    height:pTd(50),
    marginLeft: pTd(260),
  },

  preview:{
    //flex:1,
    marginLeft: pTd(15),
    marginTop: pTd(10),
    width:pTd(30),
    height:pTd(30)
  },
});

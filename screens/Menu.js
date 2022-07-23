import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from './colors';
import {useEffect, useState} from 'react/cjs/react.development';
import Btn from '../components/Btn';
import ImagePicker from 'react-native-image-crop-picker';

const Menu = ({navigation}) => {
  const [image, setImage] = useState([]);
  const [chosen, setChosen] = useState(false);
  const [loading, setLoding] = useState(true);
  const [clients, setClients] = useState();
  const [value, setValue] = useState({name: '', platenumber: '', code: ''});
  const [db, setDb] = useState({name: '', platenumber: '', code: ''});
  useEffect(() => {
    getClients();
  }, []);
  const getClients = async () => {
    AsyncStorage.getItem('clients').then(value => {
      var data = JSON.parse(value);
      setClients(data);
    });
  };
  const openGallery = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      setImage(image);
      setChosen(true);
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      saveToPhotos :true,
      includeBase64:true,
    }).then(image => {
      setImage(image);
      setChosen(true);
    });
  };
  const filter = json => {
    try {
      var value = clients.filter(function (element) {
        return element.platenumber == json.platenumber;
      });
      setDb({
        name: value[0].Name,
        platenumber: json.platenumber,
        code: value[0].Code,
      });
      console.log(db);
    } catch (error) {
      console.log(error);
    }
  };

  const sendImg = image => {
    // const photoData = new FormData();
    //   photoData.append('image', {uri:image.path,type:image.mime,data:image.data,fileName:'1.jpg'});
    //   console.log(photoData)
    fetch('http://192.168.43.207:3000/post', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({image: {image}}),
    })
      .then(resp => resp.json())
      .then(json => {
        // setValue({ name: 'unknown', platenumber: json.platenumber,code:"aa" });
        setLoding(false);
        navigation.navigate('Home');
      })
      .catch(err => console.error(err));
  };

  return chosen === true ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.PRIMARY,
      }}>
      <Image source={{uri: image.path}} style={styles.image} />
      <View style={{flex: 1}}>
        <View style={styles.texture}></View>
        <View style={styles.texturr}></View>
        <Text style={[styles.text, {marginBottom: 10}]}>
          Owner :{' '}
          {loading === true ? <ActivityIndicator /> : db.name || value.name}
        </Text>
        <Text style={[styles.text, {marginBottom: 10}]}>
          Plate number :{' '}
          {loading === true ? <ActivityIndicator /> : value.platenumber}
        </Text>
        <Text style={[styles.text, {marginBottom: 10}]}>
          Code :{' '}
          {loading === true ? <ActivityIndicator /> : db.code || value.code}
        </Text>
      </View>
      <Btn
        styles={[styles.btn, {with: 100, height: 100}]}
        text={styles.btext}
        onPress={() => {
          fetch('http://192.168.43.207:3000/post', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({image: {image}}),
          })
            .then(resp => resp.json())
            .then(json => {
              filter(json);
              setValue({
                name: db.name || 'unknown',
                platenumber: json.platenumber,
                code: db.code || '',
              });
              setLoding(false);
            })
            .catch(err => console.error(err));
        }}>
        Confirm
      </Btn>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.texture}></View>
      <View style={styles.texturr}></View>
      <View style={styles.texturru}></View>
      <View style={styles.texturlu}></View>

      <Btn styles={styles.btn} text={styles.btext} onPress={openGallery}>
        <View>
          <Ionicons
            testID="nextButton"
            name="images"
            color="rgba(255, 255, 255, .9)"
            size={64}
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
              marginLeft: 15,
            }}
          />
        </View>
        Gallery
      </Btn>
      <Btn styles={styles.btn} text={styles.btext} onPress={openCamera}>
        <View>
          <Ionicons
            testID="nextButton"
            name="camera"
            color="rgba(255, 255, 255, .9)"
            size={64}
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
              marginLeft: 15,
            }}
          />
        </View>
        Camera
      </Btn>

      <Btn
        styles={styles.btn}
        text={styles.btext}
        onPress={() => {
          navigation.navigate('Clients');
        }}>
        <View>
          <Ionicons
            testID="nextButton"
            name="people"
            color="rgba(255, 255, 255, .9)"
            size={64}
            style={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
              marginLeft: 15,
            }}
          />
        </View>
        Clients
      </Btn>
    </View>
  );
};

export default Menu;
const styles = StyleSheet.create({
  texture: {
    backgroundColor: colors.TEXTURE,
    borderRadius: 50,
    width: 350,
    height: 350,
    position: 'absolute',
    left: '-60%',
    top: '60%',
    zIndex: 0,
    transform: [{rotate: '45deg'}],
  },
  texturr: {
    backgroundColor: '#0d2582',
    borderRadius: 50,
    width: 300,
    height: 300,
    position: 'absolute',
    left: '70%',
    top: '80%',
    zIndex: 0,
    transform: [{rotate: '45deg'}],
  },
  texturru: {
    backgroundColor: colors.TEXTURE,
    borderRadius: 50,
    width: 300,
    height: 300,
    position: 'absolute',
    left: '80%',
    top: '20%',
    zIndex: 0,
    transform: [{rotate: '45deg'}],
  },
  texturlu: {
    backgroundColor: '#0d2582',
    borderRadius: 50,
    width: 300,
    height: 300,
    position: 'absolute',
    left: '20%',
    top: '-30%',
    zIndex: 0,
    transform: [{rotate: '45deg'}],
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 15,
    marginBottom: 50,
    marginTop: 20,
  },
  text: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 20,
    fontWeight: '500',
    color: colors.LIGHT,
  },
  btext: {
    fontSize: 30,
    fontWeight: '500',
    margin: 10,
    color: colors.LIGHT,
  },
  btn: {
    width: 150,
    height: 150,

    backgroundColor: colors.SCONDARY,
  },
});

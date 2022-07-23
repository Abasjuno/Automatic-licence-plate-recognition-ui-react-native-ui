import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/images/logo.svg';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
} from 'react-native';
import colors from './colors';
import Btn from '../components/Btn';
import CustomButton from '../components/CustomButton';
import GlobalStyle from '../components/GlobalStyle';

export default function Home({ navigation, route }) {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    useEffect(() => {
        getData();

    }, []);

    const getData = () => {
        try {
            
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        let user = JSON.parse(value);
                        setName(user.Name);
                        setAge(user.Age);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                var user = {
                    Name: name
                }
                await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
                Alert.alert('Success!', 'Your data has been updated.');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('UserData');
            await AsyncStorage.setItem('isLogedIn', '0');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
      <Logo style={styles.logo} width={200} height={220} fill={'#fff'} />
            <View style={styles.texture}></View>
            <View style={styles.texturr}></View>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                Welcome {name}!
            </Text>
            <Btn onPress={() => { navigation.navigate("Menu") }} text={styles.btext} styles={styles.btn}>START</Btn>
            <Btn onPress={logOut}text={styles.btext} styles={styles.btn}>LOG OUT</Btn>
        </View>
    )
}

const styles = StyleSheet.create({
    texture: {
        backgroundColor: colors.TEXTURE,
        borderRadius:50,
        width: 350,
        height: 350,
        position: 'absolute',
        left: '-50%',
        top: '40%',
        zIndex: 0,
        transform: [{ rotate: '45deg' }],
       

    },
    texturr: {
        backgroundColor: '#0d2582',
        borderRadius:50,
        width: 300,
        height: 300,
        position: 'absolute',
        left: '70%',
        top: '70%',
        zIndex: 0,
        transform: [{ rotate: '45deg' }],
       

    },
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.PRIMARY,
        zIndex:1,

    },
    text: {
        fontSize: 40,
        margin: 10,
        fontWeight:"600",
        marginBottom:50,
        color: "#FFFFFF",
        zIndex:1,

    },
    btext: {
        fontSize: 25,
        fontWeight: "350",
        margin: 10,
        color: colors.LIGHT
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 130,
        marginBottom: 10,
        zIndex:1,

    },
    btn: {
        alignSelf: 'center',
        width: 200,
        height: 70,
        backgroundColor: colors.SCONDARY,
        marginTop: 20,
        zIndex:2,
        
    },
   
})


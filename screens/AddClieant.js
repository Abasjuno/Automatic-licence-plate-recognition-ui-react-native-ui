import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/images/logo.svg';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';

export default function AddClients({navigation}) {
  const [name, setName] = useState('');
  const [platenumber, setPlatNumber] = useState('');
  const [code, setCode] = useState('')
  const { clients, setClints, getClients } = useClient();
  const addClint = async (name,platenumber,code) => {
    if (name.length == 0 || platenumber.length == 0|| code.length == 0) {
      Alert.alert('Warning!', 'this info is required.');
    } 
    else {
      try {
        var client = { id: Date.now(), Name: name, platenumber: platenumber, Code: code };
        const updatedclients = [...clients, client];
        setClints(updatedclients);
        await AsyncStorage.setItem('clients', JSON.stringify(updatedclients));
        navigation.navigate('Clients');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.body}>
      
      <TextInput
        style={styles.input}
        placeholder="name"
        autoCapitalize="none"
        onChangeText={value => setName(value)}
          />
          <TextInput
        style={styles.input}
        placeholder="plate number"
        autoCapitalize="none"
        onChangeText={value => setPlatNumber(value)}
          />
          <TextInput
        style={styles.input}
        placeholder="code"
        autoCapitalize="none"
        onChangeText={value => setCode(value)}
      />
      
      <Btn onPress={addClint} styles={styles.login}>add client</Btn>
      </View>
  ) 
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
        alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#43a402',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 70,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 20,
    marginBottom: 10,
      marginTop: 20,
    paddingHorizontal:10,
  },
  login: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#43defa',
    marginTop: 20,
    
  },
  signUp: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#4ee402',
    marginBottom: 0,
  },
  forgot: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#43a402',
    marginBottom: 0,
  }
});




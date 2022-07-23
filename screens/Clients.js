import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Image,
  FlatList,
} from 'react-native';
import {useState, useEffect} from 'react/cjs/react.development';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './colors';


export default function Clients({navigation}) {
  const [isCreate, setCreate] = useState(false);
  const [ clients, setClients ]= useState();
  const [name, setName] = useState('');
  const [platenumber, setPlatNumber] = useState('');
  const [code, setCode] = useState('')
  
  useEffect(() => {
    getClients();
  }, []);
  
  const addClint = async () => {
    if (name.length == 0 || platenumber.length == 0|| code.length == 0) {
      Alert.alert('Warning!', 'this info is required.');
    } 
    else {
      try {
        var client = { id: Date.now(), Name: name, platenumber: platenumber, Code: code };
        if (clients == null) {
          var data = [client]
        } else {
          var data = [...clients, client]
       }
        await AsyncStorage.setItem('clients', JSON.stringify(data));
        setCreate(false)
      } catch (error) {
        console.log(error);
      }
    
    }
    
  };
  const delClint = async (item) => {
   
    try {
      left = clients.filter(function (element) {
        return element.id != item.id
      }
      );
        await AsyncStorage.setItem('clients', JSON.stringify(left));
      } catch (error) {
        console.log(error);
      }
  };
  
 const getClients = async () => {
    AsyncStorage.getItem('clients').then(value => {
      var data = JSON.parse(value) 
      setClients(data)
      });
 };
  
  const image = require('../assets/images/avatar2.jpeg');
  const renderItem = ({item}) => (
    <View style={styles.wrapper}>
      {/* <Image style={[styles.avatar,{width:"20%"}]} source={image} /> */}
      
      <View style={{width:"60%"}}>
        <Text style={styles.text}>
          <Ionicons
          testID="nextButton"
          name="person-circle-sharp"
          color="rgba(255, 255, 255, .9)"
          size={25}
          style={{backgroundColor: 'transparent',alignSelf:"center",marginLeft:15}}
          />
          {' Name   ' + item.Name} </Text>
        <Text style={styles.textP}>
        <Ionicons
          testID="nextButton"
          name="car-sharp"
          color="rgba(255, 255, 255, .9)"
          size={25}
          style={{backgroundColor: 'transparent',alignSelf:"center",marginLeft:15}}
          />{'  plate  ' + item.platenumber} </Text>
        <Text style={styles.textP}>
        <Ionicons
          testID="nextButton"
          name="locate"
          color="rgba(255, 255, 255, .9)"
          size={25}
          style={{backgroundColor: 'transparent',alignSelf:"center",marginLeft:15}}
          />
          {'  code   ' + item.Code} </Text>
      </View>
      <View style={{width:"10%"}}>
        <Btn
          
          onPress={() => {
            delClint(item)
            navigation.navigate('Menu')
            navigation.navigate('Clients')
          }}
        styles={styles.del}
          text={styles.icon}
        >
          <Ionicons
          testID="nextButton"
          name="trash"
          color="rgba(255, 255, 255, .9)"
          size={20}
          style={{backgroundColor: 'transparent',alignSelf:"center",marginLeft:15}}
          />
      </Btn>
      </View>
    </View>
  );
  
  return isCreate === false ? (
    <View style={{backgroundColor: colors.PRIMARY ,height:'100%'}}>
      
      <FlatList
        data={clients}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 20,
        }}
        
      />
      <Btn
        onPress={() => {setCreate(true)}}
        styles={styles.plus}
        text={styles.icon}>
        +
      </Btn>
    </View>
  ) : (
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
    
        <Btn onPress={() => {
          addClint()
          navigation.navigate('Menu')
          navigation.navigate('Clients')
        }} styles={styles.btn} text={styles.text}>
          <View style={{marginBottom:30}}>
          <Ionicons
          testID="nextButton"
          name="add-circle-outline"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
          />
          </View>
          Add Client</Btn>
    </View>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.SCONDARY,
    borderRadius: 20,
    opacity: 0.8,
    justifyContent: 'space-between',
   paddingRight:10
    
  },
  avatar: {
    width: 5,
    height: 55,
    borderRadius: 100,
    marginRight: 0,
  },
  icon: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#aaa',
  },
  plus: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: '#ddd',
    marginBottom: 0,
    position: 'absolute',
    top: '80%',
    left: '70%',
    zIndex:0,
  },
  del: {
    width: 35,
    height: 35,
    backgroundColor: "#d23",
    marginLeft:'-30%',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  textP: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
   backgroundColor: "#555",
    fontSize: 20,
    marginBottom: 10,
      marginTop: 20,
    paddingHorizontal: 10,
    color:"#fff"
  },
  btn: {
    width: 300,
    maxHeight: 60,
    backgroundColor: colors.SCONDARY,
    marginTop: 20,
    
  },
  body: {
    flex: 1,
        alignItems: 'center',
    justifyContent:'center',
    backgroundColor: colors.PRIMARY,
  },
 
});


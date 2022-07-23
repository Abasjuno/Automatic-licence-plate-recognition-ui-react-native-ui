import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput, Alert} from 'react-native';
import Logo from '../assets/images/logo.svg';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import colors from './colors';
export default function Login({navigation}) {
  const [username, getUserName] = useState('');
  const [pass , getPasss] = useState('');
  const [name, setUserName] = useState('');
  const [passward, setPassword] = useState('');
  const [isLogedIn , setLogedIn] = useState('0')
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('isLogedIn').then(res => {
        if (res == '1') {
          setLogedIn('1') 
          // navigation.navigate('Home')
        }
      }
      )
      AsyncStorage.getItem('UserData').then(value => {
        // setUserInfo( value.Name,value.Passward )
        var userData = JSON.parse(value) 
        getUserName(userData.Name)
        getPasss(userData.Passward)
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  
  
  const SignUp = async () => {
    if (name.length == 0 || passward.length == 0) {
      Alert.alert('Warning!', 'this info is required.');
    } else if (username === name) {
      Alert.alert('user exsist.');
    }
    else {
      try {
        var user = {
          Name: name,
          Passward: passward,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        await AsyncStorage.setItem('isLogedIn', '1');
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };
 

  const Login = async () => {
    if (name.length == 0 || passward.length == 0) {
      Alert.alert('Warning!', 'this info is required.');
    } else if (username === name && pass === passward) {
      await AsyncStorage.setItem('isLogedIn', '1');
        navigation.navigate('Home');
    } else {
      Alert.alert('incorrect username or password');
    }
  };
  return isLogedIn != '1' ? (
    <View style={styles.body}>
      <Logo style={styles.logo} width={150} height={150} fill={'#fff'} />
      <View style={styles.texture}></View>
      <View style={styles.texturr}></View>
      <Text style={styles.text}>Welcome to AMT</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={value => setUserName(value)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder=" Passward"
        onChangeText={value => setPassword(value)}
      />
      <Btn onPress={SignUp}styles={styles.signUp}>REGISTER</Btn>
      {/* <Btn onPress={Login}styles={styles.forgot}>Forgot password</Btn> */}
      </View>
  ):(
  <View style={styles.body}>
  <Logo style={styles.logo} width={150} height={150} fill={'#fff'} />
  <View style={styles.texture}></View>
      <View style={styles.texturr}></View>
        <Text style={styles.text}>Welcome to AMT</Text>
  <TextInput
    style={styles.input}
    placeholder="Username"
    autoCapitalize="none"
    onChangeText={value => setUserName(value)}
  />
  <TextInput
    style={styles.input}
    secureTextEntry
    placeholder=" Passward"
    onChangeText={value => setPassword(value)}
  />
  <Btn onPress={Login}   styles={styles.login}>Login</Btn>
  {/* <Btn onPress={{}}styles={styles.forgot}>Forgot password</Btn> */}
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
    color:'#fff',
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
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#DADDFC',
    marginBottom: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: "#555",
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    color:'#fff',
    
    
  },
  login: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: colors.SCONDARY,
    marginTop: 50,
    
  },
  signUp: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    backgroundColor: colors.SCONDARY,
    marginTop:  50,
  },
  forgot: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    backgroundColor: colors.PRIMARY,
    marginBottom: 0,
  }
});









// /export default function Login({navigation}) {
//   const [UserInfo , setUserInfo] = useState({username: '', passward: ''});
//   const [name, setUserName] = useState('');
//   const [passward, setPassword] = useState('');

//   useEffect(() => {
//     getData();

//   }, []);

//   const getData = () => {
//     try {
//       AsyncStorage.getItem('isLogedIn').then(value => {
//         if (value == '1') {
//          navigation.navigate('Home')
//         } else {
//           AsyncStorage.getItem('UserData').then(value => {
//             setUserInfo({ username: value.Name, passward: value.Passward })
//           });
//        }
//       });
     
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const SignUp = async () => {
//     if (name.length == 0 || passward.length == 0) {
//       Alert.alert('Warning!', 'this info is required.');
//     } else if (UserInfo.username === name) {
//       Alert.alert('user exsist.');
//     }
//     else {
//       try {
//         var user = {
//           Name: name,
//           Passward: passward,
//         };
//         await AsyncStorage.setItem('UserData', JSON.stringify(user));
//         await AsyncStorage.setItem('isLogedIn', '1');
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   const Login = async () => {
//     if (UserInfo.username === name && UserInfo.passward === passward) {
//       await AsyncStorage.setItem('isLogedIn', '1');
//         navigation.navigate('Home');
//     } else {
//       Alert.alert('incorrect username or password');
//     }
//   };
//   return (
//     <View style={styles.body}>
//       <Logo style={styles.logo} width={150} height={150} fill={'#fff'} />

//       <Text style={styles.text}>Welcome to AMT</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         autoCapitalize="none"
//         onChangeText={value => setUserName(value)}
//       />
//       <TextInput
//         style={styles.input}
//         secureTextEntry
//         placeholder=" Passward"
//         onChangeText={value => setPassword(value)}
//       />
//       <CustomButton title="Login" color="#1eb900" onPressFunction={Login} />
//       <CustomButton title="Sign Up" color="#1ee900" onPressFunction={SignUp} />
//     </View>
//   );
// }





// export default function Login({navigation}) {
//   const UserInfo = {username: 'abas', passward: '123'};
//   const [name, setUserName] = useState('');
//   const [passward, setPassword] = useState('');

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     try {
//       AsyncStorage.getItem('UserData').then(value => {
//         if (value != null) {
//           navigation.navigate('Home');
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const setData = async () => {
//     if (name.length == 0 || passward.length == 0) {
//       Alert.alert('Warning!', 'this info is required.');
//     } else {
//       try {
//         var user = {
//           Name: name,
//           Passward: passward,
//         };
//         await AsyncStorage.setItem('UserData', JSON.stringify(user));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   const Login = async () => {
//     if (UserInfo.username === name && UserInfo.passward === passward) {
//       await AsyncStorage.setItem('isLogedIn', '1');
//         navigation.navigate('Home');
//     } else {
//       Alert.alert('incorrect username or password');
//     }
//   };
//   return (
//     <View style={styles.body}>
//       <Logo style={styles.logo} width={150} height={150} fill={'#fff'} />

//       <Text style={styles.text}>Welcome to AMT</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         autoCapitalize="none"
//         onChangeText={value => setUserName(value)}
//       />
//       <TextInput
//         style={styles.input}
//         secureTextEntry
//         placeholder=" Passward"
//         onChangeText={value => setPassword(value)}
//       />
//       <CustomButton title="Login" color="#1eb900" onPressFunction={Login} />
//       <CustomButton title="Sign Up" color="#1ee900" onPressFunction={Login} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#43a402',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     margin: 20,
//   },
//   text: {
//     fontSize: 30,
//     color: '#ffffff',
//     marginBottom: 130,
//   },
//   input: {
//     width: 300,
//     borderWidth: 1,
//     borderColor: '#555',
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//     textAlign: 'center',
//     fontSize: 20,
//     marginBottom: 10,
//   },
// });


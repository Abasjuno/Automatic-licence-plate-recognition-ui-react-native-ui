import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useState } from 'react/cjs/react.production.min';


export default function Profile({navigation,route}) {
  const { item } = route.params;
  return (
    <View>

    <View style={styles.wrapper}>
    <TouchableOpacity style={styles.avatar} onPress={()=>{navigation.navigate("EditProfile")}}>
        <Image style={styles.avatar} source={item.image} />
        <View>
          {/* <Icon name="camera" size={35} color="#ddd"></Icon> */}
        </View>
</TouchableOpacity>
   <View>
     <Text style={styles.text}>{item.name} </Text>
     
   </View>
 </View>
    </View>
);
}
const styles = StyleSheet.create({
  wrapper: {
    alignItems:'center',
        padding: 20,
        backgroundColor: '#363062',
  
        opacity:.8,
        
  },
  avatar: {
    width: 150,
    height: 160,
    marginBottom: 30,
    borderRadius: 100,

  },
  text: {
    fontSize:30,
    fontWeight: '600',
    alignSelf: 'center',
    color:"#ddd",
  },
});

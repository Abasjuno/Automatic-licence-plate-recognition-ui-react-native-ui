import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../screens/colors';


const Btn = (props)=>{
    return (
        <TouchableOpacity style={[styles.btn,props.styles]} onPress={props.onPress}>
         <Text style= {[{alignSelf:'center',color:"#FFF"},props.text]}>{props.children}</Text>
        </TouchableOpacity>)
}
export default  Btn;
const styles = StyleSheet.create({
    btn: {
        width: 100,
        height: 80,
        marginHorizontal:5,
        marginBottom: 30,
        backgroundColor: colors.SCONDARY,
        justifyContent: "center",
        borderRadius: 10,
        border: 'solid',
        borderWidth: 1,
        borderColor:"#fff"
        
    }
})
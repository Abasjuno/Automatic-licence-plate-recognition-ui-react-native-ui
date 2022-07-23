import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const CustomButton = (props) => {
    const btnStyle =props.style
    return (
         
        <TouchableHighlight
            
            style={{btnStyle}}
        >
            <Text style={styles.text}>
                {props.title}
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
    button: {
        width: 250,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
    },
})

export default CustomButton;
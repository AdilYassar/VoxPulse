/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import  Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import LottieView from 'lottie-react-native'

const Instructions:FC<{
    message:string,
    onCross:()=>void;
}> = ({message,onCross}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cross} onPress={onCross}>
        <Icon name='close-circle' color='blue' size={RFValue(20)} />
      </TouchableOpacity>
      <Image 
      source={require('../../../assets/images/3.jpg')}
      style={styles.logo}
      />
      <View>
        {message==='meditation'?
        <LottieView
        source={require('../../../assets/animations/breath.json')} 
        style={{width:400, height:400, alignSelf:'center'}}
        autoPlay
        loop
        
        />
       
        
    :<Text></Text>}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:10,
        width:'90%',
        justifyContent:'center',
        backgroundColor:'white',
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.08,
        shadowRadius:16,
        elevation:10,
        shadowColor:'#000',
        borderRadius:10
    },
    logo: {
        width: 50,
        height: 50, // Set to the same as width
        borderRadius: 25, // Half of width/height to make it circular
        alignSelf: 'center',
        marginVertical: 10,
    },
    cross:{
        position:'absolute',
        right:10,
        top:10
    }

})
export default Instructions
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { navigate, resetAndNavigate } from '../utils/NavigationUtils';
import { Colors, Fonts, lightColors } from '../utils/Constants';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { screenheight, screenWidth } from '../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../components/global/CustomText';
import LottieView from 'lottie-react-native';
import { initializeTtsListeners, playTTS } from '../utils/ttsListener';


const bottomColors = [...lightColors].reverse()

const SplashScreen:FC = () => {

const VoxPulseAnimation = useSharedValue(0);
const messageContainerAnimation = useSharedValue(screenheight*0.8)


const launchAnimation = async()=>{
    messageContainerAnimation.value = screenheight*0.001;
    setTimeout(()=>{
       playTTS('Hello World! i am Vox Pulse, Your Own Personal AI Powered Butler')
    },600)
    setTimeout(()=>{
        resetAndNavigate('VoxPulseScreen')
    },7000)
}

useEffect(()=>{
    initializeTtsListeners()
    launchAnimation();
},[])

const animateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(VoxPulseAnimation.value,
             { duration: 1.5 }),
        },
      ],
    };
  });
  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value,
             { duration: 1500 }),
        },
      ],
    };
  });
  return (

    <View  style={styles.container}>
     <Animated.View style={[styles.imageContainer,animateImageStyle]}>
        <Image style={styles.img} source={require('../assets/images/5.jpg')} />
     </Animated.View>

     <Animated.View style={[styles.gradientcontainer,messageContainerStyle]}>
        <LinearGradient colors={bottomColors} style={styles.gradient}>
            <View style={styles.textContainer}>
                <CustomText fontSize={35} fontFamily={Fonts.Theme} >
                    VoxPulse
                </CustomText >
                <LottieView
                source={require('../assets/animations/sync.json')}
                style={{width:280, height:100}}
                autoPlay={true}
                loop
                />
                <CustomText>
                    Synchronizing best outcomes for you 
                </CustomText>
            </View>
        </LinearGradient>
     </Animated.View>
    </View>
   
  );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primary,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    img:{
      width:'100%',
      height:'100%',
      resizeMode:'cover'
        
    },
    imageContainer:{
        width:screenWidth,
        height:screenheight
    },
    gradientcontainer:{
        position: 'absolute',
        height:'35%',
        bottom:0,
        width:'100%'
    },
    gradient:{
        width:'100%',
        height:'100%',
        paddingTop:30
    },
    textContainer:{
        flex:1,
        borderRadius:20,
        padding:20,
        shadowOffset:{width:1, height:1},
        shadowOpacity:1,
        shadowRadius:2,
        alignItems:'center',
        shadowColor:Colors.border,
        
    }
})

export default SplashScreen;

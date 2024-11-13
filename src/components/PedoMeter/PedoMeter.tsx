/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { usePedometerStore } from '../../state/pedometerStore';
import StepCounter, { parseStepData, startStepCounterUpdate, stopStepCounterUpdate } from '@dongminyu/react-native-step-counter'
import { playTTS } from '../../utils/ttsListener';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors, Fonts } from '../../utils/Constants';
import CustomText from '../global/CustomText';
const PedoMeter: FC<{
  message: string,
  onCross: () => void;
}> = ({ message, onCross }) => {

  const {stepCount, dailyGoal, addSteps} = usePedometerStore();
   StepCounter.addListener('StepCounter.stepsSensorInfo')
   const lastStepCount = useRef(0);

   const startStepCounter = () => {
     startStepCounterUpdate(new Date(), (data) => {
       const parsedData = parseStepData(data);
   
       // Calculate the difference in steps since the last update
       const stepDifference = parsedData.steps - lastStepCount.current;
   
       // Ensure only positive increments are counted
       if (stepDifference > 0) {
         addSteps(stepDifference, parsedData.distance);
       }
   
       // Update lastStepCount to the latest step count
       lastStepCount.current = parsedData.steps;
     });
   };

   const stopStepCounter = () => {
    stopStepCounterUpdate()
   }


   useEffect(()=>{
    if(stepCount>=dailyGoal){
      playTTS('You have Completed Your Daily Goal. Now get some rest and watch my movie The Wild Robot and enjoy')
    }else{
      startStepCounter()
    }

    return ()=>{stopStepCounter()}
   },[])

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.cross} onPress={()=>{
      
      Alert.alert('Your Step Counter has Stopped !!! i am sure you are tired, get some rest')
      stopStepCounter()
      onCross()
    }}>
        <Icon name='close-circle' color='blue' size={RFValue(20)} />
    </TouchableOpacity>
    <Image
        source={require('../../assets/images/3.jpg')}
        style={styles.logo}
    />
    <View style = {styles.indicator}>

      <CircularProgress
      value={stepCount}
      maxValue={dailyGoal}
      valueSuffix='/2000'
      progressValueFontSize={22}
      radius={120}
      activeStrokeColor={Colors.secondary2}
      inActiveStrokeColor={Colors.primary}
      inActiveStrokeOpacity={0.5}
      inActiveStrokeWidth={20}
      activeStrokeWidth={20}
      title='Steps'
      titleColor='#000'
      titleFontSize={22}
      titleStyle={{fontFamily:Fonts.SemiBold}}
      />
      <CustomText fontFamily={Fonts.SemiBold} fontSize={RFValue(8)} style={styles.text} >
        Start Walking Dude!!! i need to update the counter
      </CustomText>
    </View>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
      paddingVertical: 10,
      width: '90%',
      justifyContent: 'center',
      backgroundColor: 'white',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 10,
      shadowColor: '#000',
      borderRadius: 10
  },
  logo: {
      width: 50,
      height: 50, // Set to the same as width
      borderRadius: 25, // Half of width/height to make it circular
      alignSelf: 'center',
      marginVertical: 10,
  },
  cross: {
      position: 'absolute',
      right: 10,
      top: 10
  },
  indicator:{
    marginTop:10,
    marginBottom:20,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    marginTop:20,
    textAlign:'center'
  }

})

export default PedoMeter
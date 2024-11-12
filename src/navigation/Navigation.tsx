/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native'
import React, { FC } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from '../screens/SplashScreen'
import VoxPulseScreen from '../screens/VoxPulseScreen'
import { navigationRef } from '../utils/NavigationUtils'


const Stack = createNativeStackNavigator()
const Navigation:FC = () => {
  return (
   <NavigationContainer ref={navigationRef}>
    <Stack.Navigator  initialRouteName='SplashScreen' 
     screenOptions={{headerShown:false}}  >
        <Stack.Screen name='SplashScreen' component={SplashScreen}    />
        <Stack.Screen name='VoxPulseScreen' component={VoxPulseScreen} options={{animation:'fade'}}    />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Navigation
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StatusBar, Platform } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import Navigation from './src/navigation/Navigation';
import { batteryOptimizationCheck, powerManagerCheck, requestPermission } from './src/notification/notificationPermission';
import { registeringAllTriggers } from './src/notification/registerTrigger';
import { setCategories } from './src/notification/notificationInitials';

const App = () => {

  const permissionChecks = async () =>{
    requestPermission();
    registeringAllTriggers();
    setCategories()
    if(Platform.OS=='android'){
      batteryOptimizationCheck()
      powerManagerCheck()
    }
  }


  useEffect(()=>{
    permissionChecks();
  },[])
  return (
    <>
  <Navigation />
  
  </>
  );
};

export default App;

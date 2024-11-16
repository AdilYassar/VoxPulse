import StepCounter from '@dongminyu/react-native-step-counter';
import notifee from '@notifee/react-native'
import { Alert } from 'react-native';


export const batteryOptimizationCheck = async()=>{
// 1. checks if battery optimization is enabled
const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
if (batteryOptimizationEnabled) {
  // 2. ask your users to disable the feature
  Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
};
}

//we took it from notifee website



export const powerManagerCheck = async()=>{
const powerManagerInfo = await notifee.getPowerManagerInfo();
if (powerManagerInfo.activity) {
  // 2. ask your users to adjust their settings
  Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openPowerManagerSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
};
}


export const requestPermission = async () =>{
    await notifee.requestPermission()
    await notifee.setBadgeCount(0)
    StepCounter.stopStepCounterUpdate()
}
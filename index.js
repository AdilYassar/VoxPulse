/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'
import { displayNotification } from './src/notification/notificationInitials';


async function onMessageRecieved(message) {
    const {title,description}=message.data;
    await displayNotification(title,description,'fcm-message')
    
    
}
messaging().onMessage(onMessageRecieved);

messaging().setBackgroundMessageHandler(onMessageRecieved);







AppRegistry.registerComponent(appName, () => App);

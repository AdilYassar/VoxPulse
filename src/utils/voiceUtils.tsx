/* eslint-disable @typescript-eslint/no-unused-vars */
import SoundPlayer from "react-native-sound-player";



export  const playSound =(soundName:string)=>{
try {
    const SoundPath = getSoundPath(soundName)
    SoundPlayer.playAsset(SoundPath)
} catch (error) {
    console.log(error)
}
}


const getSoundPath = (soundName: string) => {
  switch (soundName) {
    case 'laugh':
      return require('../assets/sfx/laugh.mp3');
    case 'meditation':
      return require('../assets/sfx/meditation.mp3');
    case 'motivation':
      return require('../assets/sfx/motivation.mp3');
    case 'ting2':
      return require('../assets/sfx/ting2.mp3');
    case 'notification':
      return require('../assets/sfx/notification.wav');
    default:
      throw new Error(`Sound ${soundName} not found`);
  }
};

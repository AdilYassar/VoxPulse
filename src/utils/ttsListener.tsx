/* eslint-disable @typescript-eslint/no-unused-vars */
import Tts from "react-native-tts";

export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    () => {
      console.log('TTS initialized successfully');
    },
    (err) => {
      if (err.code === 'no_engine') {
        console.log('No TTS engine found. Attempting to install...');
        Tts.requestInstallEngine();
      } else {
        console.error('TTS initialization error:', err);
      }
    }
  );

//Tts.setDefaultRate(0, true)
Tts.setIgnoreSilentSwitch('ignore')
//Tts.setDefaultPitch(0.7)
Tts.addEventListener('tts-start',(event)=>{
    console.log('TTS started', event)
})

//Tts.addEventListener('tts-progress',(event)=>{
//  console.log('TTS started progressing:', event)
//})
Tts.addEventListener('tts-finish',(event)=>{
    console.log('TTS finished', event)
})

Tts.addEventListener('tts-cancel',(event)=>{
    console.log('TTS cancelled', event)
})


};


export const playTTS = async(message:string)=>{
  Tts.getInitStatus().then(
    () => {
      console.log('TTS initialized successfully');
    },
    (err) => {
      if (err.code === 'no_engine') {
        console.log('No TTS engine found. Attempting to install...');
        Tts.requestInstallEngine();
      } else {
        console.error('TTS initialization error:', err);
      }
    }
  );
  Tts.speak(message)
}
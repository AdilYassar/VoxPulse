/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../utils/Constants';
import Background from '../components/global/VoxPulse/Background';
import Loading from '../components/global/VoxPulse/Loading';
import VoxPulse from '../components/global/VoxPulse/VoxPulse';
import { screenheight, screenWidth } from '../utils/Scaling';
import { playTTS } from '../utils/ttsListener';
import SoundPlayer from 'react-native-sound-player';
import { playSound } from '../utils/voiceUtils';
import { prompt } from '../utils/data';
import PedoMeter from '../components/PedoMeter/PedoMeter';
import Instructions from '../components/global/VoxPulse/Instructions';

const VoxPulseScreen = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [showPedometer, setShowPedoMeter] = useState(false);

  const handleError = (error: string) => {
    playTTS('There was an error, please try again');
    startBlur();
    setMessage('');
    setShowLoader(true);
    SoundPlayer.stop();
    setShowInstructions(false);
    console.log(error);
  };

  const handleResponse = async (type: string, promptText: string, sound: string) => {
    try {
      if (type === 'meditation') {
        playTTS('Focus on your breath');
        playSound(sound);
        setMessage('meditation');
        return;
      }
      if (type === 'happiness') {
        setTimeout(() => {
          playSound(sound);
        }, 5000); // Delay sound for 'happiness'
      } else {
        playSound(sound);
      }
      setMessage(type);
      unBlur();
    } catch (error: any) {
      handleError(error);
    } finally {
      setShowLoader(false);
    }
  };

  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedoMeter(true);
      setShowLoader(false);
      return;
    }

    switch (type) {
      case 'happiness': {
        handleResponse(type, prompt.joke, 'laugh');
        break;
      }
      case 'motivation': {
        handleResponse(type, prompt.motivation, 'motivation');
        break;
      }
      case 'health': {
        handleResponse(type, prompt.health, 'meditation');
        break;
      }
      case 'meditation': {
        handleResponse(type, prompt.health, 'meditation');
        break;
      }
      default: {
        handleError('There was no type like that');
      }
    }
  };

  const blurOpacity = useRef(new Animated.Value(0)).current;

  const startBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const unBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const timer = setTimeout(startBlur, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
       <Background blurOpacity={blurOpacity} />
      {message && (
        <Instructions
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            SoundPlayer.stop();
            setShowInstructions(false);
          }}
          message={message}
        />
      )}

      {showPedometer && (
        <PedoMeter
          onCross={() => {
            startBlur();
            setMessage('');
            setShowLoader(true);
            SoundPlayer.stop();
            setShowInstructions(false);
            setShowPedoMeter(false);
          }}
          message={message}
        />
      )}

      {showLoader && (
        <View style={styles.loaderContainer}>
          <Loading />
        </View>
      )}

     
      {!showInstructions && <VoxPulse onPress={onOptionPressHandler} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 1, // Add this line
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: screenWidth,
    height: screenheight,
  },
  img: {
    width: screenWidth,
    height: screenheight,
    resizeMode: 'cover',
  },
});

export default VoxPulseScreen;

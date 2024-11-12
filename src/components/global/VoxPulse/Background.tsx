import { View, StyleSheet, Image, Animated } from 'react-native';
import React, { FC } from 'react';
import { screenheight, screenWidth } from '../../../utils/Scaling';
import { BlurView } from '@react-native-community/blur';

const Background: FC<{ blurOpacity: any }> = ({ blurOpacity }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={require('../../../assets/images/10.jpg')} style={styles.img} />
      <Animated.View style={[styles.absolute, { opacity: blurOpacity }]}>
        <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Background;

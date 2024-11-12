/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { screenheight, screenWidth } from '../../../utils/Scaling';
import Water from '../../options/Water';
import OptionItem from '../../options/OptionItem';

const VoxPulse: FC<{ onPress: (type: string) => void }> = ({ onPress }) => {
    // Hardcoded VoxPulseData array
    const VoxPulseData = [
        'water',
        'pedometer',
        'health',
        'motivation',
        'happiness',
        'meditation',
    ];

    // Create animated values for each item
    const animatedValues = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Staggered animation effect
        Animated.stagger(
            100,
            animatedValues.map((animatedValue, index) =>
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    delay: index * 200,
                })
            )
        ).start(); // Start the animation
    }, []);

    return (
        <View style={styles.circle}>
            {VoxPulseData.map((item, index) => {
                const angle = (index / 6) * 2 * Math.PI; // Calculate the angle for circular placement
                const x = 140 * Math.cos(angle); // X-axis position based on the angle
                const y = 140 * Math.sin(angle); // Y-axis position based on the angle

                const translateX = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, x],
                });

                const translateY = animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, y],
                });

                return (
                    <Animated.View
                        key={index} // Ensuring a unique key for each element
                        style={[
                            styles.item,
                            {
                                transform: [
                                    { translateX }, // Apply the X translation
                                    { translateY }, // Apply the Y translation
                                ],
                            },
                        ]}
                    >
                        {item !== 'water' && <OptionItem onPress={onPress} item={item} />}
                        {item === 'water' && <Water />}
                    </Animated.View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: screenWidth * 0.8,
        height: screenheight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        // backgroundColor: 'lightblue', // Uncomment to see the container boundary
    },
    item: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 400,
    },
    text: {
        color: 'black', // Adjust for contrast with the background
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default VoxPulse;

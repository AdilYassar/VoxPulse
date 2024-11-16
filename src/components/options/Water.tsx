/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { circleRadius, Colors } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useWaterStore } from '../../state/waterStore'
import { playTTS } from '../../utils/ttsListener'
import { playSound } from '../../utils/voiceUtils'

const Water = () => {
    const { waterDrinkStamps, addWaterIntake } = useWaterStore()

    const totalSegments = 8;
    const completedSegments = waterDrinkStamps.length;
    const containerStyle = [
        styles.container,
        completedSegments === totalSegments && styles.containerCompleted
    ]
    const handlePress = async () => {

        if (completedSegments < totalSegments) {
            const timestamp = new Date().toISOString()
            addWaterIntake(timestamp)
            playSound('ting2')
            setTimeout(()=>{
                playTTS('Ohh, Good Work Cutie, For a gorgeous Skin like Yours Water is a big contributor')
            },1000)

        } else {
            playTTS("You have Completed Your Daily Intakes !!!! Proud Of You Cutie")

        }
    }
    return (
        <TouchableOpacity style={containerStyle} onPress={handlePress}>
            <Icon name='water' color='#1ca3ec' size={RFValue(32)} />
            <View style={styles.segmentContainer}>
                {Array.from({ length: totalSegments }).map((_, index) => (
                    <View
                        key={index}
                        style={[styles.segment, {
                            backgroundColor: completedSegments === totalSegments ? '#00D100' : index < completedSegments ? '#1ca3ec' : '#eee',
                            transform: [{
                                rotate: `${(index * 360) / totalSegments}deg`
                            },

                            { translateX: circleRadius / 2 - 5 }]
                        }]}

                    />

                ))}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: circleRadius,
        width: circleRadius,
        borderRadius: circleRadius,
        backgroundColor: Colors.secondary3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowOffset: { width: 1, height: 1 },
        elevation: 10,
        shadowRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
    },
    containerCompleted: {
        shadowColor: 'yellow',
        elevation: 10
    },
    segmentContainer: {
        position: 'absolute',
        height: circleRadius,
        width: circleRadius,
        borderRadius: circleRadius / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segment: {
        position: 'absolute',
        width: 8,
        height: 4,
        borderRadius: 2
    }
})

export default Water
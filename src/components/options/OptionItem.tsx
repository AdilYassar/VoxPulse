/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable space-infix-ops */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { circleRadius, Colors } from '../../utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const OptionItem: FC<{ item: string; onPress: (type: string) => void }> = ({ item, onPress }) => {
    let iconColor: string;
    let iconName: string;

    switch (item) {
        case 'meditation': {
            iconColor = '#2DEC72';
            iconName = 'nature-people';
            break;
        }
        case 'pedometer': {
            iconColor = '#2D7BA4';
            iconName = 'directions-run';
            break;
        }
        case 'health': {
            iconColor = 'green';
            iconName = 'health-and-safety';
            break;
        }
        case 'happiness': {
            iconColor = '#FB26FF';
            iconName = 'emoji-emotions';
            break;
        }
        default: {
            iconColor = '#ffbc66';
            iconName = 'local-fire-department';
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
            <Icon name={iconName} color={iconColor} size={RFValue(32)} />
        </TouchableOpacity>
    );
};

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
});

export default OptionItem;

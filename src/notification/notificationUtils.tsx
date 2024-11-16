/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AndroidAction,
    AndroidImportance,
    IntervalTrigger,
    RepeatFrequency,
    TimestampTrigger,
    TimeUnit,
    TriggerType
} from "@notifee/react-native";
import notifee from '@notifee/react-native';

export const createTimestampNotification = async (
    imageUri: string,
    title: string,
    body: string,
    hour: number,
    minute: number,
    notificationId: string
) => {
    const now = new Date();
    const triggerDate = new Date();
    triggerDate.setHours(hour, minute, 0, 0);

    // Ensure the trigger date is in the future
    if (triggerDate <= now) {
        triggerDate.setDate(triggerDate.getDate() + 1);
    }

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
        repeatFrequency: RepeatFrequency.HOURLY, // Ensure this frequency aligns with your use case
        alarmManager: true,
    };

    const action: AndroidAction = {
        title: "View Details",
        pressAction: {
            id: 'view-details',
            launchActivity: 'default',
        },
    };

    await notifee.createTriggerNotification(
        {
            id: notificationId,
            title,
            body,
            android: {
                channelId: 'default',
                sound: 'notification',
                onlyAlertOnce: true,
                actions: [action],
            },
            ios: {
                categoryId: 'default',
                attachments: [
                    {
                        url: imageUri || require('../assets/images/10.jpg'),
                        thumbnailHidden: false,
                    },
                ],
                interruptionLevel: 'timeSensitive',
                foregroundPresentationOptions: {
                    badge: true,
                    sound: true,
                    banner: true,
                    list: true,
                },
                sound: 'notification.wav',
            },
        },
        trigger
    );
};

export const createIntervalNotification = async (
    imageUri: string,
    title: string,
    body: string,
    intervalTime: number,
    timeUnit: TimeUnit
) => {
    const trigger: IntervalTrigger = {
        type: TriggerType.INTERVAL,
        interval: intervalTime,
        timeUnit: timeUnit,
    };

    const action: AndroidAction = {
        title: "View Details",
        pressAction: {
            id: 'view-details',
            launchActivity: 'default',
        },
    };

    await notifee.createTriggerNotification(
        {
            title,
            body,
            android: {
                channelId: 'default',
                sound: 'notification',
                onlyAlertOnce: true,
                importance: AndroidImportance.HIGH,
                actions: [action],
            },
            ios: {
                categoryId: 'default',
                attachments: [
                    {
                        url: imageUri || require('../assets/images/10.jpg'),
                        thumbnailHidden: false,
                    },
                ],
                interruptionLevel: 'timeSensitive',
                foregroundPresentationOptions: {
                    badge: true,
                    sound: true,
                    banner: true,
                    list: true,
                },
                sound: 'notification.wav',
            },
        },
        trigger
    );
};

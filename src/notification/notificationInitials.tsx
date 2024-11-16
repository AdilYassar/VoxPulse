/* eslint-disable @typescript-eslint/no-unused-vars */
import notifee from '@notifee/react-native';
import { assets } from '../../react-native.config';

export const addBadgeCount = async () => {
    try {
        await notifee.setBadgeCount(1);
        console.log('Badge count set to 1');
    } catch (error) {
        console.error('Failed to set badge count:', error);
    }
};

export const displayNotification = async (
    title: string,
    message: string,
    image: string,
    categoryId: string
) => {
    try {
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'notification',
        });

        await notifee.displayNotification({
            title: title || 'Default Title',
            body: message || 'Default Message',
            android: {
                channelId:channelId,
                sound: 'notification',
                onlyAlertOnce: true,
                actions: [
                    {
                        title: 'Okay',
                        pressAction: {
                            id: categoryId || 'default-action',
                        },
                    },
                ],
            },
            ios: {
                categoryId: categoryId || 'default-category',
                attachments: [
                    {
                        url: image || require('../assets/images/10.jpg'),
                        thumbnailHidden: false,
                    },
                ],
                foregroundPresentationOptions: {
                    badge: true,
                    sound: true,
                    banner: true,
                    list: true,
                },
                sound: 'notification.wav',
            },
        });

        console.log('Notification displayed');
    } catch (error) {
        console.error('Failed to display notification:', error);
    }
};

export const setCategories = async () => {
    await notifee.setNotificationCategories([
        {
            id: 'water-intake',
            actions: [
                {
                    id: 'water-intake',
                    title: 'Okay',
                    foreground: true,
                },
            ],
        },
        {
            id: 'drink-action',
            actions: [
                {
                    id: 'drink-intake',
                    title: 'I drank water',
                    foreground: true,
                },
            ],
        },
    ]);
};

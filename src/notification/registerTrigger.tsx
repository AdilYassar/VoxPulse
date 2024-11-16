/* eslint-disable @typescript-eslint/no-unused-vars */
import { usePedometerStore } from '../state/pedometerStore';
import { useWaterStore } from '../state/waterStore';
import { createTimestampNotification } from './notificationUtils';
import notifee from '@notifee/react-native';

const INTERVAL_NOTIFICATION_ID = 'water-reminder';

// Create hourly reminders for water intake
const createHourlyReminder = async () => {
    const startHour = 9; // Starting time for reminders
    const endHour = 23; // Ending time for reminders
    const interval = 2; // Interval between reminders in hours
    let counter = 1;

    for (let hour = startHour; hour <= endHour; hour += interval) {
        await createTimestampNotification(
            require('../assets/images/water.png'),
            'Water Reminder',
            'Time to drink more water, cutie!',
            hour,
            0,
            `${INTERVAL_NOTIFICATION_ID}-${counter}`
        );
        counter++;
    }
};

export const registeringAllTriggers = async () => {
    const { initializeStepsForTheDay } = usePedometerStore.getState();
    const { waterDrinkStamps, resetWaterIntake } = useWaterStore.getState();

    // Initialize step count for the day
    initializeStepsForTheDay();

    // Good Morning Notification
    await createTimestampNotification(
        require('../assets/images/gm.png'),
        'Good Morning Cutie',
        'Start your day with some positivity!',
        6,
        0,
        'good-morning'
    );

    // Good Night Notification
    await createTimestampNotification(
        require('../assets/images/gn.png'),
        'Good Night Cutie',
        'End your day with some positivity!',
        22,
        0,
        'good-night'
    );

    // Morning Walk Reminder
    await createTimestampNotification(
        require('../assets/images/run.png'),
        'Walk',
        'Time to start walking!',
        7,
        0,
        'daily-walking-morning'
    );

    // Evening Run Reminder
    await createTimestampNotification(
        require('../assets/images/run.png'),
        'Run',
        'Get moving with an evening run!',
        18,
        0,
        'daily-running-evening'
    );

    // Check water intake status
    if (waterDrinkStamps.length !== 8) {
        // Create hourly water reminders if not already set
        await createHourlyReminder();
    } else {
        // Cancel existing water reminders if already set
        const notifications = await notifee.getTriggerNotifications();
        let counter = 1;
        for (const notification of notifications) {
            if (notification.notification.id === `${INTERVAL_NOTIFICATION_ID}-${counter}`) {
                await notifee.cancelNotification(notification.notification.id);
            }
            counter++;
        }
    }

    // Check if water intake is from a previous day
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];

    const isFromPreviousDay = (timestamps: string[]) => {
        if (timestamps.length === 0) {
            return true; // No records, consider as previous day
        }
        const lastTimestamp = new Date(timestamps[timestamps.length - 1]);
        const lastDate = lastTimestamp.toISOString().split('T')[0];
        return lastDate !== currentDate; // Compare dates
    };

    if (isFromPreviousDay(waterDrinkStamps)) {
        resetWaterIntake();
    }
};

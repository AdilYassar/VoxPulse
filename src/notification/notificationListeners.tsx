import notifee, { EventType } from '@notifee/react-native';

notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
        case EventType.ACTION_PRESS: // Changed ';' to ':'
            if (detail.pressAction?.id === 'drink-action') {
                console.log('Drink Action Performed');
            }
            if (detail.pressAction?.id === 'water-intake') {
                console.log('Water Intake Performed');
            }
            break; // Added break to prevent fall-through
    }
});


notifee.onBackgroundEvent(async({ type, detail }) => {

    console.log(type)
    console.log(detail)
    if(type == EventType.ACTION_PRESS && detail.pressAction?.id === 'Drink Action Background')
    {
        console.log('Drink Action Background')
    }
})

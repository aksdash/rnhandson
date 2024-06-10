import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if(enabled){
        console.log('Authorization status:', authStatus);
    }
}

async function getToken(){
    const token = await messaging().getToken()
    console.log('Device FCM Token:', token);

}

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

})

messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
})

messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', remoteMessage.notification);
});

// Handle notifications opened when the app is in the quit state
messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    }
});

export {requestUserPermission, getToken}
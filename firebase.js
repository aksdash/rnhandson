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

export {requestUserPermission, getToken}
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { FirebaseMessaging } from '@capacitor-firebase/messaging';

export const signInWithGoogle = async () => {
  try {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const initializeFCM = async () => {
  try {
    let result = await FirebaseMessaging.requestPermissions();
    if (result.receive === 'granted') {
      await FirebaseMessaging.register();
      const { token } = await FirebaseMessaging.getToken();
      console.log('FCM Token:', token);

      FirebaseMessaging.addListener('notificationReceived', (event) => {
        console.log('Notification received:', event.notification);
      });

      return token;
    }
  } catch (error) {
    console.error('FCM Initialization Error:', error);
  }
};

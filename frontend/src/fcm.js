import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const initializeFCM = async () => {
  if (Capacitor.getPlatform() === 'web') return;

  // Request permission to use push notifications
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    console.warn('Push notification permission denied.');
    return;
  }

  // Register with Apple / Google to receive push via APNS/FCM
  await PushNotifications.register();

  // On success, we should be able to receive notifications
  await PushNotifications.addListener('registration', token => {
    console.log('FCM Token:', token.value);
    // You can send this token to your server to target this device
  });

  // Some registration error occurred
  await PushNotifications.addListener('registrationError', error => {
    console.error('FCM Registration Error:', JSON.stringify(error));
  });

  // Show us the notification payload if the app is open on our device
  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push received:', JSON.stringify(notification));
  });

  // Method called when tapping on a notification
  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push action performed:', JSON.stringify(notification));
  });
};

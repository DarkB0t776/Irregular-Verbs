import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

let PushNotification = require('react-native-push-notification');
const SettingsScreen = () => {
  PushNotification.configure({
    onRegister: function(token) {
      console.log('TOKEN:', token);
    },

    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    senderID: 'YOUR FCM SENDER ID',

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
  });

  const testPush = () => {
    PushNotification.localNotificationSchedule({
      title: 'Irregular Verbs', // (optional)
      message: 'Learn Irregular Verbs', // (required)
      date: new Date(Date.now() + 20 * 1000), // in 60 secs
    });
  };

  useEffect(() => {
    testPush();
  }, []);

  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});

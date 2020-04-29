import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigationState, CommonActions} from '@react-navigation/native';
import Colors from '../constants/Colors';
import FontFamilyModal from '../components/modals/FontFamilyModal';
import NotificationModal from '../components/modals/NotificationModal';
import {CheckBox, Divider} from 'react-native-elements';

let PushNotification = require('react-native-push-notification');
const SettingsScreen = () => {
  const [showFontModal, setShowFontModal] = useState(false);
  const [showNotfModal, setShowNotfModal] = useState(false);
  const [notfInterval, setNotfInterval] = useState(24);
  const state = useNavigationState(state => state);

  const fontFamily = state.routes
    .find(r => r.name === 'Main')
    .state.routes.find(r => r.name === 'Verbs').params.fontFamily;
  const setFontFamily = state.routes
    .find(r => r.name === 'Main')
    .state.routes.find(r => r.name === 'Verbs').params.setFontFamily;

  const showFontModalHandler = () => setShowFontModal(true);
  const hideFontModalHandler = () => setShowFontModal(false);
  const showNotfModalHandler = () => setShowNotfModal(true);
  const hideNotfModalHandler = () => setShowNotfModal(false);
  const changeFontHandler = font => setFontFamily(font);

  // Notifications
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
      date: new Date(Date.now() + 50 * 1000), // in 60 secs
    });
  };

  useEffect(() => {
    testPush();
  }, [notfInterval]);

  return (
    <View style={styles.container}>
      <FontFamilyModal
        visible={showFontModal}
        closeModal={hideFontModalHandler}
        changeFont={changeFontHandler}
      />
      <NotificationModal
        setNotfInterval={setNotfInterval}
        visible={showNotfModal}
        closeModal={hideNotfModalHandler}
      />
      <Text style={styles.title}>Appearance</Text>
      <TouchableOpacity onPress={showFontModalHandler}>
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>Verbs Font</Text>
          <Text style={styles.description}>{fontFamily}</Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <Text style={styles.title}>Notifications</Text>
      <TouchableOpacity onPress={showNotfModalHandler}>
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>Notifications Interval</Text>
          <Text style={styles.description}>{notfInterval} hour(s)</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    color: Colors.highRed,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  infoContainer: {
    marginLeft: 20,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: 'grey',
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigationState, CommonActions} from '@react-navigation/native';
import Colors from '../constants/Colors';
import FontFamilyModal from '../components/modals/FontFamilyModal';
import DefaultStackHeader from '../components/headers/DefaultStackHeader';

let PushNotification = require('react-native-push-notification');
const SettingsScreen = ({navigation}) => {
  const [showFontModal, setShowFontModal] = useState(false);
  // const [fontFamily, setFontFamily] = useState('Android Standard');
  const state = useNavigationState(state => state);

  // console.log(state);

  const fontFamily = state.routes
    .find(r => r.name === 'Main')
    .state.routes.find(r => r.name === 'Verbs').params.fontFamily;
  const setFontFamily = state.routes
    .find(r => r.name === 'Main')
    .state.routes.find(r => r.name === 'Verbs').params.setFontFamily;

  const showFontModalHandler = () => setShowFontModal(true);
  const hideFontModalHandler = () => setShowFontModal(false);
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
      date: new Date(Date.now() + 10 * 1000), // in 60 secs
    });
  };

  return (
    <View style={styles.container}>
      <FontFamilyModal
        visible={showFontModal}
        closeModal={hideFontModalHandler}
        changeFont={changeFontHandler}
      />
      <Text style={styles.title}>Appearance</Text>
      <TouchableOpacity onPress={showFontModalHandler}>
        <View style={styles.fontFamilyCon}>
          <Text style={styles.fontFamilyTitle}>Verbs Font</Text>
          <Text style={styles.fontFamily}>{fontFamily}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  title: {
    color: Colors.highRed,
    fontSize: 17,
    fontWeight: 'bold',
  },
  fontFamilyCon: {
    marginLeft: 20,
    marginTop: 10,
  },
  fontFamilyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fontFamily: {
    color: 'grey',
  },
});

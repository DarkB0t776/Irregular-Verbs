// Core
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Constants
import Colors from '../constants/Colors';

// Other
import EyeIcon from 'react-native-vector-icons/Fontisto';

const Eye = props => {
  return (
    <View style={{ ...styles.eyeContainer, ...props.style }}>
      <EyeIcon name="eye" style={{ ...styles.icon, ...props.iconStyle }} />
    </View>
  )
}

const styles = StyleSheet.create({
  eyeContainer: {
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
  },
  icon: {
    fontSize: 30
  }
});

export default Eye;

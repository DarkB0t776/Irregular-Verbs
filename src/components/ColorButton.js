import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ColorButton = props => {
  let check = null;
  let color = '';
  if (props.style) {
    color = props.style.backgroundColor;
  }

  if (props.wordColor === color) {
    check = <CheckIcon name="check-outline" size={35} />;
    console.log('changed');
  }
  return <View style={{...styles.colorButton, ...props.style}}>{check}</View>;
};

const styles = StyleSheet.create({
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ColorButton;

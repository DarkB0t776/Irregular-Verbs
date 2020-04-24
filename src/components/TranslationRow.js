import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';

const TranslationRow = props => {
  return (
    <Text style={{...styles.translation, ...props.style}}>
      {props.translation.join(', ')}
    </Text>
  );
};

export default TranslationRow;

const styles = StyleSheet.create({
  translation: {
    color: Colors.translationColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

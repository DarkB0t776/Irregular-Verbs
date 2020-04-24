import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/Colors';

const Definition = props => {
  return (
    <>
      <Text style={{...styles.example, ...props.style}}>Приклади:</Text>
      <Text>{props.examples.join(' ')}</Text>
    </>
  );
};

export default Definition;

const styles = StyleSheet.create({
  example: {
    color: Colors.highRed,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

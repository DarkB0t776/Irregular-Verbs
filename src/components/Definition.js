// Core
import React from 'react';
import { StyleSheet, Text } from 'react-native';

// Constants
import Colors from '../constants/Colors';

const Definition = props => {
  return (
    <>
      <Text style={{ ...styles.definition, ...props.style }}>Визначення:</Text>
      <Text>{props.definition}</Text>
    </>
  );
};

export default Definition;

const styles = StyleSheet.create({
  definition: {
    color: Colors.highRed,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

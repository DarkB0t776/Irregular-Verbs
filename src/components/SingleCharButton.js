import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SingleCharButton = ({char}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.char}>{char}</Text>
    </View>
  );
};

export default SingleCharButton;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  char: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

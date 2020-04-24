import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

const FormsTitle = () => {
  return (
    <View style={styles.formsContainer}>
      <Text style={styles.form}>SIMPLE</Text>
      <Text style={styles.form}>PAST SIMP.</Text>
      <Text style={styles.form}>PAST PART.</Text>
    </View>
  );
};

export default FormsTitle;

const styles = StyleSheet.create({
  formsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  form: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

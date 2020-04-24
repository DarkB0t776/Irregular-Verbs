import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Grade = ({percentage}) => {
  let grade = null;
  if (percentage >= 90) {
    grade = <Text style={styles.grade}>A</Text>;
  } else if (percentage >= 80 && percentage <= 89.99) {
    grade = <Text style={styles.grade}>B</Text>;
  } else if (percentage >= 70 && percentage <= 79.99) {
    grade = <Text style={styles.grade}>C</Text>;
  } else if (percentage >= 60 && percentage <= 69.99) {
    grade = <Text style={styles.grade}>D</Text>;
  } else if (percentage > 0 && percentage <= 59.99) {
    grade = <Text style={styles.grade}>F</Text>;
  } else {
    grade = null;
  }

  return <View>{grade}</View>;
};

export default Grade;

const styles = StyleSheet.create({
  grade: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

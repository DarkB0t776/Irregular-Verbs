import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Grade from './Grade';

const ResultCard = ({right, wrong, skipped, exam, percentage}) => {
  let correct = (
    <Text style={{...styles.correct, ...styles.text}}>Correct: {right}</Text>
  );
  let grade = null;

  if (exam) {
    correct = (
      <View style={styles.correctContainer}>
        <Text style={{...styles.correct, ...styles.text}}>
          Correct: {right}
        </Text>
        <Text style={styles.percentage}>({percentage})%</Text>
      </View>
    );
    grade = <Grade percentage={percentage} />;
  }

  return (
    <View style={styles.card}>
      <View>
        {correct}
        <Text style={{...styles.incorrect, ...styles.text}}>
          Incorrect: {wrong}
        </Text>
        <Text style={{...styles.skip, ...styles.text}}>Skip: {skipped}</Text>
      </View>
      {grade}
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'yellow',
    flexDirection: 'row',
    width: '90%',
    height: '30%',
    marginTop: 10,
    paddingLeft: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red',
  },
  skip: {
    color: 'blue',
  },
  correctContainer: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  percentage: {
    marginLeft: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

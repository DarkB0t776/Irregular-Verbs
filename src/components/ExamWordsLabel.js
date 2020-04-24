import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Grade from './Grade';

const ExamWordsLabel = props => {
  const doneWords = props.words.filter(word => word.examed === 1);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (props.words.length > 0) {
          props.navigation.navigate('PracticeWord', {
            words: props.words,
            setWords: props.setWords,
            exam: props.exam,
            setPercentage: props.setPercentage,
          });
        } else {
          return;
        }
      }}>
      <View style={{...styles.container, ...props.style}}>
        <View style={styles.wordsInfoContainer}>
          <Text style={styles.text}>{props.title.toUpperCase()}</Text>
          <View style={styles.scoresContainer}>
            <Text style={styles.wordsQuant}>
              {doneWords.length} / {props.words.length}
            </Text>
            <Text style={styles.percentage}>({props.percentage} %)</Text>
          </View>
        </View>
        <View style={styles.markContainer}>
          <Grade percentage={props.percentage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExamWordsLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 70,
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    width: '85%',
  },
  scoresContainer: {
    flexDirection: 'row',
  },
  wordsQuant: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  percentage: {
    fontWeight: 'bold',
  },
  mark: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

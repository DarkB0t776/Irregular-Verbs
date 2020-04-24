import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const WordsRow = ({word}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word.infinitive.word}</Text>
      <Text style={styles.word}>{word.pastSimple.word}</Text>
      <Text style={styles.word}>{word.pastPart.word}</Text>
    </View>
  );
};

export default WordsRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

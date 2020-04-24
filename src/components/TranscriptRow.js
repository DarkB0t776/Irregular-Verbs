import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Fonts from '../constants/Fonts';

const TranscriptRow = ({word}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.transcript}>{word.infinitive.transcript}</Text>
      <Text style={styles.transcript}>{word.pastSimple.transcript}</Text>
      <Text style={styles.transcript}>{word.pastPart.transcript}</Text>
    </View>
  );
};

export default TranscriptRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  transcript: {
    fontFamily: Fonts.transcription,
  },
});

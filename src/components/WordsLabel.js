import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const WordsLabel = props => {
  const doneWords = props.words.filter(word => word.stars === 3);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (props.words.length > 0) {
          props.navigation.navigate('PracticeWord', {
            words: props.words,
            setWords: props.setWords,
            practice: props.practice,
          });
        } else {
          return;
        }
      }}>
      <View style={{...styles.container, ...props.style}}>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.text}>
          {doneWords.length}/{props.words.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default WordsLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
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
});

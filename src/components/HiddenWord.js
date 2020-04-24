import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QuestionIcon from 'react-native-vector-icons/AntDesign';
import Colors from '../constants/Colors';

const HiddenWord = props => {
  let word = <QuestionIcon name="question" style={styles.icon} />;
  let title = <Text style={styles.text}>{props.title}</Text>;

  if (props.value) {
    if (props.wrong > 0) {
      title = <Text style={styles.wrongTitle}>{props.title}</Text>;
      word = <Text style={styles.wrongWord}>{props.word}</Text>;
    } else {
      title = <Text style={styles.rightTitle}>{props.title}</Text>;
      word = <Text style={styles.rightWord}>{props.word}</Text>;
    }
  }

  return (
    <View style={styles.container}>
      {title}
      {word}
    </View>
  );
};

export default HiddenWord;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  rightTitle: {
    color: Colors.mainGreen,
    fontWeight: 'bold',
  },
  wrongTitle: {
    color: Colors.highRed,
    fontWeight: 'bold',
  },
  rightWord: {
    color: Colors.mainGreen,
    fontWeight: 'bold',
  },
  wrongWord: {
    color: 'black',
    fontWeight: 'bold',
  },
});

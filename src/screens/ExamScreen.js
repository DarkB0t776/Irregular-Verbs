import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import ExamWordsLabel from '../components/ExamWordsLabel';
import Colors from '../constants/Colors';
import DefaultStackHeader from '../components/headers/DefaultStackHeader';

const ExamScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [percentage, setPercentage] = useState(0);

  // console.log(route);

  const words = route.params.words;
  const setWords = route.params.setWords;
  const exam = true;

  const elementaryWords = [...words];

  useEffect(() => {
    let newWords = [...words];
    for (const [idx, word] of newWords.entries()) {
      newWords[idx].infinitive.wrong = 0;
      newWords[idx].infinitive.right = 0;
      newWords[idx].pastSimple.wrong = 0;
      newWords[idx].pastSimple.right = 0;
      newWords[idx].pastPart.wrong = 0;
      newWords[idx].pastPart.right = 0;
      newWords[idx].skipped = 0;
    }

    setWords(newWords);
  });

  navigation.setOptions({
    header: props => <DefaultStackHeader {...props} screenName="Exam Words" />,
  });

  return (
    <ImageBackground
      source={require('../../assets/images/wood-bg.jpg')}
      style={styles.bgImg}>
      <ExamWordsLabel
        title="elementary"
        words={elementaryWords}
        style={{backgroundColor: Colors.examYellow}}
        setWords={setWords}
        navigation={navigation}
        exam={exam}
        percentage={percentage}
        setPercentage={setPercentage}
      />
    </ImageBackground>
  );
};



export default ExamScreen;


const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

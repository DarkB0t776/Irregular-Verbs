// Core
import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Components
import WordsLabel from '../components/WordsLabel';
import DefaultStackHeader from '../components/headers/DefaultStackHeader';

const PracticeAllScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const words = route.params.words;
  const setWords = route.params.setWords;
  const practice = true;

  const blueWords = words.filter(item => item.color === '#76D3F5');
  const yellowWords = words.filter(item => item.color === '#F7D257');
  const greenWords = words.filter(item => item.color === '#63E244');
  const redWords = words.filter(item => item.color === '#F55757');

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
    header: props => <DefaultStackHeader {...props} screenName="Practice Words" />
  });

  return (
    <ImageBackground
      source={require('../../assets/images/wood-bg.jpg')}
      style={styles.bgImg}>
      <WordsLabel
        title="All Words"
        words={words}
        setWords={setWords}
        navigation={navigation}
        practice={practice}
      />

      <WordsLabel
        title="Blue Words"
        words={blueWords}
        style={{ backgroundColor: '#76D3F5' }}
        setWords={setWords}
        navigation={navigation}
        practice={practice}
      />

      <WordsLabel
        title="Yellow Words"
        words={yellowWords}
        style={{ backgroundColor: '#F7D257' }}
        setWords={setWords}
        navigation={navigation}
        practice={practice}
      />

      <WordsLabel
        title="Green Words"
        words={greenWords}
        style={{ backgroundColor: '#63E244' }}
        setWords={setWords}
        navigation={navigation}
        practice={practice}
      />

      <WordsLabel
        title="Red Words"
        words={redWords}
        style={{ backgroundColor: '#F55757' }}
        setWords={setWords}
        navigation={navigation}
        practice={practice}
      />
    </ImageBackground>
  );
};

export default PracticeAllScreen;

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

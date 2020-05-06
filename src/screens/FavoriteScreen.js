// Core
import React, { useState, useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

// Components
import FormsTitle from '../components/FormsTitle';
import VerbsList from '../components/VerbsList';

const FavoriteScreen = () => {
  const state = useNavigationState(state => state);
  const [favoriteWords, setFavoriteWords] = useState([]);

  const words = state?.routes.find(r => r.name === 'Verbs').params.words;
  const fontFamily = state?.routes.find(r => r.name === 'Verbs').params
    .fontFamily;
  const fontSize = state?.routes.find(r => r.name === 'Verbs').params.fontSize;
  const showSimple = state?.routes.find(r => r.name === 'Verbs').params.showSimpleSection;
  const showPast = state?.routes.find(r => r.name === 'Verbs').params.showPastSection;
  const showPastPart = state?.routes.find(r => r.name === 'Verbs').params.showPastPartSection;
  const showTranslation = state?.routes.find(r => r.name === 'Verbs').params.showTranslationSection;


  useEffect(() => {
    if (state) {
      const favWords = state.routes
        .find(r => r.name === 'Verbs')
        .params.words.filter(w => w.stars === 3);
      setFavoriteWords(favWords);
    }
  }, [words]);
  return (
    <View style={styles.container}>
      <FormsTitle />
      <VerbsList
        showSimple={showSimple}
        showPast={showPast}
        showPastPart={showPastPart}
        showTranslation={showTranslation}
        data={favoriteWords}
        font={fontFamily}
        fontSize={fontSize}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});

// Core
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

// Components
import FormsTitle from '../components/FormsTitle';
import VerbsList from '../components/VerbsList';

const PracticeScreen = () => {
  const state = useNavigationState(state => state);
  const words = state?.routes.find(r => r.name === 'Verbs').params.words;
  const fontFamily = state?.routes.find(r => r.name === 'Verbs').params
    .fontFamily;
  const fontSize = state?.routes.find(r => r.name === 'Verbs').params.fontSize;

  return (
    <View>
      <FormsTitle />
      <VerbsList data={words} practiceScreen font={fontFamily} fontSize={fontSize} />
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({});

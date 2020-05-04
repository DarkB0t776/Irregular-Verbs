// Core
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

// Components
import FormsTitle from '../components/FormsTitle';
import VerbsList from '../components/VerbsList';

const PracticeScreen = () => {
  const state = useNavigationState(state => state);
  const words = state?.routes.find(r => r.name === 'Verbs').params.words;
  return (
    <View>
      <FormsTitle />
      <VerbsList data={words} practiceScreen />
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({});

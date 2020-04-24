import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import ArrowLeft from 'react-native-vector-icons/AntDesign';

const DefaultStackHeader = ({screenName, navigation, exam, scene}) => {
  console.log(scene);
  const words = scene.route.params.words;
  const setWords = scene.route.params.setAllWords || scene.route.params.setWords;
  const setPercentage = scene.route.params.setPercentage;

  //Handle navigation
  const navigationHandler = () => {
    if (exam) {
      return navigation.navigate('MainPractice', {
        screen: 'Exam',
        params: {
          words,
          setWords,
          setPercentage,
        },
      });
    }

    if (scene.route.name === 'PracticeAll' || scene.route.name === 'Exam') {
      return navigation.navigate('Main', {screen: 'Verbs'});
    }
    return navigation.navigate('MainPractice', {screen: 'PracticeAll'});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigationHandler}>
        <ArrowLeft name="arrowleft" style={styles.arrowIcon} />
      </TouchableOpacity>
      <Text style={styles.screenName}>{screenName}</Text>
    </View>
  );
};

export default DefaultStackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 15,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 35,
    marginRight: 10,
  },
  screenName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

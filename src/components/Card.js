import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorButton from './ColorButton';
import WordsRow from './WordsRow';
import TranscriptRow from './TranscriptRow';
import SoundRow from './SoundRow';
import TranslationRow from './TranslationRow';
import Definition from './Definition';
import Examples from './Examples';
import Images from '../constants/Images';
import CardIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Star from './Star';
import QuestionIcon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;

const Card = ({
  word,
  changeColor,
  hideModal,
  allWords,
  navigation,
  cards,
  showSection,
  refreshList,
  playLoop,
  getSounds,
  cardScreen,
}) => {
  let star1 = <Star name="star-outlined" key="1" />;
  let star2 = <Star name="star-outlined" key="2" />;
  let star3 = <Star name="star-outlined" key="3" />;

  let imageSrc;
  let key = word.infinitive.word;

  if (Images[key]) {
    imageSrc = Images[key].imageSource;
  }

  let iconsSection = (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          if (allWords) {
            navigation.navigate('MainPractice', {
              screen: 'Cards',
              params: {words: allWords, changeColor},
            });
            hideModal();
          } else {
            return;
          }
        }}>
        <CardIcon name="card-bulleted-outline" size={35} />
      </TouchableOpacity>
      <TouchableOpacity onPress={hideModal}>
        <Icon name="md-close" size={35} />
      </TouchableOpacity>
    </View>
  );

  if (word.stars === 1) {
    star1 = <Star name="star" key="1" />;
  }
  if (word.stars === 2) {
    star2 = <Star name="star" key="2" />;
    star1 = <Star name="star" key="1" />;
  }
  if (word.stars === 3) {
    star3 = <Star name="star" key="3" />;
    star2 = <Star name="star" key="2" />;
    star1 = <Star name="star" key="1" />;
  }

  if (cards) {
    iconsSection = (
      <View style={styles.starsContainer}>
        {star1}
        {star2}
        {star3}
      </View>
    );
  }

  let section = (
    <View>
      <View style={styles.wordsContainer}>
        <WordsRow word={word} />
      </View>
      <View style={styles.transcriptContainer}>
        <TranscriptRow word={word} />
      </View>
      <View style={styles.soundContainer}>
        <SoundRow
          infinitive={word.infinitive.audio}
          pastSimple={word.pastSimple.audio}
          pastPart={word.pastPart.audio}
          playLoop={playLoop}
          getSounds={getSounds}
        />
      </View>
    </View>
  );

  if (showSection) {
    section = (
      <View style={styles.questionContainer}>
        <QuestionIcon name="question" style={styles.questionIcon} />
        <QuestionIcon name="question" style={styles.questionIcon} />
        <QuestionIcon name="question" style={styles.questionIcon} />
      </View>
    );
  }

  const changeColorHandler = (color, wordId) => {
    if (changeColor) {
      changeColor(color, wordId);
      refreshList ? refreshList() : null;
    } else {
      return;
    }
  };

  return (
    <View style={{...styles.content, width: cardScreen ? windowWidth : '100%'}}>
      {iconsSection}
      <View style={styles.colorsContainer}>
        <TouchableOpacity
          onPress={() => {
            changeColorHandler('white', word.id);
          }}>
          <ColorButton wordColor={word.color} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeColorHandler('#76D3F5', word.id);
          }}>
          <ColorButton
            wordColor={word.color}
            style={{backgroundColor: '#76D3F5'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeColorHandler('#F7D257', word.id);
          }}>
          <ColorButton
            wordColor={word.color}
            style={{backgroundColor: '#F7D257'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeColorHandler('#63E244', word.id);
          }}>
          <ColorButton
            wordColor={word.color}
            style={{backgroundColor: '#63E244'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changeColorHandler('#F55757', word.id);
          }}>
          <ColorButton
            wordColor={word.color}
            style={{backgroundColor: '#F55757'}}
          />
        </TouchableOpacity>
      </View>
      {section}
      <View style={styles.translateContainer}>
        <TranslationRow translation={word.ua} />
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSrc} />
      </View>
      <View style={styles.definitionContainer}>
        <Definition definition={word.definition} />
      </View>
      <View style={styles.exampleContainer}>
        <Examples examples={word.examples} />
      </View>
    </View>
  );
};

export default Card;


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'yellow',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  colorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  wordsContainer: {
    marginBottom: 10,
  },
  transcriptContainer: {
    marginBottom: 8,
  },
  soundContainer: {
    marginBottom: 8,
  },
  translateContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  imageContainer: {
    width: '80%',
    height: '25%',
    marginHorizontal: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  definitionContainer: {
    paddingHorizontal: 10,
  },
  exampleContainer: {
    paddingHorizontal: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  questionIcon: {
    fontSize: 55,
  },
});

import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Images from '../constants/Images';
import Colors from '../constants/Colors';
import MyModal from './modals/Mymodal';
import QuestionIcon from 'react-native-vector-icons/AntDesign';
import PracticeInput from '../components/PracticeInput';
import HiddenWord from '../components/HiddenWord';
import Star from '../components/Star';

const PracticeWordCard = props => {
  let imageSrc;
  let key = props.word.infinitive.word;

  const [modal, setModal] = useState(false);
  let star1 = <Star name="star-outlined" key="1" />;
  let star2 = <Star name="star-outlined" key="2" />;
  let star3 = <Star name="star-outlined" key="3" />;
  let practiceInput = (
    <PracticeInput
      value={props.userInput}
      onChangeHandler={props.setInfinitive}
      refInput={props.userInputRef}
    />
  );

  if (props.done && !props.needPractice) {
    practiceInput = <Text style={styles.doneText}>Excellent</Text>;
  }

  if (props.done && props.needPractice) {
    practiceInput = (
      <Text style={styles.needPractice}>You need more practice</Text>
    );
  }

  if (props.practice) {
    const changeStar = () => {
      if (props.word.stars === 1) {
        star1 = <Star name="star" style={{color: Colors.mainGreen}} key="1" />;
      }
      if (props.word.stars === 2) {
        star2 = <Star name="star" style={{color: Colors.mainGreen}} key="2" />;
        star1 = <Star name="star" style={{color: Colors.mainGreen}} key="1" />;
      }
      if (props.word.stars === 3) {
        star3 = <Star name="star" style={{color: Colors.mainGreen}} key="3" />;
        star2 = <Star name="star" style={{color: Colors.mainGreen}} key="2" />;
        star1 = <Star name="star" style={{color: Colors.mainGreen}} key="1" />;
      }
    };

    changeStar();
  }

  let header = null;

  if (props.practice) {
    header = (
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <QuestionIcon name="questioncircleo" style={styles.questIcon} />
        </TouchableOpacity>
        <View style={styles.starContainer}>
          {star1}
          {star2}
          {star3}
        </View>
      </View>
    );
  }

  if (props.exam && props.done) {
    header = (
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <QuestionIcon name="questioncircleo" style={styles.questIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  const hideModal = () => {
    setModal(false);
  };

  if (Images[key]) {
    imageSrc = Images[key].imageSource;
  }

  return (
    <View style={styles.card}>
      <MyModal hideModal={hideModal} modalVisible={modal} verb={props.word} />
      {header}
      <View style={styles.imageContainer}>
        <Image source={imageSrc} style={styles.image} />
      </View>
      <Text style={styles.definition}>{props.word.definition}</Text>
      <Text style={styles.translation}>{props.word.ua.join(', ')}</Text>
      <View style={styles.hiddenWordContainer}>
        <HiddenWord
          title="1.INF"
          value={props.inf}
          word={props.word.infinitive.word}
          wrong={props.word.infinitive.wrong}
        />
        <HiddenWord
          title="2.PS"
          value={props.past}
          word={props.word.pastSimple.word}
          wrong={props.word.pastSimple.wrong}
        />
        <HiddenWord
          title="3.PP"
          value={props.pastPart}
          word={props.word.pastPart.word}
          wrong={props.word.pastPart.wrong}
        />
      </View>
      <View style={styles.inputContainer}>{practiceInput}</View>
    </View>
  );
};

export default PracticeWordCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'yellow',
    height: '70%',
    width: '95%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questIcon: {
    fontSize: 35,
    marginLeft: 5,
    marginTop: 5,
  },
  starContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '70%',
    height: '40%',
    marginHorizontal: 30,
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  definition: {
    textAlign: 'center',
  },
  translation: {
    textAlign: 'center',
    color: Colors.translationColor,
    fontWeight: 'bold',
  },
  hiddenWordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  doneText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.mainGreen,
  },
  needPractice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import PracticeWordCard from '../components/PracticeWordCard';
import CharButtons from '../components/CharButtons';
import DefaultStackHeader from '../components/headers/DefaultStackHeader';

const shuffle = arr => {
  let ctr = arr.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

let done = false;
let flag = false;
let needPractice = false;

const PracticeWordScreen = ({route, navigation}) => {
  const setAllWords = route.params.setWords;
  const [words, setWords] = useState(route.params.words);
  const [wordIdx, setWordIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [chars, setChars] = useState([]);
  const [inf, setInf] = useState(false);
  const [past, setPast] = useState(false);
  const [pastPart, setPastPart] = useState(false);
  const [i, setI] = useState(0);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const userInputRef = useRef();
  const [last, setLast] = useState(false);


  const infinitive = words[wordIdx].infinitive.word.split('');
  const pastSimple = words[wordIdx].pastSimple.word.split('');
  const pastPt = words[wordIdx].pastPart.word.split('');
  const mistakes =
    words[wordIdx].infinitive.wrong +
    words[wordIdx].pastSimple.wrong +
    words[wordIdx].pastPart.wrong;

  const infinitChars = [...infinitive, 'y', 'w', 'z', 'm', 's'];
  const pastChars = [...pastSimple, 'y', 'w', 'z', 'm', 's'];
  const ptChars = [...pastPt, 'y', 'w', 'z', 'm', 's'];

  let practice = null;
  let exam = null;
  if (route.params.exam) {
    practice = false;
    exam = route.params.exam;
  }
  if (route.params.practice) {
    exam = false;
    practice = route.params.practice;
  }

  useEffect(() => {
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
    resetData();
    animation();
  }, []);

  useEffect(() => {
    animation();
    resetData();
    setChars(shuffle(infinitChars));
    if (words.length - 1 === wordIdx) {
      setLast(true);
    }
    done = false;
    flag = false;
    needPractice = false;
  }, [wordIdx]);

  useEffect(() => {
    animation();
    setChars(shuffle(pastChars));
  }, [inf]);

  useEffect(() => {
    animation();
    setChars(shuffle(ptChars));
  }, [past]);

  useEffect(() => {
    animation();
    setChars(shuffle(infinitChars));
  }, [pastPart]);

  const nextHandler = () => {
    if (!inf && !past && !pastPart) {
      let newWords = [...words];
      newWords[wordIdx].skipped = 1;
      setWords(newWords);
    }
    setI(0);
    setWordIdx(prevIdx => {
      return (prevIdx + 1) % words.length;
    });
  };

  if (userInput === words[wordIdx].infinitive.word && !inf) {
    setInf(true);
    setI(0);
    setUserInput('');
    setFadeAnim(new Animated.Value(0));
    let newWords = [...words];
    setWords(newWords);
  }

  if (userInput === words[wordIdx].pastSimple.word && inf && !past) {
    setPast(true);
    setI(0);
    setUserInput('');
    setFadeAnim(new Animated.Value(0));
  }

  if (userInput === words[wordIdx].pastPart.word && inf && past) {
    setPastPart(true);
    setI(0);
    setUserInput('');
    done = true;
    flag = true;

    if (mistakes > 0) {
      needPractice = true;
    }

    if (exam && mistakes < 1) {
      const newWords = [...words];
      newWords[wordIdx].examed = 1;
      setWords(newWords);
    }
    setFadeAnim(new Animated.Value(0));
  }

  const checkChar = (char, word) => {
    while (i <= word.length) {
      if (char !== word[i]) {
        let newWords = [...words];

        if (words[wordIdx].infinitive.word === word.join('') && !inf) {
          newWords[wordIdx].infinitive.wrong += 1;
          setWords(newWords);
        } else if (words[wordIdx].pastSimple.word === word.join('') && !past) {
          newWords[wordIdx].pastSimple.wrong += 1;
          setWords(newWords);
        } else {
          newWords[wordIdx].pastPart.wrong += 1;
          setWords(newWords);
        }
        break;
      } else {
        setUserInput(prevChar => prevChar + char);
        const charIdx = chars.findIndex(item => item === char);
        let newChars = [...chars];
        newChars.splice(charIdx, 1);
        setChars(newChars);
        setI(i => i + 1);
        break;
      }
    }
  };

  const onPressHandler = char => {
    if (inf && past && pastPart) {
      return;
    }
    if (!inf) {
      checkChar(char, infinitive);
    }
    if (inf && !past) {
      checkChar(char, pastSimple);
    }
    if (past) {
      checkChar(char, pastPt);
    }
  };

  const animation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  const resetData = () => {
    setInf(false);
    setPast(false);
    setPastPart(false);
    setUserInput('');
  };

  const buttons = (
    <CharButtons
      chars={chars}
      skip={nextHandler}
      onPress={onPressHandler}
      hideNextBtn={last}
    />
  );

  let footer = (
    <Animated.View style={{opacity: fadeAnim}}>{buttons}</Animated.View>
  );
  if (done && flag && practice) {
    flag = false;
    let newWords = [...words];
    if (newWords[wordIdx].stars < 3) newWords[wordIdx].stars += 1;
    setWords(newWords);
  }

  if (inf && past && pastPart && words.length - 1 === wordIdx) {
    footer = (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PracticeResults', {
            words,
            setAllWords,
            practice,
            exam,
            setPercentage: route.params.setPercentage,
          })
        }>
        <View style={styles.resultBtn}>
          <Text style={styles.resultBtnText}>Result</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (exam) {
    navigation.setOptions({
      header: props => (
        <DefaultStackHeader {...props} exam={exam} screenName="Exam" />
      ),
    });
  } else {
    navigation.setOptions({
      header: props => <DefaultStackHeader {...props} screenName="Practice" />,
    });
  }

  return (
    <ImageBackground
      source={require('../../assets/images/wood-bg.jpg')}
      style={styles.bgImg}>
      <PracticeWordCard
        word={words[wordIdx]}
        userInput={userInput}
        userInputRef={userInputRef}
        inf={inf}
        past={past}
        pastPart={pastPart}
        done={done}
        needPractice={needPractice}
        practice={practice}
        exam={exam}
      />
      {footer}
    </ImageBackground>
  );
};

export default PracticeWordScreen;

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  container: {
    flex: 1,
  },
  resultBtn: {
    width: 150,
    height: 70,
    marginTop: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

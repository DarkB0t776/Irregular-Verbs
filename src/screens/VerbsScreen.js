import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FormsTitle from '../components/FormsTitle';
import verbsData from '../../database/verbs';
import VerbsList from '../components/VerbsList';
import MyModal from '../components/modals/Mymodal';
import SortModal from '../components/modals/SortModal';
import FontSizeModal from '../components/modals/FontSizeModal';
import {useNavigation} from '@react-navigation/native';


const VerbsScreen = () => {
  const [verbs, setVerbs] = useState([]);
  const [showWordModal, setShowWordModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [fontSize, setFontSize] = useState(15);
  const navigation = useNavigation();

  useEffect(() => {
    setVerbs(verbsData);
  }, []);


  useEffect(() => {
    navigation.setParams({
      words: verbs,
      setWords: setVerbs,
      showSortModal: showSortModalHandler,
      changeColor,
      showFontModal: showFontSizeModalHandler,
    });
  }, [verbs]);

  //Modal Handlers
  const showWordModalHandler = word => {
    setSelectedWord(word);
    setShowWordModal(true);
  };

  const hideWordModalHandler = () => setShowWordModal(false);
  const showSortModalHandler = () => setShowSortModal(true);
  const closeSortModalHandler = () => setShowSortModal(false);
  const showFontSizeModalHandler = () => setShowFontModal(true);
  const closeFontSizeModalHandler = () => setShowFontModal(false);

  const changeColor = (color, id) => {
    const wordIdx = verbs.findIndex(item => item.id === id);
    const newArr = [...verbs];
    newArr[wordIdx].color = color;
    setVerbs(newArr);
  };

  // Sort Handlers
  const alphabeticalSort = () => {
    const sortedWords = verbs.sort((a, b) => {
      const wordA = a.infinitive.word.toUpperCase();
      const wordB = b.infinitive.word.toUpperCase();
      if (wordA < wordB) return -1;
      if (wordA > wordB) return 1;

      return 0;
    });
    setVerbs(sortedWords);
  };

  const colorSort = () => {
    const sortedWords = verbs.sort((a, b) => {
      const wordA = a.color.toUpperCase();
      const wordB = b.color.toUpperCase();
      if (wordA < wordB) return -1;
      if (wordA > wordB) return 1;

      return 0;
    });
    setVerbs(sortedWords);
  };

  const sortList = {
    alphabetic: alphabeticalSort,
    color: colorSort,
  };

  //Font Size Handlers
  const increaseFontSize = () => {
    if (fontSize >= 45) return;
    setFontSize(prevSize => (prevSize += 1));
  };

  const decreaseFontSize = () => {
    if (fontSize <= 10) return;
    setFontSize(prevSize => (prevSize -= 1));
  };

  let wordModal = (
    <MyModal
      hideModal={hideWordModalHandler}
      modalVisible={showWordModal}
      verb={selectedWord}
      changeColor={changeColor}
      allWords={verbs}
    />
  );

  let sortModal = (
    <SortModal
      visible={showSortModal}
      closeModal={closeSortModalHandler}
      sortList={sortList}
    />
  );

  let fontSizeModal = (
    <FontSizeModal
      visible={showFontModal}
      fontSize={fontSize}
      increase={increaseFontSize}
      decrease={decreaseFontSize}
      closeModal={closeFontSizeModalHandler}
    />
  );

  if (Object.keys(selectedWord).length === 0) {
    wordModal = null;
  }

  return (
    <View style={styles.container}>
      {wordModal}
      {sortModal}
      {fontSizeModal}
      <FormsTitle />
      <VerbsList data={verbs} showModal={showWordModalHandler} fontSize={fontSize} />
    </View>
  );
};

export default VerbsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

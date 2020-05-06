// Core
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import FormsTitle from '../components/FormsTitle';
import verbsData from '../../database/verbs';
import VerbsList from '../components/VerbsList';
import MyModal from '../components/modals/Mymodal';
import SortModal from '../components/modals/SortModal';
import FontSizeModal from '../components/modals/FontSizeModal';
import Eye from '../components/Eye';

const VerbsScreen = () => {
  const [verbs, setVerbs] = useState([]);
  const [showWordModal, setShowWordModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState({});
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);
  const [showEyeIcons, setShowEyeIcons] = useState(false);
  const [showSimpleSection, setShowSimpleSection] = useState(true);
  const [showPastSection, setShowPastSection] = useState(true);
  const [showPastPartSection, setShowPastPartSection] = useState(true);
  const [showTranslationSection, setShowTranslationSection] = useState(true);
  const [searchedWords, setSearchedWords] = useState([]);
  const [fontSize, setFontSize] = useState(15);
  const [fontFamily, setFontFamily] = useState('Android Standard');
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setParams({
      showEyeIcons: showEyeIconsHandler,
    })
  }, [showEyeIcons]);


  useEffect(() => {
    setVerbs(verbsData);
    setSearchedWords(verbsData);
    navigation.setParams({
      showEyeIcons: showEyeIconsHandler,
      showFontModal: showFontSizeModalHandler,
      showSortModal: showSortModalHandler,
    })
  }, []);

  useEffect(() => {
    navigation.setParams({
      onSearchHandler,
    });
  }, [searchedWords]);


  useEffect(() => {
    navigation.setParams({
      fontFamily,
      setFontFamily,
      fontSize,
    });
  }, [fontFamily, fontSize]);

  useEffect(() => {
    navigation.setParams({
      words: verbs,
      setWords: setVerbs,
      changeColor,
    });
  }, [verbs]);

  //Search handler
  const onSearchHandler = words => {
    setSearchedWords(words);
  };


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

  // Show eye icons handler
  const showEyeIconsHandler = () => setShowEyeIcons(!showEyeIcons);

  const changeColor = (color, id) => {
    const wordIdx = verbs.findIndex(item => item.id === id);
    const newArr = [...verbs];
    newArr[wordIdx].color = color;
    setVerbs(newArr);
  };

  // Sort Handlers
  const alphabeticalSort = () => {
    const sortedWords = searchedWords.sort((a, b) => {
      const wordA = a.infinitive.word.toUpperCase();
      const wordB = b.infinitive.word.toUpperCase();
      if (wordA < wordB) return -1;
      if (wordA > wordB) return 1;

      return 0;
    });
    setSearchedWords(sortedWords);
  };

  const colorSort = () => {
    const sortedWords = searchedWords.sort((a, b) => {
      const wordA = a.color.toUpperCase();
      const wordB = b.color.toUpperCase();
      if (wordA < wordB) return -1;
      if (wordA > wordB) return 1;

      return 0;
    });
    setSearchedWords(sortedWords);
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

  let eyeIcons = (
    <>
      <View style={{ ...styles.eyeContainer, top: 230, left: 30 }}>
        <TouchableOpacity onPress={() => setShowSimpleSection(!showSimpleSection)}>
          <Eye />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.eyeContainer, top: 230, left: 150 }}>
        <TouchableOpacity onPress={() => setShowPastSection(!showPastSection)}>
          <Eye style={{}} />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.eyeContainer, top: 230, left: 260 }}>
        <TouchableOpacity onPress={() => setShowPastPartSection(!showPastPartSection)}>
          <Eye />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.eyeContainer, top: 150, right: 20 }}>
        <TouchableOpacity onPress={() => setShowTranslationSection(!showTranslationSection)}>
          <Eye style={{ width: 40, height: 40 }} iconStyle={{ fontSize: 20 }} />
        </TouchableOpacity>
      </View>
    </>
  );

  console.log(showSimpleSection);

  return (
    <View style={styles.container}>
      {wordModal}
      {sortModal}
      {fontSizeModal}
      <FormsTitle />
      {showEyeIcons ? eyeIcons : null}
      <VerbsList
        showSimple={showSimpleSection}
        showPast={showPastSection}
        showPastPart={showPastPartSection}
        showTranslation={showTranslationSection}
        data={searchedWords}
        showModal={showWordModalHandler}
        fontSize={fontSize}
        font={fontFamily}
      />
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
  eyeContainer: {
    position: 'absolute',
    zIndex: 2
  }
});

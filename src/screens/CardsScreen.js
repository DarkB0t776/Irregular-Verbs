import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import Card from '../components/Card';
import CardHeader from '../components/headers/CardHeader';

const CardsScreen = ({route, navigation}) => {
  let currentIdx = 0;
  const words = route.params.words;
  const changeColor = route.params.changeColor;
  const cards = true;
  const flatListRef = useRef();
  const [showSection, setShowSection] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [playLoop, setPlayLoop] = useState(false);
  const [idx, setIdx] = useState(0);
  const [term, setTerm] = useState('');
  const sounds = [];

  useEffect(() => {
    for (const word of words) {
      if (
        word.infinitive.word === term ||
        word.pastSimple.word === term ||
        word.pastPart.word === term
      ) {
        const idxW = words.indexOf(word);
        flatListRef.current.scrollToIndex({
          index: idxW,
          animated: true,
        });
      }
    }
  });

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: idx,
      animated: true,
    });
  }, [idx]);

  const showSectionHandler = () => {
    setShowSection(!showSection);
  };
  const refreshListHandler = () => {
    setRefresh(!refresh);
  };

  const startPlaySounds = () => {
    setPlayLoop(!playLoop);
  };

  const onSearchHandler = searchTerm => {
    setTerm(searchTerm);
  };

  navigation.setOptions({
    header: props => (
      <CardHeader
        {...props}
        showSectionHandler={showSectionHandler}
        onPlayLoop={startPlaySounds}
        playLoop={playLoop}
        term={term}
        onSearchHandler={onSearchHandler}
        words={words}
        sounds={sounds}
        setIdx={setIdx}
        idx={idx}
        wordsLength={words.length - 1}
      />
    ),
  });
  const getSounds = (sound1, sound2, sound3) => {
    sounds.push(sound1, sound2, sound3);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        getItemLayout={(data, index) => ({
          length: 360,
          offset: 360 * index,
          index,
        })}
        pagingEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        data={words}
        extraData={refresh}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.cardContainer}>
              <Card
                cardScreen={true}
                word={item}
                changeColor={changeColor}
                cards={cards}
                showSection={showSection}
                refreshList={refreshListHandler}
                playLoop={playLoop}
                getSounds={getSounds}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default CardsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
  cardContainer: {
    flex: 1,
  },
});

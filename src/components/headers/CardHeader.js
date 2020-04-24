import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import mapSeries from 'async/mapSeries';
import ArrowLeft from 'react-native-vector-icons/AntDesign';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import EyeIcon from 'react-native-vector-icons/Ionicons';
import PlayIcon from 'react-native-vector-icons/MaterialIcons';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import MaterialTabs from 'react-native-material-tabs';

const CardHeader = ({
  showSectionHandler,
  onPlayLoop,
  playLoop,
  term,
  onSearchHandler,
  words,
  sounds,
  setIdx,
  idx,
  wordsLength,
}) => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current?.focus();
  });

  const hideSearch = () => {
    onSearchHandler('');
    if (term.length === 0) {
      setShowSearch(false);
    }
  };
  const playSounds = () => {
    let i = 0;
    return mapSeries(sounds, (item, callback) => {
      const soundIdx = sounds.indexOf(item);

      item.play(success => {
        console.log(`i - ${i}, wordsLength - ${wordsLength}`);

        if ((soundIdx + 1) % 3 === 0) {
          if (i === wordsLength) return;
          setIdx(prevIdx => prevIdx + 1);
          i++;
        }
        callback();
      });
    });
  };

  let rightsSection = (
    <View style={styles.rightSection}>
      <TouchableOpacity
        onPress={() => {
          setShowSearch(true);
        }}>
        <SearchIcon name="search" style={styles.searchIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={showSectionHandler}>
        <EyeIcon name="md-eye" style={styles.eyeIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          onPlayLoop();
          await playSounds();
        }}>
        <PlayIcon name="play-circle-outline" style={styles.playIcon} />
      </TouchableOpacity>
    </View>
  );

  if (showSearch) {
    rightsSection = (
      <View style={styles.searchContainer}>
        <TextInput
          autoCapitalize="none"
          value={term}
          onChangeText={onSearchHandler}
          style={styles.search}
          placeholder="Search..."
          ref={searchRef}
        />
        <TouchableOpacity onPress={hideSearch}>
          <CloseIcon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => navigation.navigate('Main', {screen: 'Verbs'})}>
            <ArrowLeft name="arrowleft" style={styles.arrowLeft} />
          </TouchableOpacity>
          <Text style={styles.title}>Cards</Text>
        </View>
        {rightsSection}
      </View>
      <View style={styles.listContainer}>
        <MaterialTabs
          items={words.map(item => item.infinitive.word)}
          selectedIndex={idx}
          barColor="green"
        />
      </View>
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  header: {},
  container: {
    height: 40,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    marginTop: 7,
  },
  arrowLeft: {
    fontSize: 30,
    color: 'white',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
  },
  search: {
    width: '70%',
    fontSize: 17,
    backgroundColor: '#259631',
    borderRadius: 5,
    marginRight: 10,
  },
  closeIcon: {
    fontSize: 25,
    color: 'white',
  },
  rightSection: {
    flexDirection: 'row',
    marginTop: 7,
  },
  searchIcon: {
    fontSize: 25,
    color: 'white',
  },
  eyeIcon: {
    fontSize: 25,
    color: 'white',
    marginHorizontal: 25,
  },
  playIcon: {
    fontSize: 25,
    color: 'white',
    marginRight: 20,
  },
  listContainer: {
    backgroundColor: 'green',
    height: 55,
    paddingTop: 10,
  },
  tabContainer: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  tab: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

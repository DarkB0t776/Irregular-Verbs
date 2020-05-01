import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import MenuIcon from 'react-native-vector-icons/Entypo';
import SchoolIcon from 'react-native-vector-icons/Ionicons';
import PracticeModal from '../modals/PracticeModal';
import MaterialTabs from 'react-native-material-tabs';
import CloseIcon from 'react-native-vector-icons/AntDesign';

const SCREEN_NAMES = ['Verbs', 'Favorite', 'Practice'];

const Header = ({navigation, state}) => {
  const [modal, setModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [term, setTerm] = useState('');
  const searchRef = useRef();
  let words = [];
  let setWords = null;
  let onSearchHandler = null;

  useEffect(() => {
    searchRef.current?.focus();
  });

  useEffect(() => {
    if (onSearchHandler) {
      onSearchHandler(
        words?.filter(
          word =>
            word.infinitive.word.includes(term) ||
            word.pastSimple.word.includes(term) ||
            word.pastPart.word.includes(term),
        ),
      );
    }
  }, [term]);

  if (state) {
    words = state.routes.find(r => r.name === 'Verbs').params?.words;
    setWords = state.routes.find(r => r.name === 'Verbs').params?.setWords;
    onSearchHandler = state.routes.find(r => r.name === 'Verbs').params
      ?.onSearchHandler;
  }

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    setModal(false);
  };

  let mainSection = (
    <>
      <Text style={styles.title}>COLOR VERBS</Text>
      <TouchableOpacity onPress={() => setShowSearch(true)}>
        <Icon name="search" style={styles.searchIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={showModal}>
        <SchoolIcon name="md-school" style={styles.schoolIcon} />
      </TouchableOpacity>
    </>
  );

  console.log(term);

  if (showSearch) {
    mainSection = (
      <>
        <TextInput
          style={styles.search}
          autoCapitalize="none"
          value={term}
          onChangeText={setTerm}
          placeholder="Search..."
          ref={searchRef}
        />
        <TouchableOpacity
          onPress={() => {
            setShowSearch(false);
            setTerm('');
          }}>
          <CloseIcon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={styles.header}>
      <PracticeModal
        visible={modal}
        hideModal={hideModal}
        navigation={navigation}
        words={words}
        setWords={setWords}
      />
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MenuIcon name="menu" style={styles.menuIcon} />
        </TouchableOpacity>
        {mainSection}
      </View>
      <View>
        <MaterialTabs
          items={SCREEN_NAMES}
          selectedIndex={state.index}
          barColor="red"
          indicatorColor="#fff"
          onChange={index => {
            navigation.navigate(SCREEN_NAMES[index]);
          }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    height: 70,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuIcon: {
    color: 'white',
    fontSize: 30,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  searchIcon: {
    color: 'white',
    fontSize: 30,
  },
  search: {
    width: '70%',
    fontSize: 15,
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginRight: 0,
  },
  closeIcon: {
    fontSize: 25,
    color: 'white',
  },
  schoolIcon: {
    color: 'white',
    fontSize: 30,
  },
  label: {
    marginHorizontal: 10,
    marginTop: 13,
    marginLeft: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  drawerMenu: {
    backgroundColor: 'black',
    width: '50%',
    height: '50%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  tabLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

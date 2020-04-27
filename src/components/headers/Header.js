import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import MenuIcon from 'react-native-vector-icons/Entypo';
import SchoolIcon from 'react-native-vector-icons/Ionicons';
import PracticeModal from '../modals/PracticeModal';
import MaterialTabs from 'react-native-material-tabs';

const SCREEN_NAMES = ['Verbs', 'Favorite', 'Practice'];

const Header = ({navigation, state}) => {
  const [modal, setModal] = useState(false);
  let words = [];
  let setWords = null;

  if (state) {
    words = state.routes.find(r => r.name === 'Verbs').params?.words;
    setWords = state.routes.find(r => r.name === 'Verbs').params?.setWords;
  }

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    setModal(false);
  };

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
        <Text style={styles.title}>COLOR VERBS</Text>
        <Icon name="search" style={styles.searchIcon} />
        <TouchableOpacity onPress={showModal}>
          <SchoolIcon name="md-school" style={styles.schoolIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <MaterialTabs
          items={SCREEN_NAMES}
          selectedIndex={state.index}
          barColor="red"
          indicatorColor="#fff"
          onChange={(index) => {
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
  }
});

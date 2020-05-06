// Core
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Other
import CardIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsIcon from 'react-native-vector-icons/Feather';
import SortIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontSizeIcon from 'react-native-vector-icons/Octicons';
import EyeIcon from 'react-native-vector-icons/Feather';

const DrawerMenuList = ({ navigation, state }) => {
  let showSortModal = null;
  let showFontModal = null;
  let changeColor = null;
  let showEyeIcons = null;
  let words = [];

  if (state) {
    let main = state.routes.find(e => e.name === 'Main');
    if (main.state) {
      showSortModal = main.state.routes.find(r => r.name === 'Verbs').params
        .showSortModal;
      showFontModal = main.state.routes.find(r => r.name === 'Verbs').params
        .showFontModal;
      words = main.state.routes.find(r => r.name === 'Verbs').params.words;
      changeColor = main.state.routes.find(r => r.name === 'Verbs').params
        .changeColor;
      showEyeIcons = main.state.routes.find(r => r.name === 'Verbs').params
        .showEyeIcons;
    }
  }

  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MainPractice', {
            screen: 'Cards',
            params: {
              words,
              changeColor,
            },
          })
        }>
        <View style={styles.itemContainer}>
          <CardIcon name="card-bulleted-outline" style={styles.text} />
          <Text style={styles.text}>Flash Cards</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.closeDrawer();
        showEyeIcons();
      }}>
        <View style={styles.itemContainer}>
          <EyeIcon name="eye" style={styles.text} />
          <Text style={styles.text}>Hide Columns</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          showSortModal();
        }}>
        <View style={styles.itemContainer}>
          <SortIcon name="sort" style={styles.text} />
          <Text style={styles.text}>Sort</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          showFontModal();
        }}>
        <View style={styles.itemContainer}>
          <FontSizeIcon name="text-size" style={styles.text} />
          <Text style={styles.text}>Font Size</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <View style={styles.itemContainer}>
          <SettingsIcon name="settings" style={styles.text} />
          <Text style={styles.text}>Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default DrawerMenuList;

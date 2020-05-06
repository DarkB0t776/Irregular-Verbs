//Core
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

//Constants
import Colors from '../constants/Colors';

//Other
import PlusIcon from 'react-native-vector-icons/Feather';
import MinusIcon from 'react-native-vector-icons/Feather';

/**
 * @param {*} { data, showModal, fontSize, font, practiceScreen }
 * @returns JSX
 */
const VerbsList = ({
  data,
  showModal,
  fontSize,
  font,
  practiceScreen,
  showSimple,
  showPast,
  showPastPart,
  showTranslation
}) => {

  // Styles
  const styles = StyleSheet.create({
    listContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 10,
      marginTop: 0,
    },
    listItem: {
      fontSize: fontSize,
      fontFamily: font,
    },
    translateContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    translation: {
      fontSize: fontSize,
      color: Colors.translationColor,
      fontWeight: 'bold',
    },
    scoreContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '20%'
    },
    correctContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 0
    },
    correctText: {
      color: 'green',
      fontSize: 20,
      fontWeight: 'bold'
    },
    wrongContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    wrongText: {
      color: 'red',
      fontSize: 20,
      fontWeight: 'bold'
    },
  });



  /**
   * @param {*} correct
   * @param {*} wrong
   * @returns JSX
   */
  const renderScoreSection = (correct, wrong) => {
    return (
      <View style={styles.scoreContainer}>
        <View style={styles.correctContainer}>
          <PlusIcon name="plus-circle" style={styles.correctText} />
          <Text style={styles.correctText}>{correct}</Text>
        </View>
        <View style={styles.wrongContainer}>
          <MinusIcon name="minus-circle" style={styles.wrongText} />
          <Text style={styles.wrongText}>{wrong}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{ backgroundColor: item.color }}>
              {practiceScreen ? renderScoreSection(item.practiced, item.fail) : null}
              <TouchableOpacity onPress={() => {
                if (!showModal) return;
                showModal(item);
              }}>
                <View style={styles.listContainer}>
                  {showSimple ? <Text style={styles.listItem}>{item.infinitive.word}</Text> : null}
                  <Text>|</Text>
                  {showPast ? <Text style={styles.listItem}>{item.pastSimple.word}</Text> : null}
                  <Text>|</Text>
                  {showPastPart ? <Text style={styles.listItem}>{item.pastPart.word}</Text> : null}
                </View>
                <View style={styles.translateContainer}>
                  {showTranslation ? <Text style={styles.translation}>{item.ua.join(', ')}</Text> : null}

                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default VerbsList;

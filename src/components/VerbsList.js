import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const VerbsList = ({data, showModal, fontSize}) => {
  const styles = StyleSheet.create({
    listContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      margin: 10,
    },
    listItem: {
      fontSize: fontSize,
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
  });

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={{backgroundColor: item.color}}>
              <TouchableOpacity onPress={() => showModal(item)}>
                <View style={styles.listContainer}>
                  <Text style={styles.listItem}>{item.infinitive.word}</Text>
                  <Text>|</Text>
                  <Text style={styles.listItem}>{item.pastSimple.word}</Text>
                  <Text>|</Text>
                  <Text style={styles.listItem}>{item.pastPart.word}</Text>
                </View>
                <View style={styles.translateContainer}>
                  <Text style={styles.translation}>{item.ua.join(', ')}</Text>
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



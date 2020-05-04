// Core
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Modal } from 'react-native';

// Components
import Card from '../Card';

const Mymodal = ({ hideModal, modalVisible, verb, changeColor, allWords }) => {
  const navigation = useNavigation();

  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.backdrop}>
        <View style={styles.cardContainer}>
          <Card
            word={verb}
            hideModal={hideModal}
            changeColor={changeColor}
            allWords={allWords}
            navigation={navigation}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Mymodal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    height: '90%',
    width: '90%',
  },
});

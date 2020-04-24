import React from 'react';
import {Text, View, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import MinusIcon from 'react-native-vector-icons/AntDesign';

const FontSizeModal = ({visible, fontSize, increase, decrease, closeModal}) => {
  return (
    <Modal visible={visible} transparent onRequestClose={closeModal}>
      <View style={styles.backdrop}>
        <View style={styles.content}>
          {fontSize === 10 ? <Text style={styles.msg}>Min Value</Text> : null}
          {fontSize === 45 ? <Text style={styles.msg}>Max Value</Text> : null}
          <Text style={styles.count}>{fontSize}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={increase}>
              <PlusIcon name="pluscircleo" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={decrease}>
              <MinusIcon name="minuscircleo" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: Colors.modalMain,
    width: '60%',
    height: '25%',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-around',
  },
  count: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FontSizeModal;

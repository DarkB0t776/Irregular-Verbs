// Core
import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';

// Constants
import Colors from '../../constants/Colors';

// Other
import { CheckBox } from 'react-native-elements';

const SortModal = ({ visible, closeModal, sortList }) => {
  const [checked, setChecked] = useState({
    alpha: true,
    color: false,
  });

  const toggleChecked = type => {
    switch (type) {
      case 'alpha':
        setChecked({ alpha: true, color: false });
        break;
      case 'color':
        setChecked({ alpha: false, color: true });
        break;
      default:
        return;
    }
  };

  return (
    <Modal visible={visible} transparent onRequestClose={closeModal}>
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <CheckBox
            checked={checked.alpha}
            center
            title="Alphabet"
            checkedIcon="dot-circle-o"
            iconRight
            uncheckedIcon="circle-o"
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
            onPress={() => {
              toggleChecked('alpha');
              closeModal();
              sortList.alphabetic();
            }}
          />
          <CheckBox
            checked={checked.color}
            center
            title="Color"
            checkedIcon="dot-circle-o"
            iconRight
            uncheckedIcon="circle-o"
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.checkBoxText}
            onPress={() => {
              toggleChecked('color');
              closeModal();
              sortList.color();
            }}
          />
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
    width: '90%',
    height: '70%',
    borderRadius: 6,
    padding: 10,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkBoxText: {
    fontSize: 20,
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default SortModal;

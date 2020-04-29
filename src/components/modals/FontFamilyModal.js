import React, {useState} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox, Text} from 'react-native-elements';
import Colors from '../../constants/Colors';

const FontFamilyModal = ({visible, closeModal, changeFont}) => {
  const [checked, setChecked] = useState({gel: false, standard: true});

  const toggleChecked = type => {
    switch (type) {
      case 'standard':
        setChecked({gel: false, standard: true});
        break;
      case 'gel':
        setChecked({gel: true, standard: false});
        break;
      default:
        return;
    }
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.backdrop}>
        <View style={styles.content}>
          <Text h4>Verbs Font</Text>
          <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            title="Gel Pen"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor={Colors.highRed}
            onPress={() => {
              changeFont('GelPen');
              toggleChecked('gel');
            }}
            checked={checked.gel}
          />
          <CheckBox
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            title="Android Standard"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor={Colors.highRed}
            onPress={() => {
              changeFont('Android Standard');
              toggleChecked('standard');
            }}
            checked={checked.standard}
          />
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    width: '80%',
    height: '35%',
    borderRadius: 6,
    paddingLeft: 30,
    paddingRight: 25,
    justifyContent: 'center',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 18,
  },
  cancel: {
    marginTop: 20,
    color: Colors.highRed,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default FontFamilyModal;

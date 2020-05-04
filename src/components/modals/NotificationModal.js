// Core
import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
// Constants
import Colors from '../../constants/Colors';

// Other
import { CheckBox, Text } from 'react-native-elements';

const FontFamilyModal = ({ visible, closeModal, setNotfInterval }) => {
  const [checked, setChecked] = useState({
    one: false,
    two: false,
    four: false,
    eight: false,
    ten: false,
    twentyfour: true,
  });

  const toggleChecked = type => {
    switch (type) {
      case '1 hour':
        setChecked({
          one: true,
          two: false,
          four: false,
          eight: false,
          ten: false,
          twentyfour: false,
        });
        setNotfInterval(1);
        break;
      case '2 hours':
        setChecked({
          one: false,
          two: true,
          four: false,
          eight: false,
          ten: false,
          twentyfour: false,
        });
        setNotfInterval(2);
        break;
      case '4 hours':
        setChecked({
          one: false,
          two: false,
          four: true,
          eight: false,
          ten: false,
          twentyfour: false,
        });
        setNotfInterval(4);
        break;
      case '8 hours':
        setChecked({
          one: false,
          two: false,
          four: false,
          eight: true,
          ten: false,
          twentyfour: false,
        });
        setNotfInterval(8);
        break;
      case '10 hours':
        setChecked({
          one: false,
          two: false,
          four: false,
          eight: false,
          ten: true,
          twentyfour: false,
        });
        setNotfInterval(10);
        break;
      case '24 hours':
        setChecked({
          one: false,
          two: false,
          four: false,
          eight: false,
          ten: false,
          twentyfour: true,
        });
        setNotfInterval(24);
        break;

      default:
        return;
    }
  };

  const hours = [
    '1 hour',
    '2 hours',
    '4 hours',
    '8 hours',
    '10 hours',
    '24 hours',
  ];

  const checkBoxes = hours.map((h, i) => {
    return (
      <CheckBox
        key={i}
        center
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        title={h}
        onPress={() => toggleChecked(h)}
        checked={Object.values(checked)[i]}
      />
    );
  });

  return (
    <Modal visible={visible} transparent>
      <View style={styles.backdrop}>
        <View style={styles.content}>
          {checkBoxes}
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
    height: '70%',
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

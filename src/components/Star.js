import React from 'react';
import {StyleSheet} from 'react-native';
import StarIcon from 'react-native-vector-icons/Entypo';

const Star = props => {
  const star = (
    <StarIcon name={props.name} style={{...styles.star, ...props.style}} />
  );

  return <>{star}</>;
};

export default Star;

const styles = StyleSheet.create({
  star: {
    fontSize: 25,
  },
});

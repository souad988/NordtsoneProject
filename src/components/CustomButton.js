import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

function CustomButton({onPress, title, color}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, {backgroundColor: color}]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    height: 60,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
export default CustomButton;

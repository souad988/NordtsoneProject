import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';

function CustomInput({placeholder, isPassword, value, setValue}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={isPassword}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default CustomInput;

import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

function CustomInput({
  placeholder,
  isPassword,
  value,
  setValue,
  errors,
  setErrors,
  touched,
  setTouched,
  validate,
}) {
  const onChangeHandle = newValue => {
    console.log(placeholder, newValue);
    setValue(newValue);
    setTouched(state => {
      return {...state, [placeholder]: true};
    });
  };
  const validateInput = value => {
    console.log('on blur value', value);
    const err = validate.validate(value, ...validate.params);
    setErrors(state => {
      let obj = {...state};
      if (err) {
        obj[placeholder] = err;
      } else {
        delete obj[placeholder];
      }
      return obj;
    });
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={isPassword}
          value={value}
          onChangeText={e => onChangeHandle(e)}
          onEndEditing={e => validateInput(e.nativeEvent.text)}
        />
      </View>
      {errors[placeholder] && (
        <Text style={styles.error}>{errors[placeholder]}</Text>
      )}
    </>
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
  error: {
    color: 'red',
  },
});

export default CustomInput;

import React from 'react';
import { View, TextInput, StyleSheet, Text} from 'react-native';

function CustomInput({placeholder, isPassword, value, setValue, errors, setErrors, validate}) {

  const onChangeHandle = (value) =>{
    setValue(value)
   const err =  validate(value)
    setErrors(state =>{
      let obj = {...state}
      if(err){
        obj[placeholder] = err
      }else{
        delete obj.placeholder
      }
    return obj
    })
  }
  return (
    <>
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={isPassword}
        value={value}
        onChange={e => onChangeHandle(e.target.value)}
      />
    </View>
    {errors && <Text style={styles.error}></Text>}
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
  error:{
    color: 'red'
  }
});

export default CustomInput;

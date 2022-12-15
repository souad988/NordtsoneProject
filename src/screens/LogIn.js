import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {};
  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
      />
      <CustomButton title="Login" onPress={login} color="#0093AB" />
      <Text style={styles.link}>Forgot password -></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
  link: {
    color: '#006778',
    fontSize: 17,
    textAlign: 'center',
  },
});
export default LogIn;

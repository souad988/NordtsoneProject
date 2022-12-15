import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function LogIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const signUp = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput
        placeholder="username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput placeholder="email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
      />
      <CustomInput
        placeholder="Confirm password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <CustomButton title="SignUp" onPress={signUp} color="#FFD124" />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    color: '#0093AB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    marginHorizontal: 40,
    marginVertical: 100,
  },
  link: {
    color: '#006778',
    fontSize: 17,
    textAlign: 'center',
  },
});
export default LogIn;

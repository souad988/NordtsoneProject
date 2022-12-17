import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {signUp, validateConfirmPassword, validateEmail, validatePassword} from '../scripts/authentication'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function SignUp({navigation}) {
  const [validateMsg, setValidateMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({email: false, password: false, confirmPassword: false});
  
  useEffect(() => {
    if(validateMsg.length > 0){
      setTimeout(() => {
      navigation.navigate('login');
    }, 2000);
    }
  }, [validateMsg]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput
        placeholder="email"
        value={email}
        setValue={setEmail}
        errors={errors}
        setErrors={setErrors}
        touched={touched}
        setTouched={setTouched}
        validate={{validate: validateEmail, params: []}}
      />

      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
        errors={errors}
        setErrors={setErrors}
        touched={touched}
        setTouched={setTouched}
        validate={{validate: validatePassword, params: []}}
      />

      <CustomInput
        placeholder="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errors={errors}
        setErrors={setErrors}
        touched={touched}
        setTouched={setTouched}
        validate={{validate: validateConfirmPassword, params: [password]}}
      />
      <CustomButton
        title="SignUp"
        onPress={() =>
          signUp(email, password, errors, setErrors, touched, setValidateMsg)
        }
        color="#FFD124"
      />
      <Text style={styles.error}>{validateMsg}</Text>
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
    marginVertical: 40,
  },
  link: {
    color: '#006778',
    fontSize: 17,
    textAlign: 'center',
  },
  error: {
    color: 'green',
  },
});
export default SignUp;

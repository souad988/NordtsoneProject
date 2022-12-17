import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

function LogIn() {
  const [validateMsg, setValidateMsg] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  useEffect(() => {
    console.log('email changed', email);
    console.log('errors', errors);
  }, [email, errors]);

  const validateEmail = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false;
    }
    return 'invalid email!';
  };

  const validatePassword = value => {
    console.log('passsword', value);
    if (value.length > 7) {
      return false;
    }
    return 'password should be at least 8 characters!';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return false;
    } else {
      return 'repeat same password!';
    }
  };

  const signUp = () => {
    if (Object.keys(errors).length == 0) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          setValidateMsg('User account created & signed in!', res);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErrors({email: 'This email address is already in use!'});
          }

          if (error.code === 'auth/invalid-email') {
            setErrors({email: 'That email address is invalid!'});
          }

          console.error(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput
        placeholder="email"
        value={email}
        setValue={setEmail}
        errors={errors['email'] ? errors.email : null}
        setErrors={setErrors}
        validate={{validate: validateEmail, params: []}}
      />

      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
        errors={errors['password'] ? errors.password : null}
        setErrors={setErrors}
        validate={{validate: validatePassword, params: []}}
      />

      <CustomInput
        placeholder="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errors={errors['confirmPassword'] ? errors.confirmPassword : null}
        setErrors={setErrors}
        validate={{validate: validateConfirmPassword, params: [password]}}
      />
      <CustomButton title="SignUp" onPress={signUp} color="#FFD124" />
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
export default LogIn;

import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {
  login,
  validateEmail,
  validatePassword,
} from '../scripts/authentication';

function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email: '', password: ''});
  const [touched, setTouched] = useState({email: false, password: false});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LogIn</Text>
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
      <CustomButton
        title="Login"
        onPress={() =>
          login(email, password, errors, setErrors, touched, navigation)
        }
        color="#0093AB"
      />

      {errors['response'] && (
        <Text style={styles.error}>{errors['response']}</Text>
      )}

      <Pressable onPress={() => navigation.navigate('resetPassword')}>
        <Text style={styles.link}>Forgot password -> </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('signup')}>
        <Text style={styles.link}>Sign Up -> </Text>
      </Pressable>
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
    justifyContent: 'center',
  },
  link: {
    color: '#006778',
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 5,
  },
  error: {
    color: 'red',
  },
});
export default LogIn;

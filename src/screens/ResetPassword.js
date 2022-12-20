import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {
  login,
  validateEmail,
  validatePassword,
} from '../scripts/authentication';
import auth from '@react-native-firebase/auth';

function ResetPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({email: '', password: ''});
  const [touched, setTouched] = useState({email: false, password: false});
  const [emailVerified, setEmailVerified] = useState(false);
  const handleSendPasswordResetEmail = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => navigation.navigate('resetPasswordRedirect'));
    // .catch(error => console.log('error reset email', error));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {!emailVerified ? (
        <>
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
          <CustomButton
            title="Send Reset Link"
            onPress={() => handleSendPasswordResetEmail()}
            color="#0093AB"
          />
        </>
      ) : (
        <>
          <CustomInput
            placeholder="newPassword"
            value={newPassword}
            setValue={setNewPassword}
            errors={errors}
            setErrors={setErrors}
            touched={touched}
            setTouched={setTouched}
            validate={{validate: validatePassword, params: []}}
          />
          <CustomInput
            placeholder="confirmNewPassword"
            value={confirmNewPassword}
            setValue={setConfirmNewPassword}
            errors={errors}
            setErrors={setErrors}
            touched={touched}
            setTouched={setTouched}
            validate={{
              validate: validateConfirmPassword,
              params: [newPassword],
            }}
          />
          <CustomButton
            title="Save"
            onPress={() => handleSendPasswordResetEmail()}
            color="#0093AB"
          />
        </>
      )}
      <Pressable
        onPress={() => {
          navigation.navigate('login');
        }}>
        <Text style={styles.link}>{'<- login'} </Text>
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
});

export default ResetPassword;

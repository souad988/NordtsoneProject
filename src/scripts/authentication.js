import auth from '@react-native-firebase/auth';

export const validateEmail = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return false;
  }
  return 'invalid email!';
};

export const validatePassword = value => {
 
  if (value.length > 7) {
    return false;
  }
  return 'password should be at least 8 characters!';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return false;
  } else {
    return 'repeat same password!';
  }
};

export const signUp = (
  email,
  password,
  errors,
  setErrors,
  touched,
  setValidateMsg,
) => {
  if (!touched.email) {
    setErrors(state => {
      return {...state, email: 'required!'};
    });
  } else if (!touched.password) {
    setErrors(state => {
      return {...state, password: 'required!'};
    });
  } else if (!touched.confirmPassword) {
    setErrors(state => {
      return {...state, confirmPassword: 'required!'};
    });
  } else {
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
         
        });
    }
  }
};

export const login = (email, password, errors, setErrors, touched, navigation) => {
  if (!touched.email) {
    setErrors(state => {
      return {...state, email: 'required!'};
    });
  } else if (!touched.password) {
    setErrors(state => {
      return {...state, password: 'required!'};
    });
  } else {
    if (
      !errors.hasOwnProperty('email') &&
      !errors.hasOwnProperty('password')
    ) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('notify');
        })
        .catch(error => {
          setErrors(state => {
            return {...state, response: error.message};
          });
        });
    }
  }
};

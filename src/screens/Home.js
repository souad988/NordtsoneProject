import React from 'react';
import {View, Text} from 'react-native';
import LogIn from './LogIn';
import SignUp from './SignUp';
function Home() {
  return (
    <View>
      <Text>Home</Text>
      <SignUp />
    </View>
  );
}

export default Home;

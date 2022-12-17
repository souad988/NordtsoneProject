import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NotifyMe from './NotifyMe';

const HomeStack = createNativeStackNavigator();

function Home() {
  return (
    <HomeStack.Navigator
      screenOptions={({route}) => ({
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00AFC1',
        },
      })}>
      <HomeStack.Screen name="login" component={LogIn} />
      <HomeStack.Screen name="signup" component={SignUp} />
      <HomeStack.Screen name="notify" component={NotifyMe} />
    </HomeStack.Navigator>
  );
}

export default Home;

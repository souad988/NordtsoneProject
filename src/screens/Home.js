import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NotifyMe from './NotifyMe';

const HomeStack = createStackNavigator();

function Home() {
  return (
    <NavigationContainer
      style={{paddingVertical: 60, backgroundColor: 'yellow', height: 600}}>
      <HomeStack.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          // headerTitleStyle: {
          //   color: 'white',
          //   fontSize: 20,
          //   fontWeight: 'bold',
          // },
          // headerTitleAlign: 'center',
          // headerStyle: {
          //   backgroundColor: '#00AFC1',
          // },
        })}>
        <HomeStack.Screen name="login" component={LogIn} />
        <HomeStack.Screen name="signup" component={SignUp} />
        <HomeStack.Screen name="notify" component={NotifyMe} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default Home;

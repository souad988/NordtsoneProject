import React, {useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogIn from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';
import Header from './src/components/Header';
import Calculator from './src/screens/Calculator';
import NotifyMe from './src/screens/NotifyMe';

const Tab = createBottomTabNavigator();
function App() {
  const [splash, setSplash] = useState(true);

  return (
    <>
      {splash ? (
        <SplashScreen setSplash={setSplash} />
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              header: ({navigation, route, options}) => {
                return <Header style={options.headerStyle} />;
              },
              tabBarIcon: ({color}) => {
                let iconName = '';
                if (route.name === 'home') {
                  iconName = 'home';
                } else if (route.name === 'login') {
                  iconName = 'login';
                } else if (route.name === 'calculator') {
                  iconName = 'calculator';
                } else if (route.name === 'notify') {
                  iconName = 'bell-plus';
                }

                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={25}
                    color={color}
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: '#006778',
              activeBackgroundColor: '#00AFC1',
              inactiveBackgroundColor: '#00AFC1',
              headerStyle: {
                height: 500,
                color: '#00AFC1',
              },
            }}>
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="notify" component={NotifyMe} />
            <Tab.Screen name="login" component={LogIn} />
            <Tab.Screen name="calculator" component={Calculator} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default App;

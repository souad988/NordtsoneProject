import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Calculator from './src/screens/Calculator';
import NotifyMe from './src/screens/NotifyMe';
import PushNotification from 'react-native-push-notification';
import UploadImage from './src/screens/UploadImage';
import AddPost from './src/screens/AddPost';

const Tab = createBottomTabNavigator();

function App() {
  const [splash, setSplash] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'test channel',
    });
  };
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }, []);

  useEffect(() => {
    createChannel();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      {splash ? (
        <SplashScreen setSplash={setSplash} />
      ) : user ? (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              // header: ({navigation, route, options}) => {
              //   return <Header style={options.headerStyle} />;
              // },
              headerTitleStyle: {
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              headerTitle: 'Nordstone',
              headerStyle: {
                backgroundColor: '#00AFC1',
              },
              tabBarIcon: ({color}) => {
                let iconName = '';
                if (route.name === 'listImages') {
                  iconName = 'image-multiple';
                } else if (route.name === 'login') {
                  iconName = 'login';
                } else if (route.name === 'calculator') {
                  iconName = 'calculator';
                } else if (route.name === 'notify') {
                  iconName = 'bell-plus';
                } else if (route.name === 'uploadImage') {
                  iconName = 'cloud-upload';
                } else if (route.name === 'addPost') {
                  iconName = 'post';
                }

                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={25}
                    color={color}
                  />
                );
              },
              //headerShown: false,
              tabBarInactiveTintColor: '#006778',
              tabBarActiveTintColor: 'white',
              tabBarActiveBackgroundColor: '#00AFC1',
              tabBarInactiveBackgroundColor: '#00AFC1',
              // headerShadowVisible: true,
              // headerTitleStyle:{
              //   color: 'white',
              //   fontWeight: 'bold'
              // },
              // headerStyle: {
              //   height: 40,
              //   alignItems: 'center',
              //   backgroundColor: '#00AFC1',
              // },
            })}
            // tabBarOptions={{
            //   activeTintColor: 'white',
            //   inactiveTintColor: '#006778',
            //   activeBackgroundColor: '#00AFC1',
            //   inactiveBackgroundColor: '#00AFC1',
            //   headerStyle: {
            //     height: 500,
            //     color: '#00AFC1',
            //   },
            // }}
          >
            <Tab.Screen name="notify" component={NotifyMe} />
            <Tab.Screen name="uploadImage" component={UploadImage} />
            <Tab.Screen name="addPost" component={AddPost} />
            <Tab.Screen name="calculator" component={Calculator} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;

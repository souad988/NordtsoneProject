import React, {useState} from 'react';
import {View} from 'react-native';
import Home from './src/screens/Home';
import SplashScreen from './src/screens/SplashScreen';

function App() {
  const [splash, setSplash] = useState(true);

  return (
    <>
      {splash ? (
        <SplashScreen setSplash={setSplash} />
      ) : (
        <View>
          <Home />
        </View>
      )}
    </>
  );
}

export default App;

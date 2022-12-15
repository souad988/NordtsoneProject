import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Animated, StyleSheet, Easing} from 'react-native';
import Home from './src/screens/Home';

function App() {
  const [splash, setSplash] = useState(true);
  const backgroundFade = useRef(new Animated.Value(1)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoPosition = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(logoFade, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    Animated.timing(logoPosition, {
      toValue: 350,
      duration: 2000,
      easing: Easing.inOut(Easing.exp),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(logoPosition, {
        toValue: -300,
        duration: 3000,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
      Animated.timing(logoFade, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 2300);

    setTimeout(() => {
      setSplash(false);
    }, 600);
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFD124',
      opacity: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logo: {
      fontSize: 60,
      fontWeight: 'bold',
      color: '#0093AB',
      opacity: logoFade,
      transform: [{translateY: logoPosition}],
      textShadowColor: '#006778',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
  });
  return (
    <>
      {splash ? (
        <Animated.View style={styles.container}>
          <Animated.Text style={styles.logo}>NORDSTONE</Animated.Text>
        </Animated.View>
      ) : (
        <View>
          <Home />
        </View>
      )}
    </>
  );
}

export default App;

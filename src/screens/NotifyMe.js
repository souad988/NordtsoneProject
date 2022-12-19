import React, {useEffect} from 'react';
import {View, Text, Alert, Pressable, StyleSheet} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

function NotifyMe() {
  // useEffect(() => {
  //   console.log('firebase msg token', messaging().getToken());
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  const handlePress = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'test channel activated',
      message: 'successfully notified me!!',
    });
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={e => {
          handlePress();
        }}>
        <Text style={styles.title}>Notify Me</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 5
  },
});
export default NotifyMe;

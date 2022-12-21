import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getImages} from '../api/firbaseApi';

function ListImages() {
  const [images, setImages] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getImages(setImages);
    }, []),
  );
  //   useEffect(() => {
  //     getImages(setImages);
  //   }, []);

  const data = [
    {
      title: 'first',
      id: 1,
      url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
    },
    {
      title: 'second',
      id: 2,
      url: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
    },
    {
      title: 'third',
      id: 3,
      url: 'https://firebasestorage.googleapis.com/v0/b/nordstoneproject-a34a9.appspot.com/o/images%2Factivity_details_mobile2.PNG?alt=media&token=a937677f-8dd6-4336-bbab-689a69b64bc9',
    },
  ];
  return (
    <View>
      <Text style={styles.title}>My Collection</Text>

      {/* <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df',
        }}
        style={styles.img}
      /> */}
      <FlatList
        data={images}
        renderItem={({item}) => (
          <>
            <Image source={{uri: item.url}} style={styles.img} />
            {/* <Text>{item.title}</Text> */}
          </>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#0093AB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: 'center',
  },
  container: {
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ListImages;

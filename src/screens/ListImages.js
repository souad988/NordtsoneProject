import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getImages} from '../api/firbaseApi';

function ListImages({uploading}) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!uploading) {
      getImages(setImages);
    }
  }, [uploading]);

  return (
    <View>
      <Text style={styles.title}>My Collection</Text>
    {images.length > 0 && images.map(item=>(
         <Image key={item.id} source={{uri: item.url}} style={styles.img} />
    ))}  
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

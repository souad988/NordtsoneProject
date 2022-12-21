import React, {useState, useEffect} from 'react';
import {View, Button, Image, StyleSheet, Pressable, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadFile} from '../api/firbaseApi';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import CustomButton from '../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState();
  const [loadingPercent, setLoadingPercent] = useState();
  const [uploading, setUploading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState();
  const handleSelectImage = () => {
    setLoadingMsg();
    launchImageLibrary(
      {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
        let source = {uri: response.uri};
        console.log('image Selected', response.assets[0].uri);
        setSelectedImage(response.assets[0].uri);
      },
    );
  };
  useEffect(() => {
    console.log('loading percent', loadingPercent);
  }, [loadingPercent]);

  const handleUploadFile = () => {
    uploadFile(
      selectedImage,
      setSelectedImage,
      setLoadingPercent,
      setUploading,
      setLoadingMsg,
      setSelectedImage,
    );
  };

  return (
    <View style={styles.container}>
      <Pressable title="Select Image" onPress={() => handleSelectImage()}>
        <View style={styles.box}>
          <MaterialCommunityIcons
            name={'file-image-plus'}
            size={30}
            color={'#0093AB'}
          />
          <Text style={styles.clickable}>Select Image</Text>
        </View>
      </Pressable>

      <View style={styles.imageBox}>
        {uploading ? (
          <AnimatedCircularProgress
            size={50}
            width={5}
            fill={loadingPercent || 0}
            tintColor="#FFD124"
            //   onAnimationComplete={() => {
            //     setLoadingPercent();
            //     setUploading(false);
            //   }}
            backgroundColor="gray">
            {loadingPercent => <Text>{loadingPercent}</Text>}
          </AnimatedCircularProgress>
        ) : (
          <Image
            source={{uri: selectedImage}}
            style={styles.image}
          />
        )}
      </View>
      <CustomButton
        title="Upload"
        onPress={() => handleUploadFile()}
        color="#0093AB"
        disabled={uploading || !selectedImage}
      />

      {loadingMsg ? (
        loadingMsg.success ? (
          <Text style={{color: 'green'}}>{loadingMsg.success}</Text>
        ) : (
          <Text style={{color: 'red'}}>{loadingMsg.error}</Text>
        )
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: 'center',
  },
  clickable: {
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0093AB',
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
});
export default UploadImage;

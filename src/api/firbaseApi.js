import storage from '@react-native-firebase/storage';
import {v4 as uuid} from 'uuid';

export const uploadFile = (
  fileUri,
  setSelectedImage,
  setLoadingPercent,
  setUploading,
  setLoadingMsg,
) => {
  setUploading(true);
  let fileName = uuid();
  let fileExtension = fileUri.split('.').pop();
  let reference = storage().ref(`${fileName}.${fileExtension}`);
  reference.putFile(fileUri).on(
    'state_changed',
    snapshot => {
      console.log('snapshot', snapshot.state, snapshot.bytesTransferred);
      setLoadingPercent(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      if (snapshot.state === 'success') {
        setUploading(false);
        setLoadingMsg({success: 'image successfully uploaded!'});
        setSelectedImage()
      }
    },
    error => {
      console.log('upload error', error);
      setUploading(false);
      setLoadingMsg({error: error.message});
      setSelectedImage()
    },
    () => {
      reference.getDownloadURL().then(uploadedUrl => {
        console.log('firestore img url', uploadedUrl);
      });
    },
  );
};

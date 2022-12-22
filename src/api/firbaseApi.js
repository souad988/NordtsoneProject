import storage from '@react-native-firebase/storage';
import firestore, {collection, addDoc} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {v4 as uuid} from 'uuid';

export const addNewPost = async (text, setLoading) => {
  setLoading(true);
  try {
    const docRef = await firestore().collection('Posts').add({
      text: text,
    });
    console.log('Document written with ID: ', docRef.id);
    setLoading(false);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  setTimeout(()=>{setLoading(false)},500)// firestore add doc is creating the new doc in db but not returning response due to the way i configured firebase I need to fix it later
};

export const getPosts = setState => {
  firestore()
    .collection('Posts')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      setState([]);
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        setState(state => {
          let newState = [...state];
          newState.push({
            id: documentSnapshot.id,
            text: documentSnapshot.data().text,
          });
          return newState;
        });
      });
    });
};

const addNewImage = image => {
  firestore()
    .collection('Images')
    .add({
      image: image,
    })
    .then(() => {
      console.log('image added!');
    });
};
const getUsers = async () => {
  const users = await firestore().collection('Users').get();
  return users;
};

export const getImages = setImages => {
  firestore()
    .collection('Images')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      setImages([]);
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        setImages(state => {
          let newState = [...state];
          newState.push({
            id: documentSnapshot.id,
            url: documentSnapshot.data().image,
          });
          return newState;
        });
      });
    });
};
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
        setSelectedImage();
      }
    },
    error => {
      console.log('upload error', error);
      setUploading(false);
      setLoadingMsg({error: error.message});
      setSelectedImage();
    },
    () => {
      reference.getDownloadURL().then(uploadedUrl => {
        console.log('firestore img url', uploadedUrl);
        addNewImage(uploadedUrl);
      });
    },
  );
};

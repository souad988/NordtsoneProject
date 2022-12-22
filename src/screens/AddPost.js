import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {addNewPost, getPosts} from '../api/firbaseApi';

function AddPost() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({text: false});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('loading', loading);
    if (!loading) {
      getPosts(setPosts);
    }
  }, [loading]);

  const handleAddPost = () => {
    addNewPost(text, setLoading);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <CustomInput
            placeholder="text"
            value={text}
            setValue={setText}
            errors={errors}
            setErrors={setErrors}
            touched={touched}
            setTouched={setTouched}
          />
          <CustomButton
            title="Post"
            onPress={() => handleAddPost()}
            color="#0093AB"
            disabled={loading}
          />
        </View>
        <View>
          <Text style={styles.title}>Posts</Text>
          {posts.length > 0 &&
            posts.map(item => (
              <View key={item.id} style={styles.postContainer}>
                <Text>{item.text}</Text>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: '#0093AB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textDecorationLine: 'underline',
  },
  container: {
    marginHorizontal: 40,
    marginVertical: 40,
  },
  postContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0093AB',
  },
});
export default AddPost;

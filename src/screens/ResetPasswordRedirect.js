import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

function ResetPasswordRedirect() {
  return (
    <View style={styles.container}><Text style={styles.text}>
        reset password link sent to your email, click the provided link to update your password.
        </Text>
        
        </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15
  },
  text: {
    fontSize: 18,
    color: '#0093AB',
  },
});
export default ResetPasswordRedirect
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../utils/colors';

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

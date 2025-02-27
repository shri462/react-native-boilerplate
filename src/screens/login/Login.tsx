import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { colors } from "../../theme/colors";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin?: (credentials: LoginCredentials) => void;
  onForgotPassword?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onForgotPassword }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (): void => {
    onLogin?.(credentials);
  };

  const handleInputChange =
    (field: keyof LoginCredentials) =>
    (value: string): void => {
      setCredentials(prev => ({
        ...prev,
        [field]: value,
      }));
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={{ height: StatusBar.currentHeight }} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Email address<Text style={styles.asterisk}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={credentials.email}
          onChangeText={handleInputChange("email")}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Password<Text style={styles.asterisk}>*</Text>
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={credentials.password}
            onChangeText={handleInputChange("password")}
            secureTextEntry={!showPassword}
            autoComplete="password"
            textContentType="password"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
          ></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  asterisk: {
    color: colors.danger500,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: colors.primary500,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  input: {
    borderColor: colors.secondary200,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    padding: 15,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: colors.primary200,
    borderRadius: 8,
    marginTop: 20,
    padding: 15,
  },
  loginButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  title: {
    color: colors.secondary900,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
});

export default Login;

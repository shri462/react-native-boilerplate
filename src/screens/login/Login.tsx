import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { colors } from "../../theme/colors";
import Button from "../../components/shared/Button";
import { ControlledTextInput } from "../../components/shared/textinput/ControlledTextInput";
import { FormProvider, useForm } from "react-hook-form";
import { ControlledPasswordInput } from "../../components/shared/password-input/ControlledPasswordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin?: (credentials: LoginCredentials) => void;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = (): void => {
    const formData = form.getValues();
    onLogin?.(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={{ height: StatusBar.currentHeight }} />
      <Text style={styles.title}>Login</Text>
      <FormProvider {...form}>
        <View style={styles.inputContainer}>
          <ControlledTextInput name="email" label="Email" required />
        </View>
        <View style={styles.inputContainer}>
          <ControlledPasswordInput name="password" label="Password" required />
        </View>
        <Button
          title="Login"
          onPress={form.handleSubmit(handleLogin)}
          variant="danger"
        />
      </FormProvider>

      <Button title="Forgot Password?" variant="transparent" disabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  inputContainer: { marginVertical: 10 },
  title: {
    color: colors.secondary900,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
});

export default Login;

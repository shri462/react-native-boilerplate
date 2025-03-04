import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../Button";
import { colors } from "../../../theme/colors";

const CameraPermissions: React.FC = () => {
  const navigation = useNavigation();

  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera Permission is Required</Text>
      <Button title="Open Settings" onPress={openSettings} style={styles.btn} />
      <Button
        title="Back to Home"
        variant="secondary"
        onPress={() => navigation.goBack()}
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: { marginTop: 20, width: "60%" },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: colors.secondary900,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
});

export default CameraPermissions;

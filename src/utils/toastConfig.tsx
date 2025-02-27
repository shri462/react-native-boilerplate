import { StyleSheet } from "react-native";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import colors from "./colors";

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1Style={styles.text1}
      contentContainerStyle={styles.contentContainer}
      style={styles.toastSuccess}
      text1NumberOfLines={3}
      //   renderLeadingIcon={() => <SuccessIcon />}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={styles.text1}
      contentContainerStyle={styles.contentContainer}
      style={styles.toastError}
      text1NumberOfLines={3}
      //   renderLeadingIcon={() => <ErrorIcon />}
    />
  ),
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0,
    maxWidth: "80%",
    paddingHorizontal: 8,
  },
  text1: {
    color: colors.secondary800,
    fontSize: 14,
    fontWeight: "500",
  },
  toastError: {
    alignItems: "center",
    backgroundColor: colors.danger25,
    borderColor: colors.danger300,
    borderLeftWidth: 1,
    borderRadius: 21,
    borderWidth: 1,
    flexDirection: "row",
    height: 42,
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 8,
    shadowColor: colors.danger300,
    width: "auto",
  },
  toastSuccess: {
    alignItems: "center",
    backgroundColor: colors.success25,
    borderColor: colors.success300,
    borderLeftWidth: 1,
    borderRadius: 21,
    borderWidth: 1,
    flexDirection: "row",
    height: 42,
    justifyContent: "center",
    paddingLeft: 12,
    paddingRight: 8,
    shadowColor: colors.success300,
    width: "auto",
  },
});

export default toastConfig;

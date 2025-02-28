import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import Eye from "../../../assets/svg/eye.svg";
import EyeClosed from "../../../assets/svg/eye-closed.svg";

export interface PasswordInputProps extends RNTextInputProps {
  containerStyle?: ViewStyle;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  style,
  containerStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [textInputHeight, setTextInputHeight] = useState(0);
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <RNTextInput
        testID={`password-input`}
        placeholderTextColor={colors.secondary400}
        cursorColor={colors.secondary800}
        selectionColor={colors.secondary800}
        {...props}
        style={[styles.input, style]}
        secureTextEntry={!showPassword}
        onLayout={e => setTextInputHeight(e.nativeEvent.layout.height)}
      />
      <View
        style={[
          styles.rightIcon,
          // eslint-disable-next-line react-native/no-inline-styles
          { top: textInputHeight ? textInputHeight / 2 - 8 : 12 },
        ]}
      >
        {!showPassword ? (
          <Eye
            height={16}
            width={16}
            onPress={() => setShowPassword(true)}
            hitSlop={20}
          />
        ) : (
          <EyeClosed
            height={16}
            width={16}
            onPress={() => setShowPassword(false)}
            hitSlop={20}
          />
        )}
      </View>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.secondary25,
    borderColor: colors.secondary300,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.secondary800,
    fontSize: 14,
    fontWeight: "500",
    padding: 12,
  },
  inputContainer: {
    position: "relative",
  },
  rightIcon: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
});

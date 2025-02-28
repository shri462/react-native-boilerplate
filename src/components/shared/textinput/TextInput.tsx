import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../theme/colors";

export interface TextInputProps extends RNTextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const TextInput: React.FC<TextInputProps> = ({
  leftIcon,
  rightIcon,
  style,
  containerStyle,
  ...props
}) => {
  const [textInputHeight, setTextInputHeight] = useState(0);

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {leftIcon && (
        <View
          style={[
            styles.leftIcon,
            // eslint-disable-next-line react-native/no-inline-styles
            { top: textInputHeight ? textInputHeight / 2 - 8 : 12 },
          ]}
        >
          {leftIcon}
        </View>
      )}
      <RNTextInput
        testID={`text-input`}
        placeholderTextColor={colors.secondary400}
        cursorColor={colors.secondary800}
        selectionColor={colors.secondary800}
        onLayout={e => setTextInputHeight(e.nativeEvent.layout.height)}
        {...props}
        style={[
          styles.input,
          style,
          !!leftIcon && styles.pL30,
          !!rightIcon && styles.pR30,
        ]}
      />
      {rightIcon && (
        <View
          style={[
            styles.rightIcon,
            // eslint-disable-next-line react-native/no-inline-styles
            { top: textInputHeight ? textInputHeight / 2 - 8 : 12 },
          ]}
        >
          {rightIcon}
        </View>
      )}
    </View>
  );
};

export default TextInput;

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
  leftIcon: {
    left: 12,
    position: "absolute",
    zIndex: 1,
  },
  pL30: { paddingLeft: 30 },
  pR30: { paddingRight: 36 },
  rightIcon: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
});

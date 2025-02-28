import React, { useMemo } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../../../theme/colors";
import TextInput, { TextInputProps } from "./TextInput";

export interface ControlledTextInputProps extends TextInputProps {
  name: string;
  label: string;
  required?: boolean;
  containerStyle?: ViewStyle;
}

export const ControlledTextInput: React.FC<ControlledTextInputProps> = ({
  name,
  label,
  required,
  containerStyle,
  ...props
}) => {
  const {
    control,
    formState: { errors, isLoading, isSubmitting },
  } = useFormContext();

  const error = useMemo(
    () => get(errors, name)?.message,
    [errors[name]?.message, name],
  );

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text testID={`text-input-label-${name}`} style={styles.label}>
        {label} {required && <Text style={{ color: colors.danger500 }}>*</Text>}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID={`text-input-${name}`}
            style={error ? styles.inputError : undefined}
            placeholderTextColor={
              error ? colors.danger500 : colors.secondary400
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            readOnly={isLoading || isSubmitting}
            {...props}
          />
        )}
      />
      {error && (
        <Text testID={`text-input-error-${name}`} style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: { color: colors.danger500, fontSize: 12, marginTop: 4 },
  inputContainer: {},
  inputError: { borderColor: colors.danger500 },
  label: {
    color: colors.secondary800,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
});

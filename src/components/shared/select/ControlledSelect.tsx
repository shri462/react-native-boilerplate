import React, { useMemo } from "react";
import { get, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../theme/colors";
import Select from "./Select";

export interface ControlledSelectProps extends TextInputProps {
  name: string;
  label: string;
  required?: boolean;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  data: { label: string; value: string }[];
}

const ControlledSelect: React.FC<ControlledSelectProps> = ({
  name,
  label,
  required,
  containerStyle,
  disabled,
  data,
  style,
  ...props
}) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const error = useMemo(() => get(errors, name)?.message, [errors, name]);

  const value = watch(name);

  return (
    <View style={containerStyle}>
      <Text testID={`text-input-label-${name}`} style={styles.label}>
        {label} {required && <Text style={{ color: colors.danger500 }}>*</Text>}
      </Text>

      <Select
        data={data}
        onSelect={value => setValue(name, value, { shouldDirty: true })}
        error={error}
        disabled={disabled}
        {...props}
        style={[style, error ? styles.inputError : undefined]}
        shouldClearInput={!value}
        selectedId={value}
      />

      {error && (
        <Text testID={`text-input-error-${name}`} style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default ControlledSelect;

const styles = StyleSheet.create({
  errorText: { color: colors.danger500, fontSize: 12, marginTop: 4 },
  inputError: { borderColor: colors.danger500 },
  label: {
    color: colors.secondary800,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
});

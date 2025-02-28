import React from "react";
import {
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  Pressable,
  PressableProps,
  TextStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { colors } from "../../theme/colors";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "dark" | "danger" | "transparent";
  LeftIcon?: React.FC<SvgProps>;
  RightIcon?: React.FC<SvgProps>;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  onPress,
  LeftIcon,
  RightIcon,
  disabled = false,
  style,
  isLoading,
  textStyle,
  ...props
}) => {
  const getButtonStyle = (pressed: boolean) => {
    switch (variant) {
      case "secondary":
        if (disabled) {
          return [styles.disabledButtonSecondary];
        }

        return [styles.secondaryButton, pressed && styles.pressed];

      case "danger":
        if (disabled) {
          return [styles.disabledButton];
        }

        return [
          styles.dangerButton,
          pressed && { ...styles.dangerPressed, ...styles.pressed },
        ];

      case "transparent":
        if (disabled) {
          return [];
        }

        return [styles.transparentButton, pressed && styles.pressed];

      default:
        if (disabled) {
          return [styles.disabledButton];
        }

        return [
          styles.primaryButton,
          pressed && { ...styles.primaryPressed, ...styles.pressed },
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        if (disabled) {
          return styles.secondaryButtonTextDisabled;
        }

        return styles.secondaryButtonText;
      case "danger":
        if (disabled) {
          return styles.dangerButtonTextDisabled;
        }

        return styles.dangerButtonText;
      case "transparent":
        if (disabled) {
          return styles.transparentButtonTextDisabled;
        }

        return styles.transparentButtonText;
      default:
        if (disabled) {
          return styles.buttonTextDisabled;
        }

        return styles.buttonText;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        ...getButtonStyle(pressed),
        style,
        styles.button,
      ]}
      onPress={disabled || isLoading ? undefined : onPress}
      {...props}
    >
      <View style={styles.iconAndTextWrapper}>
        {isLoading ? (
          <ActivityIndicator
            color={variant === "secondary" ? colors.black : colors.white}
          />
        ) : (
          <>
            {LeftIcon && (
              <LeftIcon
                testID="left-icon"
                width={16}
                height={16}
                style={styles.leftIcon}
              />
            )}
            <Text testID="button-text" style={[getTextStyle(), textStyle]}>
              {title}
            </Text>
            {RightIcon && (
              <RightIcon
                testID="right-icon"
                width={16}
                height={16}
                style={styles.rightIcon}
              />
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 40,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: colors.danger600,
  },
  dangerButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  dangerButtonTextDisabled: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  dangerPressed: {
    backgroundColor: colors.danger700,
  },
  disabledButton: {
    backgroundColor: colors.secondary300,
  },
  disabledButtonSecondary: {
    backgroundColor: colors.white,
    borderColor: colors.secondary300,
    borderWidth: 1,
    color: colors.secondary400,
  },
  iconAndTextWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  leftIcon: {
    marginRight: 8,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  primaryButton: {
    backgroundColor: colors.primary200,
  },
  primaryPressed: {
    backgroundColor: colors.primary300,
  },
  rightIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: colors.secondary800,
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButtonTextDisabled: {
    color: colors.secondary400,
    fontSize: 14,
    fontWeight: "600",
  },
  transparentButton: {
    backgroundColor: colors.white,
  },
  transparentButtonText: {
    color: colors.primary600,
    fontSize: 14,
    fontWeight: "500",
  },
  transparentButtonTextDisabled: {
    color: colors.secondary400,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Button;

import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { colors } from "../../../theme/colors";

interface ActionIconProps extends TouchableOpacityProps {
  Icon: React.FC<SvgProps>;
  iconSize?: number;
  color?: string;
  hitSlop?: number;
  activeOpacity?: number;
  backgroundColor?: string;
  withBorder?: boolean;
  size?: number;
}

const ActionIcon: React.FC<ActionIconProps> = ({
  Icon,
  iconSize = 16,
  color,
  hitSlop = 16,
  activeOpacity = 0.7,
  backgroundColor = "transparent",
  withBorder = true,
  size = 32,
  ...props
}) => {
  return (
    <TouchableOpacity
      testID="action-icon"
      activeOpacity={activeOpacity}
      hitSlop={hitSlop}
      {...props}
      style={[
        withBorder && styles.border,
        {
          width: size,
          height: size,
        },
        backgroundColor && { backgroundColor },
        styles.container,
      ]}
    >
      <Icon width={iconSize} height={iconSize} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  border: {
    borderColor: colors.secondary100,
    borderWidth: 1,
  },
  container: {
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "center",
  },
});

export default ActionIcon;

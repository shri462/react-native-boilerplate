import React from "react";
import { View } from "react-native";
import { colors } from "../../../theme/colors";

interface HorizontalLineProps {
  color?: string;
  height?: number;
  marginVertical?: number;
  marginHorizontal?: number;
}

export const HorizontalLine: React.FC<HorizontalLineProps> = ({
  color = colors.secondary300,
  height = 1,
  marginVertical = 0,
  marginHorizontal = 0,
}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height,
        marginVertical,
        marginHorizontal,
      }}
      testID="horizontal-line"
    />
  );
};

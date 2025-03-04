import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../theme/colors";
import ChevronDown from "../../../assets/svg/chevron-down.svg";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  defaultExpanded?: boolean;
  rightIcon?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  containerStyle,
  headerStyle,
  contentContainerStyle,
  defaultExpanded = false,
  rightIcon,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const rotateAnimation = useSharedValue(defaultExpanded ? 1 : 0);
  const heightAnimation = useSharedValue(defaultExpanded ? 1 : 0);
  const contentPadding = useSharedValue(defaultExpanded ? 12 : 0);

  const toggleAccordion = () => {
    const toValue = isExpanded ? 0 : 1;
    rotateAnimation.value = withTiming(toValue, { duration: 200 });
    heightAnimation.value = withTiming(toValue, { duration: 300 });
    contentPadding.value = withTiming(isExpanded ? 0 : 12, { duration: 300 });
    setIsExpanded(!isExpanded);
  };

  const iconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotateAnimation.value, [0, 1], [0, -180]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
      alignItems: "center",
      justifyContent: "center",
      height: 32,
      width: 32,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: colors.secondary200,
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    const maxHeight = interpolate(heightAnimation.value, [0, 1], [0, 1000]);
    return {
      maxHeight,
      opacity: heightAnimation.value,
      paddingTop: contentPadding.value,
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAccordion}
        style={[styles.header, headerStyle]}
        testID="accordion-header"
      >
        <View style={styles.titleContainer}>
          <Animated.View style={iconStyle}>
            <ChevronDown width={14} height={14} />
          </Animated.View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {rightIcon && rightIcon}
      </TouchableOpacity>
      <Animated.View
        style={[contentContainerStyle, animatedContentStyle]}
        testID="accordion-content"
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.secondary300,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    padding: 12,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: colors.secondary900,
    fontSize: 16,
    fontWeight: "600",
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
});

export default Accordion;

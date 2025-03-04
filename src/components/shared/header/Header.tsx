import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../theme/colors";
import ChevronLeftIcon from "../../../assets/svg/chevron-left.svg";
import { useNavigation } from "@react-navigation/native";
import ActionIcon from "../action-icon/ActionIcon";

type HeaderProps = {
  title: string;
  subTitle?: string;
  actionItems?: React.JSX.Element;
  searchBar?: React.JSX.Element;
};
const Header: React.FC<HeaderProps> = ({
  title,
  subTitle,
  actionItems,
  searchBar,
}) => {
  const { goBack } = useNavigation();

  return (
    <View testID="header" style={styles.container}>
      <View testID="header-container" style={styles.headerContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.white}
          animated
        />
        <View testID="title-container" style={styles.titleContainer}>
          <ActionIcon
            Icon={ChevronLeftIcon}
            onPress={goBack}
            backgroundColor={colors.secondary100}
            withBorder={false}
            size={40}
          />

          <View testID="title-subtitle-container">
            <Text
              testID="title"
              style={[styles.title, subTitle && styles.fw500]}
            >
              {title}
            </Text>
            {subTitle && (
              <Text testID="sub-title" style={styles.subTitle}>
                {subTitle}
              </Text>
            )}
          </View>
        </View>

        {actionItems}
      </View>

      {searchBar}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  fw500: {
    fontWeight: "500",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitle: {
    color: colors.secondary600,
    fontSize: 12,
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

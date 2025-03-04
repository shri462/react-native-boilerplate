import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Text,
  ViewStyle,
} from "react-native";
import { colors } from "../../../theme/colors";

export interface MenuItem {
  label: string;
  onPress: () => void;
  testID?: string;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  containerStyle?: ViewStyle;
  menuStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: ViewStyle;
}

const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  containerStyle,
  menuStyle,
  itemStyle,
  itemTextStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<View>(null);

  const showMenu = () => {
    ref.current?.measureInWindow((x, y) => {
      setDropdownPosition({ top: y + 24, left: x });
      setModalVisible(true);
    });
  };

  return (
    <>
      <TouchableOpacity
        testID="menu-trigger"
        onPress={showMenu}
        activeOpacity={0.7}
        style={containerStyle}
      >
        <View ref={ref}>{trigger}</View>
      </TouchableOpacity>

      <RNModal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        testID="menu-modal"
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View testID="menu-overlay" style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                testID="menu-container"
                style={[
                  styles.menuContainer,
                  {
                    left: dropdownPosition.left - 100,
                    top: dropdownPosition.top + 10,
                  },
                  menuStyle,
                ]}
              >
                {items.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    testID={item.testID || `menu-item-${index}`}
                    activeOpacity={0.7}
                    onPress={() => {
                      item.onPress();
                      setModalVisible(false);
                    }}
                    style={[styles.menuItem, itemStyle]}
                  >
                    <Text
                      testID={`menu-item-text-${index}`}
                      style={[styles.menuItemText, itemTextStyle]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    boxShadow: "0 4 10 0 #0000001F",
    padding: 16,
    position: "absolute",
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemText: {
    color: colors.secondary900,
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
  },
});

export default Menu;

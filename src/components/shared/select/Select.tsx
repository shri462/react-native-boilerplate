import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../../../theme/colors";
import ChevronDownIcon from "../../../assets/svg/chevron-down.svg";

interface SelectProps extends TextInputProps {
  disabled?: boolean;
  data: { label: string; value: string }[];
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: string) => void;
  shouldClearInput?: boolean;
  selectedId?: string;
  selectedLabel?: string;
}
const dropdownHeight = 250;

const Select: React.FC<SelectProps> = ({
  style,
  disabled,
  error,
  data,
  onSelect,
  shouldClearInput,
  selectedId,
  selectedLabel,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const [flatListHeight, setFlatListHeight] = useState(0);

  const [selectedValueLabel, setSelectedValueLabel] = useState(
    selectedLabel || "",
  );

  const [textInputHeight, setTextInputHeight] = useState(0);

  const openDropdown = () => {
    if (disabled) return;
    inputRef.current?.measureInWindow((x, y, width) => {
      const screenHeight = Dimensions.get("window").height;
      const availableSpaceBelow = screenHeight - y - textInputHeight;

      const top =
        availableSpaceBelow >= (flatListHeight + 90 || 320)
          ? y + textInputHeight
          : y - flatListHeight - 20;

      setDropdownPosition({
        top: Math.max(0, top),
        left: x,
        width,
      });
      setModalVisible(true);
    });
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setFlatListHeight(e.nativeEvent.layout.height);
  };

  return (
    <View>
      <Pressable onPress={openDropdown}>
        <TextInput
          ref={inputRef}
          testID={`select-input`}
          placeholderTextColor={error ? colors.danger500 : colors.secondary400}
          readOnly
          value={shouldClearInput ? "" : selectedValueLabel}
          onLayout={e => setTextInputHeight(e.nativeEvent.layout.height)}
          {...props}
          style={[styles.input, style, disabled && styles.inputDisabled]}
          onPress={openDropdown}
        />
        <ChevronDownIcon
          style={[
            styles.rightIcon,
            // eslint-disable-next-line react-native/no-inline-styles
            { top: textInputHeight ? textInputHeight / 2 - 8 : 12 },
          ]}
        />
      </Pressable>

      <Modal
        visible={modalVisible}
        collapsable={false}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    testID={`select-item`}
                    hitSlop={16}
                    onPress={() => {
                      onSelect(item.value);
                      setSelectedValueLabel(item.label);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      testID="select-item-label"
                      style={selectedId === item.value && styles.label}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
                style={[
                  styles.flatList,
                  {
                    left: dropdownPosition.left,
                    top: dropdownPosition.top,
                    width: dropdownPosition.width,
                  },
                ]}
                testID={`select-list`}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={item => item.value}
                ListEmptyComponent={
                  <Text style={styles.text}>No data available</Text>
                }
                onLayout={handleLayout}
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
    padding: 16,
  },
  flatList: {
    backgroundColor: colors.white,
    borderRadius: 12,
    boxShadow: "0 4 10 0 #0000001F",
    marginTop: 10,
    maxHeight: dropdownHeight,
    position: "absolute",
  },
  input: {
    backgroundColor: colors.secondary25,
    borderColor: colors.secondary300,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.secondary900,
    fontSize: 14,
    fontWeight: "500",
    padding: 12,
    paddingRight: 36,
  },
  inputDisabled: {
    backgroundColor: colors.secondary100,
    borderColor: colors.secondary100,
    color: colors.secondary400,
  },
  label: {
    color: colors.primary600,
  },
  modalOverlay: {
    flex: 1,
  },
  rightIcon: {
    position: "absolute",
    right: 12,
  },
  text: {
    color: colors.secondary400,
    fontSize: 14,
  },
});

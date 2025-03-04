import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useAnimatedValue,
  View,
} from "react-native";
import React, { PropsWithChildren, useEffect } from "react";
import CloseIcon from "../../../assets/svg/x.svg";
import { colors } from "../../../theme/colors";

const OVERDRAG = 20;

type BottomSheetProps = {
  onClose: () => void;
  title: string;
  visible: boolean;
};

const screenHeight = Dimensions.get("window").height;

const BottomSheet: React.FC<PropsWithChildren<BottomSheetProps>> = ({
  onClose,
  title,
  children,
  visible,
}) => {
  const translateY = useAnimatedValue(screenHeight);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start(() => translateY.setValue(300));
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback testID="backdrop" onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.sheet,
                { transform: [{ translateY: translateY }] },
              ]}
              testID="sheet"
            >
              <View style={styles.sheetHeader} testID="sheet-header">
                <Text style={styles.sheetTitle} testID="sheet-title">
                  {title}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  testID="close-bottom-sheet-button"
                  onPress={onClose}
                  style={styles.closeButton}
                  hitSlop={16}
                >
                  <CloseIcon width={24} height={24} />
                </TouchableOpacity>
              </View>

              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.modalBackground,
    flex: 1,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: -OVERDRAG * 1.1,
    maxHeight: "70%",
    paddingBottom: OVERDRAG * 1.1 + 16,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  sheetHeader: {
    alignItems: "center",
    borderBottomColor: colors.secondary200,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sheetTitle: {
    color: colors.secondary900,
    fontSize: 16,
    fontWeight: "600",
  },
});

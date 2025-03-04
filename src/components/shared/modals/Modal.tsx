import {
  StyleSheet,
  View,
  Modal as RNModal,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { colors } from "../../../theme/colors";

import CloseIcon from "../../../assets/svg/x.svg";

type ModalProps = {
  modalVisible: boolean;
  onClose: () => void;
  title?: string;
  description?: string | React.JSX.Element;
  cancelButton?: React.JSX.Element;
  confirmButton?: React.JSX.Element;
};
const Modal: React.FC<ModalProps> = ({
  modalVisible,
  onClose,
  title,
  description,
  cancelButton,
  confirmButton,
}) => {
  const onPressOutside = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      onClose();
    }
  };

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
      testID="modal"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={onPressOutside}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  testID="close-modal-button"
                  activeOpacity={0.7}
                  onPress={onClose}
                  style={styles.closeButton}
                >
                  <CloseIcon />
                </TouchableOpacity>

                {title && (
                  <Text testID="modal-title" style={styles.modalTitle}>
                    {title}
                  </Text>
                )}

                {typeof description === "string" && (
                  <Text
                    style={styles.modalDescription}
                    testID="modal-description"
                  >
                    {description}
                  </Text>
                )}

                {typeof description !== "string" && description}

                <View style={styles.buttonGroup}>
                  {cancelButton}
                  {confirmButton}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  buttonGroup: {
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 16,
  },
  closeButton: { position: "absolute", right: 20, top: 20, zIndex: 1 },
  container: {
    alignItems: "center",
    backgroundColor: colors.modalBackground,
    flex: 1,
    justifyContent: "center",
  },
  keyboardAvoidingView: { flex: 1 },
  modalDescription: {
    color: colors.secondary600,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
  modalTitle: {
    color: colors.secondary900,
    fontSize: 16,
    fontWeight: "600",
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 8,
    margin: 20,
    padding: 20,
    width: "90%",
  },
});

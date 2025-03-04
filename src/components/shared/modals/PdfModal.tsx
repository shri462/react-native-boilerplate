import {
  StyleSheet,
  View,
  Modal as RNModal,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { colors } from "../../../theme/colors";
import CloseIcon from "../../../assets/svg/close.svg";
import Pdf from "react-native-pdf";
import ActionIcon from "../action-icon/ActionIcon";

type PdfViewModalProps = {
  modalVisible: boolean;
  onClose: () => void;
  fileName: string;
  src: string;
};

const PdfViewModal: React.FC<PdfViewModalProps> = ({
  modalVisible,
  onClose,
  src,
  fileName,
}) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
      testID="modal"
    >
      <SafeAreaView testID="safe-area" style={styles.container}>
        <View testID="modal-view" style={styles.modalView}>
          <Text testID="file-name" style={styles.fileName}>
            {fileName}
          </Text>
          <ActionIcon Icon={CloseIcon} onPress={onClose} />
        </View>
        <Pdf
          source={{ uri: src }}
          spacing={Platform.OS === "ios" ? 1 : 10}
          enableDoubleTapZoom
          style={styles.pdf}
          trustAllCerts={false}
        />
      </SafeAreaView>
    </RNModal>
  );
};

export default PdfViewModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileName: {
    color: colors.secondary900,
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "85%",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.secondary200,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  pdf: {
    backgroundColor: colors.secondary50,
    flex: 1,
  },
});

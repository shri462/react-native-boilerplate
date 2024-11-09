import { StyleSheet } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import SuccessIcon from '../assets/icons/success-icon.svg';
import ErrorIcon from '../assets/icons/error-icon.svg';
import colors from './colors';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1Style={styles.text1}
      contentContainerStyle={styles.contentContainer}
      style={styles.toastSuccess}
      renderLeadingIcon={() => <SuccessIcon />}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={styles.text1}
      contentContainerStyle={styles.contentContainer}
      style={styles.toastError}
      renderLeadingIcon={() => <ErrorIcon />}
    />
  ),
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 0,
    paddingHorizontal: 8,
  },
  text1: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '500',
  },
  toastError: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderLeftWidth: 1,
    borderRadius: 21,
    borderWidth: 1,
    flexDirection: 'row',
    height: 42,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    shadowColor: colors.white,
    width: 'auto',
  },
  toastSuccess: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderLeftWidth: 1,
    borderRadius: 21,
    borderWidth: 1,
    flexDirection: 'row',
    height: 42,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    shadowColor: colors.black,
    width: 'auto',
  },
});

export default toastConfig;

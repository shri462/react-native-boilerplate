import * as Keychain from 'react-native-keychain';

export const storeToken = async (token: string): Promise<void> => {
  await Keychain.setGenericPassword('authToken', token);
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const deleteToken = async (): Promise<void> => {
  await Keychain.resetGenericPassword();
};

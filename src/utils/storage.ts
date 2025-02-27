import * as Keychain from "react-native-keychain";

type IStoredToken = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
};

export const storeToken = async (tokens: IStoredToken): Promise<void> => {
  const tokenData = JSON.stringify(tokens);
  await Keychain.setGenericPassword("authToken", tokenData);
};

export const getToken = async (): Promise<IStoredToken | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const { accessToken, refreshToken, idToken } = JSON.parse(
        credentials.password,
      );
      return { accessToken, refreshToken, idToken };
    } else {
      return null;
    }
  } catch (_error) {
    return null;
  }
};

export const deleteToken = async (): Promise<void> => {
  await Keychain.resetGenericPassword();
};

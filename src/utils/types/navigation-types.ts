import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PermissionsScreen: undefined;
};

export type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home' | 'PermissionsScreen' | 'Login'
>;

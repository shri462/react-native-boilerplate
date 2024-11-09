import React from 'react';
import {
  NavigationProps,
  RootStackParamList,
} from '../utils/types/navigation-types';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';

const screens: {
  name: keyof RootStackParamList;
  component: React.FC<NavigationProps>;
}[] = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Login',
    component: Login,
  },
];

export default screens;

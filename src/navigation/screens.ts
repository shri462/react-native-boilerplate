import React from "react";
import { RootStackParamList } from "../utils/types/navigationTypes";
import Home from "../screens/home/Home";

const screens: {
  name: keyof RootStackParamList;
  component: React.FC;
  initialParams?: any;
}[] = [
  {
    name: "Home",
    component: Home,
  },
];

export default screens;

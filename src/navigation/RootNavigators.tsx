import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../utils/types/navigationTypes";
import screens from "./screens";
import { useAuthStore } from "../zustand-store/zustand-store";
import Login from "../screens/login/Login";
const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            {screens.map(screen => (
              <RootStack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                initialParams={screen.initialParams}
              />
            ))}
          </>
        ) : (
          <>
            <RootStack.Screen name="Login" component={Login} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

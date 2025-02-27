import React from "react";
import RootNavigator from "./src/navigation/RootNavigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import toastConfig from "./src/utils/toastConfig";
import Toast from "react-native-toast-message";

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <RootNavigator />
      <Toast config={toastConfig} position="bottom" bottomOffset={60} />
    </GestureHandlerRootView>
  );
}

export default App;

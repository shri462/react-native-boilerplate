import React from "react";
import RootNavigator from "./src/navigation/RootNavigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import toastConfig from "./src/utils/toastConfig";
import Toast from "react-native-toast-message";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/query-client/queryClient";

if (process.env.NODE_ENV === "development") {
  require("./src/query-client/reactotronConfig");
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast config={toastConfig} position="bottom" bottomOffset={60} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;

import React from 'react';
import { StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import toastConfig from './src/utils/toastConfig';
import Toast from 'react-native-toast-message';
import { queryClient } from './src/query-client/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast config={toastConfig} position="bottom" bottomOffset={60} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

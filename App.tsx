import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import { ThemeProvider } from './src/hooks/themeContext';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <StackNavigation />
          </ThemeProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </PaperProvider>
  );
}

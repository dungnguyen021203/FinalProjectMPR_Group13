// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './components/navigation/AppNavigator';
import NotesContextProvider from './components/context/NotesContext';

export default function App() {
  return (
    <NotesContextProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NotesContextProvider>
  );
}

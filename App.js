// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './components/navigation/AppNavigator';
import NotesContextProvider from './components/context/NotesContext';
import LabelsContextProvider from './components/context/LabelsContext';

export default function App() {
  return (
    <LabelsContextProvider>
    <NotesContextProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </NotesContextProvider>
    </LabelsContextProvider>
  );
}

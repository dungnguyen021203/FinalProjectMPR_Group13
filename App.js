// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './components/navigation/AppNavigator';
import NotesContextProvider from './components/context/NotesContext';
import LabelsContextProvider from './components/context/LabelsContext';

export default function App() {
  return (
    <NotesContextProvider>
      <LabelsContextProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </LabelsContextProvider>
    </NotesContextProvider>
    
  );
}

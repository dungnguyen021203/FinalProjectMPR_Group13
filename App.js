// App.js
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './components/navigation/AppNavigator';
import UnifiedContextProvider from './components/context/Context';

export default function App() {
    return (
        <UnifiedContextProvider>
            <SafeAreaProvider>
                <AppNavigator/>
            </SafeAreaProvider>
        </UnifiedContextProvider>
    );
}

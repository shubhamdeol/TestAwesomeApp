import React from 'react';
import {Appearance, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import {ThemeProvider, defaultTheme} from './ui/theme/ThemeContext';

function App() {
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  return (
    <ThemeProvider
      theme={{
        ...defaultTheme,
        dark: false,
      }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';
// import { useFonts } from 'expo-font';

import { theme } from './utils/constants';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // const [fontsLoaded] = useFonts({
  //   Quicksand: require('./assets/fonts/Quicksand.ttf'),
  // });
  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

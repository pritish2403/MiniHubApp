import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={NavigationDarkTheme}>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

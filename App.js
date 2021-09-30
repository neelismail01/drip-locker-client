import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Navigators
import Main from './Navigators/Main';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

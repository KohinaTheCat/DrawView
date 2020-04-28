import React from 'react'
import { View, Text } from 'react-native'
import Main from "./src/pages/Main"
import CameraExample from "./src/CameraExample.js"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Acc from './src/pages/Acc';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="Home"
            component={Main}
          />
          <Stack.Screen name="Camera" component={CameraExample} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App

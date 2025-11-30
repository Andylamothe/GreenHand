import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native'
import AppNavigator from './src/components/AppNavigator';
import { globalStyles,COLORS } from './src/style/Global';


export default function App() {
  return (

   <View style={globalStyles.container} >
       <AppNavigator />
    </View>
     
  );
}
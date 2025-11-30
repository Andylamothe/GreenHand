import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../app/Home";
import Inventory from "../app/Inventory";
import Chatbot from "../app/Chatbot";
import Profile from "../app/Profile";
import { View, Text } from 'react-native'
import { COLORS, globalStyles } from "../style/Global"; 


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ICONS = {
  Home: "home-outline",
  Chat: "chatbubble-ellipses-outline",
  Inventory: "cube-outline",
  Profile: "person-outline",
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => ( 
      <View style={focused ? globalStyles.tabIconActiveBg : globalStyles.tabIconInactiveBg}>
        <Ionicons name={ICONS[route.name]} size={size} color={color} />
      </View>
          
        ),
        tabBarStyle: globalStyles.tabBarGlassStyle,
         tabBarActiveTintColor: "white",
         tabBarInactiveTintColor: "white",

      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Chat" component={Chatbot} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
   <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false , contentStyle: {backgroundColor: COLORS.primaryGreen}}}>
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
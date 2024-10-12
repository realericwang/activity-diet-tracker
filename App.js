import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { lightTheme, darkTheme } from "./styles/theme";

import ActivitiesScreen from "./screens/ActivitiesScreen";
import DietScreen from "./screens/DietScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { ItemsProvider } from "./contexts/ItemsContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Activities") {
            iconName = focused ? "directions-run" : "directions-run";
          } else if (route.name === "Diet") {
            iconName = focused ? "restaurant" : "restaurant";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primaryColor,
        tabBarInactiveTintColor: theme.secondaryColor,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
          borderTopColor: theme.secondaryColor,
        },
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTintColor: theme.textColor,
      })}
    >
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ItemsProvider>
        <AppContent />
      </ItemsProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </NavigationContainer>
  );
}

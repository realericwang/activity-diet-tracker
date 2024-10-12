import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { lightTheme, darkTheme, commonStyles } from "../styles/theme";

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View
      style={[
        commonStyles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <TouchableOpacity
        style={[commonStyles.button, { backgroundColor: theme.primaryColor }]}
        onPress={toggleTheme}
      >
        <Text
          style={[commonStyles.buttonText, { color: theme.backgroundColor }]}
        >
          Toggle Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import React from "react";
import { View, StyleSheet } from "react-native";
import ItemsList from "../components/ItemsList";
import { useTheme } from "../contexts/ThemeContext";
import { lightTheme, darkTheme, commonStyles } from "../styles/theme";

export default function ActivitiesScreen() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <View
      style={[
        commonStyles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <ItemsList type="activities" />
    </View>
  );
}

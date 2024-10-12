import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ItemsList from "../components/ItemsList";
import { useTheme } from "../contexts/ThemeContext";
import { lightTheme, darkTheme, commonStyles } from "../styles/theme";
import { useDiet } from "../contexts/DietContext";

export default function DietScreen() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Add A Diet Entry")}
          style={{ marginRight: 15 }}
        >
          <MaterialIcons name="add" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <ItemsList type="diet" />
    </View>
  );
}

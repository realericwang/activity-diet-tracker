import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useActivities } from "../contexts/ActivityContext";
import { useDiet } from "../contexts/DietContext";
import { useTheme } from "../contexts/ThemeContext";
import { lightTheme, darkTheme } from "../styles/theme";

const ItemsList = ({ type }) => {
  const { activities } = useActivities();
  const { dietItems } = useDiet();
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const data = type === "activities" ? activities : dietItems;

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: theme.itemBackground }]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.itemName, { color: theme.textColor }]}>{item.name}</Text>
        {type === "activities" && item.isSpecial && (
          <MaterialIcons name="warning-amber" size={24} color={theme.primaryColor} />
        )}
      </View>
      <Text style={[styles.itemDate, { color: theme.secondaryColor }]}>{item.date}</Text>
      <Text style={[styles.itemDetail, { color: theme.textColor }]}>
        {type === "activities"
          ? `Duration: ${item.duration}`
          : `Calories: ${item.calories}`}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 14,
    marginTop: 4,
  },
  itemDetail: {
    fontSize: 14,
    marginTop: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ItemsList;

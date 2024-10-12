import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useItems } from "../contexts/ItemsContext";

const ItemsList = ({ type }) => {
  const { activities, dietItems } = useItems();
  const data = type === "activities" ? activities : dietItems;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDate}>{item.date}</Text>
      <Text style={styles.itemDetail}>
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
    backgroundColor: "#f9f9f9",
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
    color: "#666",
    marginTop: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
});

export default ItemsList;

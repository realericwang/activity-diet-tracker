import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../contexts/ThemeContext";
import { useDiet } from "../contexts/DietContext";
import { lightTheme, darkTheme, commonStyles } from "../styles/theme";

export default function AddDietScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { dietItems, setDietItems } = useDiet();

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!name || !calories || !date) {
      Alert.alert("Invalid Input", "Please fill in all fields.");
      return;
    }

    const caloriesNum = parseInt(calories, 10);
    if (isNaN(caloriesNum) || caloriesNum <= 0) {
      Alert.alert("Invalid Input", "Calories must be a positive number.");
      return;
    }

    const newDietItem = {
      id: dietItems.length + 1,
      name,
      calories: caloriesNum,
      date: date.toISOString().split("T")[0],
    };

    setDietItems([...dietItems, newDietItem]);
    navigation.goBack();
  };

  return (
    <View
      style={[
        commonStyles.container,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.itemBackground, color: theme.textColor },
        ]}
        placeholder="Food Name"
        placeholderTextColor={theme.secondaryColor}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[
          styles.input,
          { backgroundColor: theme.itemBackground, color: theme.textColor },
        ]}
        placeholder="Calories"
        placeholderTextColor={theme.secondaryColor}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.input, { backgroundColor: theme.itemBackground }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: theme.textColor }}>
          {date.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondaryColor }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primaryColor }]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../contexts/ThemeContext";
import { useDiet } from "../contexts/DietContext";
import { lightTheme, darkTheme } from "../styles/theme";
import { format } from "date-fns";

export default function AddDietScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { addDietItem } = useDiet();

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDateWithDay = (date) => {
    return format(date, "yyyy-MM-dd EEE");
  };

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
      id: Date.now(),
      name,
      calories: caloriesNum,
      date: formatDateWithDay(date),
    };

    addDietItem(newDietItem);
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContent,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <View style={styles.formContainer}>
        <Text style={[styles.label, { color: theme.textColor }]}>
          Description *
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.itemBackground, color: theme.textColor },
          ]}
          placeholderTextColor={theme.secondaryColor}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Calories *</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.itemBackground, color: theme.textColor },
          ]}
          placeholder="Enter calories"
          placeholderTextColor={theme.secondaryColor}
          value={calories}
          onChangeText={setCalories}
          keyboardType="default"
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
        <TouchableOpacity
          style={[styles.dateInput, { backgroundColor: theme.itemBackground }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[styles.dateText, { color: theme.textColor }]}>
            {formatDateWithDay(date)}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    paddingTop: 40,
  },
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  dateInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  dateText: {
    textAlign: "left",
  },
});

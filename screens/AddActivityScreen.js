import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../contexts/ThemeContext";
import { useActivities } from "../contexts/ActivityContext";
import { lightTheme, darkTheme, commonStyles } from "../styles/theme";
import { format } from "date-fns";

const activityTypes = [
  { label: "Walking", value: "Walking" },
  { label: "Running", value: "Running" },
  { label: "Swimming", value: "Swimming" },
  { label: "Weights", value: "Weights" },
  { label: "Yoga", value: "Yoga" },
  { label: "Cycling", value: "Cycling" },
  { label: "Hiking", value: "Hiking" },
];

export default function AddActivityScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { addActivity } = useActivities();

  const [open, setOpen] = useState(false);
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDateWithDay = (date) => {
    return format(date, "yyyy-MM-dd EEE");
  };

  const handleSave = () => {
    if (!activityType || !duration || !date) {
      Alert.alert("Invalid Input", "Please fill in all fields.");
      return;
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert("Invalid Input", "Duration must be a positive number.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      name: activityType,
      duration: `${durationNum} mins`,
      date: formatDateWithDay(date),
      isSpecial:
        (activityType === "Running" || activityType === "Weights") &&
        durationNum > 60,
    };

    addActivity(newActivity);
    navigation.goBack();
  };

  return (
    <View
      style={[
        commonStyles.container,
        styles.formContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <View style={styles.formContent}>
        <Text style={[styles.label, { color: theme.textColor }]}>Activity *</Text>
        <DropDownPicker
          open={open}
          value={activityType}
          items={activityTypes}
          setOpen={setOpen}
          setValue={setActivityType}
          style={[styles.dropdown, { backgroundColor: theme.itemBackground }]}
          textStyle={{ color: theme.textColor }}
          dropDownContainerStyle={{ backgroundColor: theme.itemBackground }}
          placeholder="Select an activity"
          placeholderStyle={{ color: theme.secondaryColor }}
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Duration (min) *</Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.itemBackground, color: theme.textColor },
          ]}
          placeholderTextColor={theme.secondaryColor}
          value={duration}
          onChangeText={setDuration}
          keyboardType="default"
        />

        <Text style={[styles.label, { color: theme.textColor }]}>Date *</Text>
        <TouchableOpacity
          style={[
            styles.input,
            styles.dateInput,
            { backgroundColor: theme.itemBackground },
          ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  formContent: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  dropdown: {
    marginBottom: 20,
    width: "100%",
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
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    textAlign: "left",
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

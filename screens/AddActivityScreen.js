import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../contexts/ThemeContext';
import { useItems } from '../contexts/ItemsContext';
import { lightTheme, darkTheme, commonStyles } from '../styles/theme';

const activityTypes = [
  { label: 'Walking', value: 'Walking' },
  { label: 'Running', value: 'Running' },
  { label: 'Swimming', value: 'Swimming' },
  { label: 'Weights', value: 'Weights' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Cycling', value: 'Cycling' },
  { label: 'Hiking', value: 'Hiking' },
];

export default function AddActivityScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { activities, setActivities } = useItems();

  const [open, setOpen] = useState(false);
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!activityType || !duration || !date) {
      Alert.alert('Invalid Input', 'Please fill in all fields.');
      return;
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert('Invalid Input', 'Duration must be a positive number.');
      return;
    }

    const newActivity = {
      id: activities.length + 1,
      name: activityType,
      duration: `${durationNum} minutes`,
      date: date.toISOString().split('T')[0],
      isSpecial: (activityType === 'Running' || activityType === 'Weights') && durationNum > 60
    };

    setActivities([...activities, newActivity]);
    navigation.goBack();
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <DropDownPicker
        open={open}
        value={activityType}
        items={activityTypes}
        setOpen={setOpen}
        setValue={setActivityType}
        style={[styles.dropdown, { backgroundColor: theme.itemBackground }]}
        textStyle={{ color: theme.textColor }}
        dropDownContainerStyle={{ backgroundColor: theme.itemBackground }}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme.itemBackground, color: theme.textColor }]}
        placeholder="Duration (minutes)"
        placeholderTextColor={theme.secondaryColor}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.input, { backgroundColor: theme.itemBackground }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: theme.textColor }}>
          {date.toISOString().split('T')[0]}
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
          style={[styles.button, { backgroundColor: theme.primaryColor }]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.secondaryColor }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


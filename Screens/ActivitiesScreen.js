import React from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';

export default function ActivitiesScreen() {
  return (
    <View style={styles.container}>
      <ItemsList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});

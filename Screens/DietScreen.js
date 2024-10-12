import React from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';

export default function DietScreen() {
  return (
    <View style={styles.container}>
      <ItemsList type="diet" />
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

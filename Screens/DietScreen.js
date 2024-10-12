import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DietScreen() {
  return (
    <View style={styles.container}>
      <Text>Diet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
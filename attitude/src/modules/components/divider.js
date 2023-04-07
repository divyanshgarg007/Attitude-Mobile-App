/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';

export function Divider() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    height: 1,
    backgroundColor: '#888',
  },
});

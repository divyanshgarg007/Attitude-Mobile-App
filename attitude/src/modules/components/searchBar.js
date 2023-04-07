/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import IMG_MAGNIFY from '../../assets/images/magnifyingglass.png';

export function SearchBar(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Text style={styles.searchText}>Search</Text>
      <Image style={styles.magnify} source={IMG_MAGNIFY} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 19,
    paddingRight: 10,
    marginHorizontal: 8,
    height: 42,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchText: {
    fontSize: 14,
    fontFamily: 'CenturyGothic',
    color: '#666',
  },
  magnify:{width: 39, height: 39, resizeMode: 'contain'},
});

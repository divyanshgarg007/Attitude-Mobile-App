/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';

import GlobalStyle from '../styles/globalstyle';
import ARROWDOWN from '../../assets/images/arrowdown.png';

export function CountryDropDown(props) {
  return (
    <TouchableOpacity
      style={[styles.bg, props.style]}
      onPress={() => props.onClick(props.type)}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.label}</Text>
        <Image style={{width: 21, height: 21, resizeMode: 'contain'}} source={ARROWDOWN} />
      </View>
      <Text style={styles.value}>{props.value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 25,
    borderBottomColor: '#000',
    borderBottomWidth: 0.28,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
    lineHeight: 14,
    color: '#000000',
  },
  value: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    color: '#000',
    paddingLeft: 5,
    paddingTop: 10,
  },
});

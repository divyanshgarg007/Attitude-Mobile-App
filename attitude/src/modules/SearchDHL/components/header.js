import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Check from '../../../assets/images/check_cir.png'
import GlobalStyle from '../../styles/globalstyle';

export const Header = props => {
  return (
    <TouchableOpacity style={styles.mainBox}>
      <Image source={Check} style={styles.image} />
      <Text style={styles.textStyle}>Search in My Area</Text>
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  mainBox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  textStyle: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }
});

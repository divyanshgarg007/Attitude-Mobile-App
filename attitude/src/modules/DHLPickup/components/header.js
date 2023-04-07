import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Check from '../../../assets/images/check_cir.png'
import GlobalStyle from '../../styles/globalstyle';

export const Header = props => {
  return (
    <View style={styles.mainBox}>
      <Text style={styles.textStyle}>{props?.length} Matching Results</Text>
      <Text style={styles.textdesc}>""{props?.length} Matching Results""</Text>
    </View>
  );
};
export const styles = StyleSheet.create({
  mainBox: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 10,
    marginBottom: 15,
  },
  textStyle: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 16,
  },
  textdesc: {
    color: '#777',
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 16,
  }
});

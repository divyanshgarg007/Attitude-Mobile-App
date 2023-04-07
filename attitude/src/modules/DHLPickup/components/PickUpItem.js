/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonAction } from '../../components';
import GlobalStyle from '../../styles/globalstyle';

export default function PickUpItem(props) {
  return (
    <View style={styles.bookingContainer}>
      <View style={styles.bookingBox}>
        <Text style={styles.bookingTitle}>
          {props?.item?.name}
        </Text>
        <Text style={styles.bookingdesc}>
          ({props?.item?.distance / 1000} Km)
        </Text>
        <Text style={styles.bookingdesc}>
          {props?.item?.name}
        </Text>
        <ButtonAction
          isValid={true}
          style={styles.btnSelect}
          title="Select"
          onClick={() => props?.handleSelectAddress(props?.item)}
        />
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  bookingContainer: {
    flex: 1,
  },
  bookingBox: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    marginBottom: 15,
  },
  bookingTitle: {
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    color: '#000',
    fontSize: 16,
  },
  bookingdesc: {
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    color: '#777',
    fontSize: 16,
  },
  btnSelect: {
    // height: 45,
    backgroundColor: '#000',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 12,
    width: 150,
  }
});

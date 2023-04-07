/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { Item } from './Item';
import CANCEL from '../../../assets/images/cancel.png';
const DEVICE_WIDTH = Dimensions.get('window').width;

export function ScrollViewHoriRect(props) {
  const scroll = useRef(null);
  const deleteAction = (data) => {
    Alert.alert(
      "Alert",
      "Are you sure you want to Delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => props.onClickDelete(data) }
      ]
    );
  }
  const getEventList = () => {
    let arr = [];
    let marginLeft = 0;
    props.data &&
      props.data.map((obj, i) => {
        marginLeft = i === 0 ? 0 : 12;
        arr.push(
          <Item
            key={`${i}`}
            index={i}
            data={obj}
            type={props.type}
            style={{ marginLeft: marginLeft }}
            onClick={data => props.onClick(data)}
            onClickDelete={data => props.onClickDelete(data)}
          />,
        );
      });

    if (arr.length === 0) {
      arr.push(
        <View key="no_article">
          <Text style={styles.emptyText}>No article found</Text>
        </View>,
      );
    }
    return arr;
  };

  return (
    <View style={{ marginTop: 20, marginHorizontal: 9 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>{props.title}</Text>
        {
          props?.type === 'recently' && props?.type !== undefined &&
          <TouchableOpacity onPress={() => deleteAction(props?.data)}>
            <Image resizeMode="contain" source={CANCEL} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        }
      </View>
      <ScrollView style={{ marginTop: 5 }} horizontal={true} ref={scroll}>
        {getEventList()}

      </ScrollView>
      <View
        style={{
          //   marginTop: -5,
          //   marginLeft: 5,
          //   width: DEVICE_WIDTH - 60,
          //   height: 1,
          //   backgroundColor: '#E5E5E5',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'CenturyGothic-Bold',
    lineHeight: 27,
    color: '#000000',
  },
  subTitle: {
    fontSize: 6,
    fontFamily: 'CenturyGothic-Bold',
    color: '#000000',
  },
  emptyText: {
    paddingTop: 5,
    paddingBottom: 25,
    fontSize: 12,
    fontFamily: 'CenturyGothic',
    lineHeight: 27,
    color: '#000000',
  },
});

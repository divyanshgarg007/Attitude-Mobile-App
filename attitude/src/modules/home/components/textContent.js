/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GlobalStyle from '../../styles/globalstyle';

export const TextContent = props => {
  return (
    <>
      {props?.data?.duplicable?.d?.[0] && (props?.data?.duplicable?.d[0]['item-title'] || props?.data?.duplicable?.d[0]['item-text']) &&
        < View style={styles.container}>
          {props?.data?.duplicable?.d.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => props.onClickText(item)}>
                  {item['item-title'] &&
                    <Text style={styles.title}>{item['item-title']}</Text>
                  }
                  {
                    item['item-text'] &&
                    <Text style={styles.text}>{item['item-text']?.replace(/<[^>]+>/g, '')}</Text>
                  }

                </TouchableOpacity>
                <View style={{ height: 10 }} />
              </View>
            );
          })}
        </View>
      }

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#922A27',
    paddingVertical: 10,
  },
  title: {
    fontFamily: GlobalStyle.fontSet.DolceVitaHeavyBold,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});

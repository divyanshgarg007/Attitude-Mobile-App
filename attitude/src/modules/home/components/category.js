import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, Image } from "react-native"
import FastImage from "react-native-fast-image";

import ICON_DRESSES from '../../../assets/images/home/dresses.jpeg'
import ICON_SHOES from '../../../assets/images/home/shoes.jpeg'
import ICON_LIFESTYLE from '../../../assets/images/home/lifestyle.jpeg'
import ICON_VALENTINE from '../../../assets/images/home/valentine.jpeg'
import { HOME_CONTENT_IMG } from "../../../util/constants";

const data = [
    { id: 'a', value: 'Dresses', icon: ICON_DRESSES },
    { id: 'b', value: 'Shoes', icon: ICON_SHOES },
    { id: 'c', value: 'Lifestyle', icon: ICON_LIFESTYLE },
    { id: 'd', value: 'Valentine', icon: ICON_VALENTINE },
];

const numColumns = 2
const size = Dimensions.get('window').width / numColumns


export function Category(props) {
    console.log('props.productgroup', props.productgroup)
    function getGrid() {
        var arr = []

        if (props.productgroup) {
            for (let i = 0; i < props?.productgroup?.duplicable?.d?.length - 1; i += 2) {
                console.log("INDEX: ", i)
                arr.push(
                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                        <CategoryItem
                            key={i + 100}
                            item={props.productgroup.duplicable.d[i]}
                            onClickProductGroupItem={(obj) => props.onClickProductGroupItem(obj)}
                        />
                        <CategoryItem
                            key={i + 200}
                            item={props.productgroup.duplicable.d[i + 1]}
                            onClickProductGroupItem={(obj) => props.onClickProductGroupItem(obj)}
                        />
                    </View>
                )
            }
        }


        return arr
    }

    return (
        <View style={{ marginTop: 20 }}>
            {getGrid()}
            {/* <FlatGrid
                itemDimension={130}
                data={props.productgroup.duplicable.d}
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flex: 1 }}
                spacing={10}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => props.onClick(item)}>
                        <FastImage style={styles.itemContainerr} source={{ uri: `${IMAGE_PREFIX}${item.image}` }} />
                        <View style={styles.priceLikeContainer}>
                            <Text style={styles.itemPrice}>hi</Text>
                        </View>

                    </TouchableOpacity>
                )}

            /> */}
        </View>
    );
}


const CategoryItem = (props) => {
    return (
        <TouchableOpacity style={styles.itemContainer}

            onPress={() =>
                props.item['item-action'] && props.item['item-action'] !== undefined && props.item['item-action-data'] && props.item['item-action-data'] !== undefined &&
                props.onClickProductGroupItem({
                    "id": props.item && props?.item["item-action-data"] !== undefined ? props?.item["item-action-data"] : null,
                    "title": props.item && props?.item["item-title"] !== undefined ? props?.item["item-title"] : null
                })}
        >
            <FastImage resizeMode="contain" style={[styles.item]} source={{ uri: `${HOME_CONTENT_IMG}${props?.item["item-img"]}` }} />
            <Text style={styles.title}>{props.item && props?.item["item-title"] !== undefined ? props?.item["item-title"] : null}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 5,
        width: size - 18,
        height: size + 10,
        //backgroundColor: 'red'
    },
    item: {
        width: size - 18,
        height: size - 18,
    },
    title: {
        fontSize: 14,
        fontFamily: 'CenturyGothic-Bold',
        lineHeight: 27,
        color: "#000000"
    },
    itemContainerr: {
        justifyContent: 'flex-end',
        padding: 10,
        height: 150,
        backgroundColor: "#000"
    },
    itemPrice: {
        fontFamily: 'CenturyGothic-Bold',
        fontSize: 12,
        lineHeight: 14,
        color: '#000'
    },
    itemName: {
        fontFamily: 'CenturyGothic',
        fontSize: 12,
        color: '#000',
        lineHeight: 14,
    },
    priceLikeContainer: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
});
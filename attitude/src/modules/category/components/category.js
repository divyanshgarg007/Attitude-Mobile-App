import React, { useRef } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, Image, ScrollView } from "react-native"
import ICON_HAIR from '../../../assets/images/home/attitudeHairColour.jpeg'
import ICON_FORUM from '../../../assets/images/home/forum.jpeg'
import { HOME_CONTENT_IMG } from '../../../util/constants';

const data = [
    { id: 'hairdye', value: 'Attitude Hair Colour', icon: ICON_HAIR },
    { id: 'forum', value: 'Forum', icon: ICON_FORUM },
];

const numColumns = 2
const size = Dimensions.get('window').width / numColumns


export function Category(props) {
    const scroll = useRef(null);
    function getGrid() {
        var arr = []
        for (let i = 1; i < props?.img?.length; i += 1) {
            console.log("INDEX: ", i)
            arr.push(
                <View key={i} style={{ flexDirection: 'row', }}>
                    <CategoryItem item={props?.img[i]} onClickProductGroupItem={(item) => props.onClickProductGroupItem(item)} />
                    {/* <CategoryItem item={props?.img[i + 1]} onClickProductGroupItem={(item) => props.onClickProductGroupItem(item)} /> */}
                </View>
            )
        }

        return arr
    }

    return (
        <View style={{ marginTop: 20, marginHorizontal: 15, }}>
            <ScrollView horizontal={true} ref={scroll}>
                {getGrid()}
            </ScrollView>
        </View>
    );
}


const IMAGE_URL = "https://www.learningcontainer.com/wp-content/uploads/2020/07/Sample-JPEG-Image-File-Download-scaled.jpg"

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
            <Image style={[styles.item]} resizeMode="contain" source={{ uri: props?.item && props?.item['item-img'] ? `${HOME_CONTENT_IMG}${props?.item["item-img"]}` : '' }} />
            <Text style={styles.title}>{props.item && props?.item["item-title"] !== undefined ? props?.item["item-title"] : null}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 5,
        width: size - 18,
        height: size - 18,
    },
    item: {
        width: size - 45,
        height: size - 45
    },
    title: {
        fontSize: 14,
        fontFamily: 'CenturyGothic-Bold',
        lineHeight: 27,
        color: "#000"
    },
});
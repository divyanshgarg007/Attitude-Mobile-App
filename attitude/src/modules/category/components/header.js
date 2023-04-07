import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import ICON_WOMEN from '../../../assets/images/home/women.jpeg'
import ICON_MEN from '../../../assets/images/home/men.jpeg'
import { HOME_CONTENT_IMG } from '../../../util/constants';
const IMAGE_URL = "https://www.learningcontainer.com/wp-content/uploads/2020/07/Sample-JPEG-file-download-for-Testing.png"

export function Header(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.onClickProductGroupItem({
                    "id": props.img && props?.img["item-action-data"] !== undefined ? props?.img["item-action-data"] : null,
                    "title": props.img && props?.img["item-title"] !== undefined ? props?.img["item-title"] : null
                })}
            >
                <Image style={styles.image} source={{ uri: props?.img && props?.img['item-img'] ? `${HOME_CONTENT_IMG}${props?.img['item-img']}` : '' }} resizeMode="cover" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 9,
        marginTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    image: {
        backgroundColor: '#fff',
        width: '100%',
        height: (1.75 * 75),
    }
})
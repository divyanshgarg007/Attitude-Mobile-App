import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { HOME_CONTENT_IMG } from "../../../util/constants";

export function Banner(props) {
    return (
        <View>
            {
                props.data?.duplicable?.d.map((item, index) => {
                    return (
                        <View key={index}>
                            <ImageComp
                                item={item}
                                onClick={(obj) => props.onClickBanner(obj)}
                            />
                            <View style={{ height: 10 }} />
                        </View>
                    )
                })
            }
        </View>
    )
}

const ImageComp = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onClick(props.item)}>
            <Image resizeMode="cover" style={{ width: '100%', height: 130 }} source={{ uri: `${HOME_CONTENT_IMG}${props.item["item-img"]}` }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#922A27',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {

        fontFamily: "CenturyGothic-Bold",
        fontSize: 24,
        color: "#FFF"
    },
    discountText: {
        marginTop: 10,
        fontFamily: "CenturyGothic",
        fontSize: 16,
        color: "#FFF"
    }
})
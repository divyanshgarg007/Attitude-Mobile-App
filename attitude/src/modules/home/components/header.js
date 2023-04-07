import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { SliderBox } from "react-native-image-slider-box";

import ICON1 from '../../../assets/images/home/homepage_001.jpeg'
import ICON2 from '../../../assets/images/home/homepage_002.jpeg'
import ICON3 from '../../../assets/images/home/homepage_003.jpeg'
import ICON4 from '../../../assets/images/home/homepage_004.jpeg'
import { HOME_CONTENT_IMG } from "../../../util/constants";

const IMAGE_URL = "https://www.learningcontainer.com/wp-content/uploads/2020/07/Sample-JPEG-file-download-for-Testing.png"
const TEXT = "20% Discount Orders > €50"

export function Header(props) {
    const images = [
        "https://samplelib.com/lib/preview/jpeg/sample-clouds-400x300.jpg",
        "https://samplelib.com/lib/preview/jpeg/sample-city-park-400x300.jpg",
        "https://samplelib.com/lib/preview/jpeg/sample-birch-400x300.jpg",
        "https://samplelib.com/lib/preview/png/sample-bumblebee-400x300.png"]


    const renderLoader = () => {
        return null
    }
    return (
        <View>
            <View style={styles.textContainer}>
                {/* <Text style={styles.textTitle}>ATTITUDE 23 YEARS</Text>
                <Text style={styles.discountText}>{TEXT}</Text>
                <Text style={[styles.discountText, { fontSize: 10 }]}>*Shoes Excluded</Text> */}
                {
                    props.banner &&
                    <TouchableOpacity style={{ width: '100%', height: 125 }} onPress={() => props.onClickBanner(props.banner['item-action-data'])}>
                        <Image
                            style={{ width: '100%', height: 125 }}
                            resizeMode="cover"
                            source={{ uri: `${HOME_CONTENT_IMG}${props.banner['item-img']}` }} />
                    </TouchableOpacity>
                }
            </View>

        </View>
    )
}

const ImageComp = (props) => {
    return (

        <TouchableOpacity onPress={() => props.onClick(props.item.source)}>
            <Image resizeMode="cover" style={{ width: '100%', height: 130 }} source={{ uri: `${HOME_CONTENT_IMG}${props.item.source["item-img"]}` }} />
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
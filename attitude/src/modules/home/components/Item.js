import React from "react"
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMAGE_PREFIX } from "../../../util/constants";
import FastImage from "react-native-fast-image";

const IMG_URI = "https://filesamples.com/samples/image/jpeg/sample_640%C3%97426.jpeg"

export function Item(props) {

    return (
        <>
            <TouchableOpacity style={props.style} onPress={() => props.onClick(props.data)}>
                <FastImage
                    imageStyle={{ borderRadius: 3, }}
                    style={styles.image}
                    source={{ uri: `${IMAGE_PREFIX}${props.data.image}` }} />
            </TouchableOpacity>
        </>
    )

}

const styles = StyleSheet.create({
    image: {
        backgroundColor: '#000',
        width: 110,
        height: 110,
    }
})


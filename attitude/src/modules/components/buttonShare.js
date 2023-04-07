import React from "react";
import { TouchableOpacity, Image } from "react-native"
import SHARE from '../../assets/images/share.png'

export function ButtonShare(props) {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Image style={{ width: 30, height: 30, }} source={SHARE} />
        </TouchableOpacity>
    )
}
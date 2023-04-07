import React from "react"
import { Image, TouchableOpacity } from "react-native"
import BACK from '../../assets/images/back.png'

export function Back(props) {
    return (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image style={{ width: 34, height: 34, }} source={BACK} />
        </TouchableOpacity>
    )
}

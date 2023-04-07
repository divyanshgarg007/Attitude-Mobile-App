import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import GlobalStyle from "../../styles/globalstyle";
import WISH from '../../../assets/images/wishlistlike.png'
import WISHSEL from '../../../assets/images/wishlistlikesel.png'

export function ButtonWish(props) {
    const [select, setSelect] = useState(false)

    const onClick = () => {
        setSelect(!select)
    }
    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={() => onClick()}>
            <Image style={{ width: 12, height: 10, }} source={select ? WISHSEL : WISH} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
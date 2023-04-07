import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import GlobalStyle from "../../styles/globalstyle";
import WISH from '../../../assets/images/wishlist.png'
import WISH_SEL from '../../../assets/images/wishsel.png'

export function ButtonWish(props) {
    const [select, setSelect] = useState(false)

    const onClick = () => {
        props.onClickFav(!props.fav)
        //setSelect(!select)
    }
    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={() => onClick()}>
            <Image style={{ width: 34, height: 29 }} source={props.fav ? WISH_SEL : WISH} />
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
import React, { memo } from "react"

import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import ICON_UNCHECK from "../../../assets/images/uncheck.png"
import ICON_CHECK from "../../../assets/images/check_cir.png"
import GlobalStyle from "../../styles/globalstyle"

const FilterItem = (props) => {
    return (
        <TouchableOpacity style={styles.itemBg} onPress={() => props.onClick(props.title, props.section)}>
            <Text style={styles.item}>{props.title._attrs.desc ? props.title._attrs.desc : props.title._attrs.name}</Text>
            <Image style={{ width: 20, height: 20 }} source={props.title.select ? ICON_CHECK : ICON_UNCHECK} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 16,
        color: "#000",
        backgroundColor: 'white'
    },
    itemBg: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

export default memo(FilterItem)

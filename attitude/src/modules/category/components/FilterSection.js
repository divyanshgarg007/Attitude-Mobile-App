
import React, { memo } from "react"
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native"
import GlobalStyle from '../../styles/globalstyle';
import ICON_DOWN from "../../../assets/images/arrowdown.png"
import ICON_UP from "../../../assets/images/arrowup.png"

const FilterSection = (props) => {
    return (
        <TouchableOpacity style={styles.headerBg} onPress={() => props.onClick(props.sectionObj)}>
            <Text style={props.sectionObj.show ? styles.titleBold : styles.title}>{props.sectionObj.name}</Text>
            {
                props.sectionObj.child &&
                <Image style={{ width: 20, height: 20 }} source={props.sectionObj.show ? ICON_UP : ICON_DOWN} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 16,
        color: "#000",
        paddingVertical: 10,
    },
    titleBold: {
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 16,
        color: "#000",
        paddingVertical: 10,
    },
    headerBg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 0.5,
        borderTopColor: 'lightgray',
        borderTopWidth: 0.5,
        paddingVertical: 5
    },
})

export default memo(FilterSection)
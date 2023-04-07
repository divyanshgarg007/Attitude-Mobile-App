import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const FilterButton = (props) => {

    const [isSelect, setSelect] = useState(props.isSelected)

    function onSelect() {
        //setSelect(!isSelect)
        props.onClick(props.obj)
    }

    var btnStyle = isSelect ? styles.buttonSelect : styles.button
    var textStyle = isSelect ? styles.titleSelect : styles.title
    return (
        <TouchableOpacity style={[btnStyle, props.style]} onPress={() => onSelect()}>
            <Text style={textStyle}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingHorizontal: 12,

        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#3E4743',
        borderRadius: 3,

    },
    buttonSelect: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: '#000'
    },
    title: {
        fontFamily: 'CenturyGothic',
        fontSize: 12,
        textAlign: 'center',
        color: '#000'
    },
    titleSelect: {
        fontFamily: 'CenturyGothic',
        fontSize: 12,
        textAlign: 'center',
        color: '#fff'
    }
})



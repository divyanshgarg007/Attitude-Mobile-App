import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import GlobalStyle from "../../styles/globalstyle";

export function MoreInfo(props) {
    return (
        <View style={[styles.container, props.style]}>
            <View style={{ backgroundColor: '#ffffff' }}>
                <Item title="Product information" onClickMore={(title) => props.onClickMore(title)} />
                <Divider />
                <Item title="Size chart" onClickMore={(title) => props.onClickMore(title)} />
                <Divider />
                {/* <Item title="Reviews" onClickMore={(title) => props.onClickMore(title)} /> */}
                <Divider />

                {/* <Item title="Ask a question" /> */}
            </View>
        </View>
    )
}

const Item = (props) => {
    return (
        <TouchableOpacity style={[styles.item]} onPress={() => props.onClickMore(props.title)}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const Divider = () => {
    return (
        <View style={{ height: 0.33, backgroundColor: "black" }} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingVertical: 10,
    },
    item: {
        padding: 10,
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        lineHeight: 13,
        color: '#000'
    }
})
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native"
import IMG_BACK from '../../assets/images/back.png'
import IMG_CANCEL from '../../assets/images/cancel.png'
import GlobalStyle from "../styles/globalstyle";

export function SearchTextBar(props) {

    return (
        <View style={{ alignItems: 'center', paddingBottom: 10, flexDirection: 'row', borderBottomColor: "black", borderBottomWidth: 0.33 }}>
            <IconB style={{ width: 42, height: 42 }} icon={IMG_BACK} onClick={props.onClick} />
            <View style={styles.container}>
                <TextInput
                    style={styles.searchText}
                    placeholder="Search"
                    returnKeyType="go"
                    placeholderTextColor={"gray"}
                    value={props?.value}
                    onChangeText={(text) => props?.onUpdateText(text)}
                    onSubmitEditing={item => {
                        {
                            props?.type === 'home' && props?.type !== undefined ?
                            props?.onUpdateText(props?.value)
                            :
                            props?.handleSearchDHL(props?.value)
                        }

                    }}
                />
                <IconB style={{ width: 12, height: 24 }} icon={props?.value?.length > 0 ? IMG_CANCEL : null} isText={props?.value?.length > 0} onClick={() => props?.onUpdateText("")} />
            </View>
        </View>
    )
}

function IconB(props) {
    return (
        <TouchableOpacity style={{ marginTop: Platform.OS === "ios" ? 0 : 10 }} onPress={props.onClick}>
            {
                props?.icon &&
                <Image style={props.style} source={props.icon} />
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 19,
        paddingRight: 10,
        marginHorizontal: 8,
        height: 42,
        borderColor: '#000000',
        borderWidth: 0.33,
        borderRadius: 5,
        // backgroundColor: 'red'
    },
    searchText: {
        flex: 1,
        color: "#000",
        fontSize: 14,
        fontFamily: 'CenturyGothic',
    }
})


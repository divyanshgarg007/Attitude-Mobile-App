import React, { useState } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, View, FlatList, TouchableOpacity, Text, Image, TextInput } from "react-native"

import DATAS from '../../assets/mockdata/boardsuggestion.json'

import { styles } from "./wishlist.style";
import GlobalStyle from "../styles/globalstyle";

import { NavigationBar } from "./components";
import UP_ARROW from '../../assets/images/uparrow.png'


export default function CreateBoardView(props) {

    const [data, setData] = useState(DATAS)
    const [value, setValue] = useState('')



    onClickDelete = (index) => {
        var array = data
        array.splice(index, 1)
        setData(array)
    }

    const onChangeText = (text) => {
        setValue(text)
        //alert(text)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationBar type={"createBoard"} title="CREATE BOARD" navigation={props.navigation} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Header value={value} onChangeText={(text) => onChangeText(text)} />
                <FlatList
                    style={{ flex: 1, marginTop: 0 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={data}
                    renderItem={({ item }) => (
                        <Item item={item} />
                    )}
                    keyExtractor={item => item.id}
                //ListHeaderComponent={() => <Header value={value} onChangeText={(text) => onChangeText(text)} />}
                //ItemSeparatorComponent={() => <View style={{ marginLeft: '2%', height: 0.33, backgroundColor: 'black' }} />}
                />

                <TouchableOpacity style={styles.btnContainer}>
                    <Text style={{ fontFamily: GlobalStyle.fontSet.CenturyGothicBold, color: "#fff" }}>CREATE BOARD</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const Header = (props) => {
    const onChangeText = (text) => {
        props.onChangeText(text)
    }

    return (
        <View style={{ marginTop: Platform.OS === 'ios' ? 40 : 50, paddingHorizontal: 10, justifyContent: 'center', paddingVertical: 10 }}>
            <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>BOARD NAME</Text>
            <TextInput
                style={{ color: "#000", height: 40, borderBottomColor: "#922a27", borderBottomWidth: 1, fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}
                placeholder="Enter Board Name"
                placeholderTextColor={"gray"}
                value={props.value}
                onChangeText={(text) => onChangeText(text)}
            />
            <Text style={{ color: "#000", marginTop: 30, fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>Suggested names:</Text>
        </View>
    )
}

const Item = (props) => {
    return (
        <>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', paddingVertical: 15 }}>
                <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>{props.item.name}</Text>
                <Image style={{ width: 15, height: 15, }} source={UP_ARROW} />
            </View>
            <View style={{ height: 0.33, backgroundColor: 'black' }} />
        </>
    )
}

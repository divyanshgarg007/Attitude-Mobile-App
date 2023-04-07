import React from "react";
import { StyleSheet, FlatList, Text, Image, TouchableOpacity } from "react-native"
import { Header } from "./header";
import { Category } from "./category"

export function Section(props) {
    return (
        <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={props.data}
            renderItem={({ item }) => (
                <Item
                    item={item}
                    onClick={(item) => props.onClick(item)}
                />
            )}
            keyExtractor={item => item._attrs.id}
            ListHeaderComponent={() => <Header
                onClickProductGroupItem={(item) => props.onClickProductGroupItem(item)}
                type={props.type}
                img={props?.bannerData && props?.bannerData[0]} />}
            ListFooterComponent={() =>
                <Category
                    onClickProductGroupItem={(item) => props.onClickProductGroupItem(item)}
                    img={props?.bannerData}
                />
            }
        />
    );
}

const Item = (props) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => props.onClick(props.item)}>
            {/* <Image style={styles.image}></Image> */}
            <Text style={{ marginLeft: 10, color: "#000", fontFamily: 'CenturyGothic', fontSize: 20 }}>{props.item._attrs.extra1}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        height: 69,
        backgroundColor: '#fff',
        alignItems: 'center',

        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1
    },
    image: {
        width: 56,
        height: 56,
        backgroundColor: 'gray',
        borderRadius: 28
    }
})


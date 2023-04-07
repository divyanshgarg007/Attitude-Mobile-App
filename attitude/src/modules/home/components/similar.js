import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, Image } from "react-native"


const data = [
    { id: 'a', value: 'Dresses' },
    { id: 'b', value: 'Shoes' },
    { id: 'c', value: 'Lifestyle' },
    { id: 'd', value: 'Valentine' },
];

const numColumns = 2
const size = Dimensions.get('window').width / numColumns


export function Similar(props) {

    function getGrid() {
        var arr = []
        var marginTop = 0
        for (let i = 0; i < data.length; i += 2) {
            console.log("INDEX: ", i)

            arr.push(
                <View key={i} style={{ marginTop: marginTop, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <CategoryItem item={data[i]} />
                    <CategoryItem item={data[i + 1]} />
                </View>
            )

            var marginTop = 15
        }

        return arr
    }

    return (
        <View style={{ marginTop: 20, marginHorizontal: 9 }}>
            <Text style={styles.title}>Similar vibes from your wishlist</Text>
            {getGrid()}
            <TouchableOpacity style={styles.viewAll}>
                <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
        </View>
    );
}


const IMAGE_URL = "https://www.learningcontainer.com/wp-content/uploads/2020/07/Sample-JPEG-Image-File-Download-scaled.jpg"

const CategoryItem = (props) => {
    return (
        <TouchableOpacity style={styles.itemContainer} >
            <Image style={[styles.item]} source={{ uri: IMAGE_URL }} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 5,
        width: size - 18,
        height: size - 18,
    },
    item: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: 'CenturyGothic-Bold',
        lineHeight: 27,
        color: "#000000"
    },
    viewAll: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        width: 76,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    viewAllText: {
        fontSize: 12,
        fontFamily: "KeepCalm-Medium",
        color: "#3E4743",
        lineHeight: 20,
    }
});
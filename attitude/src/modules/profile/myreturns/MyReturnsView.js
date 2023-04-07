import React from "react";
import { Pressable, Image, Text, View, SafeAreaView, FlatList } from "react-native";

import ARROW_RIGHT from "../../../assets/images/arrowright.png"
import { NavigationBar } from "../../components";
import { styles } from './returns.style'

import DATA from "../../../assets/mockdata/returns.json"

const MyReturnsView = (props) => {

    const onClickItem = (item) => {
        props.navigation.navigate("RerurnsDetails", { item: item })
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <NavigationBar title="MY RETURNS" navigation={props.navigation} /> */}
            <FlatList
                data={DATA}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => <Item item={item} onClickItem={(item) => onClickItem(item)} />}
                ListHeaderComponent={() => <Header />}
                ItemSeparatorComponent={() => (<View style={{ backgroundColor: 'black', height: 0.33 }} />)}
            />
        </SafeAreaView>
    )
};

const Header = () => (
    <View style={styles.headerContainer} >
        <Text style={styles.textHi}>{DATA.length} returns</Text>
    </View>
)

const Item = (props) => (
    <Pressable style={{ paddingHorizontal: 15 }} onPress={() => props.onClickItem(props.item)}>
        <View style={styles.item}>
            <View style={{}}>
                <Text style={styles.title}>{props.item.status}</Text>
                <Text style={styles.textId}># {props.item.orderId}</Text>
            </View>
            <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
        </View>
        <ProductItem items={props.item.items} />
        <Text style={styles.textId}>Created return: {props.item.date}</Text>
        <Text style={[styles.textId, { paddingBottom: (props.item.statusId === 1 ? 10 : 0) }]}>Tracking No.: {props.item.trackingId}</Text>
        {
            props.item.statusId === 0 &&
            <Text style={[styles.title, { paddingBottom: 10 }]}>DOWNLOAD LABEL</Text>
        }
    </Pressable>
);

const ProductItem = (props) => {
    var arr = []
    for (let index = 0; index < props.items.length; index++) {
        if (index <= 1) {
            arr.push(
                <View key={`item` + index} style={styles.prodItem} />
            )
        } else {
            if (props.items.length > 3) {
                arr.push(
                    <View key={`item` + index} style={styles.prodMaxItem} >
                        <Text style={styles.maxCount}>+{props.items.length - 3}</Text>
                    </View>
                )
            } else {
                arr.push(
                    <View key={`item` + index} style={styles.prodItem} />
                )
            }

            break;
        }
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            {arr}
        </View>
    )
}


export default MyReturnsView;
import React, { useState } from "react";
import { SafeAreaView, Text, View, FlatList, Image } from "react-native";
import { styles } from "./contactPref.style";
import data from '../../../assets/mockdata/contactpref.json';
import { NavigationBar } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import ICON_TICK from '../../../assets/images/tick.png'
import GlobalStyle from "../../styles/globalstyle";

const ALL = {
    "id": 0,
    "name": "Content types",
    "description": "",
    "status": true
}
const ContactPrefView = (props) => {

    function renderHeader() {
        return (
            <View style={{ paddingVertical: 8, backgroundColor: "#000", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <FirstItem
                    item={ALL}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <NavigationBar title="CONTACT PREFERENCES" navigation={props.navigation} /> */}
            <FlatList
                style={{ flex: 1, marginBottom: 20 }}
                data={data}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                    />
                )}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
            />
            <ButtonAction title="SAVE PREFERENCES" />
        </SafeAreaView>
    )
}

const ButtonAction = (props) => {
    return (
        <TouchableOpacity style={[styles.btnContainer, props.style]}>
            <Text style={{ fontFamily: GlobalStyle.fontSet.CenturyGothicBold, color: "#fff" }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const Item = (props) => {
    return (
        <View style={styles.item}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{props.item.name}</Text>
                <Text style={styles.desc}>{props.item.description}</Text>

                <CheckItem title="Email" select={true} />
                <View style={{ marginTop: 10, height: 0.33, backgroundColor: "#000" }} />
                <CheckItem title="Text" select={false} />
            </View>
        </View>
    )
}

const FirstItem = (props) => {
    return (
        <View style={{ paddingVertical: 5, flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff" }}>
            <View style={styles.itemFirst}>
                <Text style={[styles.desc, { marginTop: 0 }]}>{props.item.name}</Text>
            </View>
            <ButtonAction style={{ paddingVertical: 8, paddingHorizontal: 15 }} title="SELECT ALL" />
        </View>
    )
}

const CheckItem = (props) => {
    const [check, setCheck] = useState(props.select)
    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", }} onPress={() => setCheck(!check)}>
            <Text style={styles.desc}>{props.title}</Text>
            {
                check &&
                <Image style={{ marginTop: 10, width: 12, height: 12 }} source={ICON_TICK} />
            }

        </TouchableOpacity>
    )
}

export default ContactPrefView
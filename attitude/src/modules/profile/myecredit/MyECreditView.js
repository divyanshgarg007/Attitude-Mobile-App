import React from "react";
import { SafeAreaView, View, Text, FlatList, Pressable, Image } from "react-native";
import { NavigationBar } from "../../components";
import { styles } from "./ecredit.style";
import DATA from "../../../assets/mockdata/ecredit.json"
import ARROW_RIGHT from "../../../assets/images/arrowright.png"

export default function MyECreditView(props) {

    const onClickHelp = () => {
        props.navigation.navigate("HelpCredit")
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <NavigationBar title="MY ECREDITS" navigation={props.navigation} /> */}
            <Header />
            <FlatList
                data={DATA}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => <Item item={item} />}
                ListHeaderComponent={() => <ListHeader />}
                ItemSeparatorComponent={() => (<View style={{ backgroundColor: 'black', height: 0.33 }} />)}
            />

            <Pressable style={{ backgroundColor: "#000", paddingTop: 10 }} onPress={() => onClickHelp()}>
                <View style={styles.footer}>
                    <Text style={[styles.textNormal, { color: "#000" }]}>Need help with your eCredits?																						</Text>
                    <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

const Header = () => (
    <View style={styles.headerContainer} >
        <Text style={styles.textBold}>{`14096`}
            <Text style={styles.textNormal}> eCredits - Worth </Text>
            <Text>€140,96</Text>
        </Text>
    </View>
)

const ListHeader = () => {
    return (
        <View style={{ padding: 15, borderBottomColor: "#000", borderBottomWidth: 0.28 }}>
            <Text style={[styles.textBold, { color: "#000" }]}>OVERVIEW ECREDITS</Text>
        </View>
    )
}

const Item = (props) => {
    return (
        <View style={{ padding: 15 }}>
            <Text style={[styles.textNormal, { color: "#000" }]}>{props.item.eCredits} eCredits</Text>
            <Text style={[styles.textNormal, { color: "#000" }]}>{props.item.detail}</Text>
            <Text style={[styles.textNormal, { color: "#000", fontStyle: "italic" }]}>Expiry date: {props.item.expiry}</Text>
        </View>
    )
}

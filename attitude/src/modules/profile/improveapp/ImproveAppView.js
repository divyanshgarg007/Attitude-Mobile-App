import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text, Image, Linking } from "react-native"
import ARROW_RIGHT from "../../../assets/images/arrowright.png"
import { styles } from "./improve.style";

export default function ImproveAppView(props) {

    const onClick = (type) => {
        //props.navigation.navigate("ImproveAppDetail", { type: type })
        if (type === "idea") {
            const subject = "Attitude Holland app - Suggest and idea";
            const message = "";
            Linking.openURL(`mailto:hello@attitudeholland.nl?subject=${subject}&body=${message}`)
        } else {
            const subject = "Attitude Holland app - Report a bug";
            const message = "";
            Linking.openURL(`mailto:hello@attitudeholland.nl?subject=${subject}&body=${message}`)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Item
                title="SUGGEST AN IDEA"
                type="idea"
                desc="Got an idea to make our app even better? Let us know!"
                onClick={(type) => onClick(type)}
            />
            <Item
                title="REPORT AN APP BUG"
                type="bug"
                desc="Found a bug in our app? Tell us and we’ll get the bug spray."
                onClick={(type) => onClick(type)}
            />
        </SafeAreaView>
    )
}

const Item = (props) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => props.onClick(props.type)}>
        <View style={styles.item}>
            <View style={{ flex: 0.8 }}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.desc}>{props.desc}</Text>
            </View>
            <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
        </View>
    </TouchableOpacity>
);
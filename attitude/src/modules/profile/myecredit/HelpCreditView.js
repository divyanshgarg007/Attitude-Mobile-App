import React from "react";

import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { NavigationBar } from "../../components";
import { styles } from "./ecredit.style";

import DATA from "../../../assets/mockdata/ecreditquestion.json"

export default function HelpCreditView(props) {

    const getFromJson = () => {
        var qa = []
        DATA.map((obj, index) => {
            qa.push(<Text key={index} style={[styles.textBold, { color: "#000" }]}>{obj.question}</Text>)
            qa.push(<Text key={`answer${index}`} style={[styles.textNormal, { color: "#000" }]}>{obj.answer}{'\n\n'}</Text>)
        })

        return qa
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBar title="HELP WITH ECREDITS" navigation={props.navigation} />
            <ScrollView>
                <View style={{ padding: 15 }}>
                    {
                        getFromJson()
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}
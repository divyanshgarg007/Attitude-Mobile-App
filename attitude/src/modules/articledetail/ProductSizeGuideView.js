import React, { useState } from "react"
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity } from "react-native"
import { } from "react-native-gesture-handler"
import { NavigationBar } from "../components"
import GlobalStyle from "../styles/globalstyle"

const PRODUCT_DESC = "Killstar. I don't care. They really want you - but I do too. They won't be able to look you in eye in the'F Major' shirt dress; made using a super soft cotton. Features an exaggerated collar, puff shoulders , arge pockets and button-up front. This angsty statement-piece is a dream to style - perfect for gigs with yer besties or late night adventures by the moon!"
const DIV = 2.5

export default function ProductSizeGuideView(props) {

    const [type, setType] = useState("cm")

    const onClick = (type) => {
        setType(type)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <NavigationBar title="SIZE GUIDE" navigation={props.navigation} />
            <ScrollView style={{ marginTop: 20 }}>
                <View style={{ paddingHorizontal: 20, alignItems: 'center', justifyContent: "flex-end", flexDirection: 'row' }}>
                    <TouchableOpacity style={{ paddingVertical: 5, backgroundColor: (type === "cm" ? "#000" : "#fff") }} onPress={() => onClick("cm")}>
                        <Text style={[(type === "cm" ? styles.title : styles.description), { color: (type === "cm" ? '#fff' : "#000"), textAlign: 'center' }]}>cm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10, paddingVertical: 5, backgroundColor: (type === "inch" ? "#000" : "#fff") }} onPress={() => onClick("inch")}>
                        <Text style={[(type === "inch" ? styles.title : styles.description), { color: (type === "inch" ? '#fff' : "#000"), textAlign: 'center' }]}>inch</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 30, paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.33 }}>
                    <Title text="  " />
                    <Title style={{ color: "#000", marginLeft: 30 }} text="Chest" />
                    <Title style={{ color: "#000", marginLeft: 30 }} text="Waist" />
                    <Title style={{ color: "#000", marginLeft: 30 }} text="Hips" />
                </View>

                <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.33 }}>
                    <Title text="XS" />
                    <Description style={{ marginLeft: 30 }} text={(type === 'cm' ? 76 : 76 / DIV)} />
                    <Description style={{ marginLeft: 55 }} text={(type === 'cm' ? 55 : 55 / DIV)} />
                    <Description style={{ marginLeft: 45 }} text={(type === 'cm' ? 81 : 81 / DIV)} />
                </View>

                <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.33 }}>
                    <Title text="S  " />
                    <Description style={{ marginLeft: 30 }} text={(type === 'cm' ? 81 : 81 / DIV)} />
                    <Description style={{ marginLeft: 55 }} text={(type === 'cm' ? 61 : 61 / DIV)} />
                    <Description style={{ marginLeft: 45 }} text={(type === 'cm' ? 86 : 86 / DIV)} />
                </View>

                <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.33 }}>
                    <Title text="M " />
                    <Description style={{ marginLeft: 30 }} text={(type === 'cm' ? 86 : 86 / DIV)} />
                    <Description style={{ marginLeft: 55 }} text={(type === 'cm' ? 66 : 66 / DIV)} />
                    <Description style={{ marginLeft: 45 }} text={(type === 'cm' ? 91 : 91 / DIV)} />
                </View>

                <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.33 }}>
                    <Title text="L   " />
                    <Description style={{ marginLeft: 30 }} text={(type === 'cm' ? 91 : 91 / DIV)} />
                    <Description style={{ marginLeft: 55 }} text={(type === 'cm' ? 71 : 71 / DIV)} />
                    <Description style={{ marginLeft: 45 }} text={(type === 'cm' ? 96 : 96 / DIV)} />
                </View>

                <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.33 }}>
                    <Title text="XL" />
                    <Description style={{ marginLeft: 30 }} text={(type === 'cm' ? 96 : 96 / DIV)} />
                    <Description style={{ marginLeft: 55 }} text={(type === 'cm' ? 76 : 76 / DIV)} />
                    <Description style={{ marginLeft: 45 }} text={(type === 'cm' ? 101 : 101 / DIV)} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

function Title(props) {
    return (
        <Text style={[styles.title,]}>{props.text}</Text>
    )
}

function Description(props) {
    return (
        <Text style={[styles.description,]}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
    title: { color: "#000", width: 70, height: 20, fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold },
    description: { color: "#000", width: 70, height: 20, fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }
})
import React, { useState } from "react";
import { Linking, SafeAreaView, ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { styles } from "./returnsd.style";
import PAYPAL_ICON from '../../../assets/images/paypal.png'
import ARROW_RIGHT from "../../../assets/images/arrowright.png"

import { RETURN_FAQ } from "../../../util/constants"
import { CONTACT } from "../../../util/constants"

const WIDTH = Dimensions.get("window").width

const ReturnsDetailView = (props) => {
    const [item] = useState(props.route.params.item)

    const onClickHelp = (title) => {
        var url = ""
        if (title === "Return FAQ") {
            url = RETURN_FAQ
        } else {
            url = CONTACT
        }

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                <OrderInfo item={item} />

                <Item item={item} isDelivered={true} />

                <PaymentInfo data={{ title: "PayPal", icon: PAYPAL_ICON }} />
                <TotalInfo />
                <Help onClick={(title) => onClickHelp(title)} />
            </ScrollView>
        </SafeAreaView>
    )
}

const Help = (props) => {
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={[styles.label, { marginLeft: 10 }]}>NEED HELP WITH YOUR ORDER?</Text>
            <HelpItem title="Return FAQ" onClick={(title) => props.onClick(title)} />
            <HelpItem title="Contact" onClick={(title) => props.onClick(title)} />
        </View>
    )
}

const HelpItem = (props) => (
    <TouchableOpacity onPress={() => props.onClick(props.title)} >
        <View style={styles.itemHelp}>
            <Text style={styles.title}>{props.title}</Text>
            <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
        </View>
    </TouchableOpacity>
);

const TotalInfo = (props) => {
    return (
        <View style={{ padding: 10, borderBottomColor: "black", borderBottomWidth: 8 }}>
            <Text style={styles.label}>RETURN TOTAL</Text>
            <TotalItem title="Sub-total" value="€ 66,66" />
            <TotalItem title="Delivery" value="FREE" />
            <TotalItem title="Discount" value="- € 5" />

            <TotalItem isTotal={true} title="REFUNDABLE TOTAL ECREDITS" value="€ 61,66" />
        </View>
    )
}

const TotalItem = (props) => {
    return (
        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[(props.isTotal ? styles.label : styles.textId), { marginLeft: 5 }]}>{props.title}</Text>
            <Text style={[(props.isTotal ? styles.label : styles.textId), { marginLeft: 5 }]}>{props.value}</Text>
        </View>
    )
}

const PaymentInfo = (props) => {
    return (
        <View style={{ padding: 10, borderBottomColor: "black", borderBottomWidth: 8 }}>
            <Text style={styles.label}>RETURN PAYMENT DETAILS</Text>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 19, height: 22 }} source={PAYPAL_ICON} />
                <Text style={[styles.textId, { marginLeft: 5 }]}>{props.data.title}</Text>
            </View>
        </View>
    )
}

const Item = (props) => {
    var arr = ["Reason: Does not fit", "Reason: Too small"]
    return (
        <View style={[{ paddingTop: 10 }, (props.isDelivered && { borderBottomColor: "black", borderBottomWidth: 8 })]}>
            <View style={{ paddingBottom: 10, paddingHorizontal: 10, borderBottomColor: "black", borderBottomWidth: 0.29 }}>
                <Text style={styles.label}>RETURNS - 2 ITEMS</Text>

                <Text style={[styles.textId]}>Order No.: {props.item.orderId}</Text>
                <Text style={styles.textId}>Created return: {props.item.date}</Text>
                {arr.map((str, index) => {
                    return (
                        <View key={index} style={styles.item}>
                            <Image style={{ width: 110, height: 110, backgroundColor: "#000" }} />
                            <View style={{ marginLeft: 10, width: WIDTH - 140, }}>
                                <Text style={styles.title}>Urban Classics Short dress Black</Text>
                                <Text style={styles.label}>€ 33,99</Text>
                                <Text style={[styles.title, { marginTop: 10 }]}>Size: XS</Text>
                                <Text style={styles.title}>Qty: 1</Text>

                                <Text style={[styles.textId, { marginTop: 10 }]}>{str}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const OrderInfo = (props) => (
    <View style={{ padding: 10, paddingBottom: 20, borderBottomColor: "black", borderBottomWidth: 8 }}>
        <Text style={styles.label}>RETURN CREATED</Text>
        <Text style={[styles.textId, { marginTop: 10 }]}>our return has been registered. You can now dowload your return label and form.</Text>

        <TouchableOpacity style={{ marginTop: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", borderColor: "black", borderWidth: 0.29 }}>
            <Text style={styles.label}>DOWNLOAD LABEL</Text>
        </TouchableOpacity>
    </View>
)

export default ReturnsDetailView
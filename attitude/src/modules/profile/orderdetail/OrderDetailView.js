import React, { useState } from "react";
import { Linking, SafeAreaView, ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from "react-native";

import { styles } from "./odetail.style";
import PAYPAL_ICON from '../../../assets/images/paypal.png'
import ARROW_RIGHT from "../../../assets/images/arrowright.png"

import { RETURN_FAQ } from "../../../util/constants"
import { CONTACT } from "../../../util/constants"

const WIDTH = Dimensions.get("window").width
const ADDRESS = "Gaby Karsowidjojo\nEnergiestraat 4E\n1135GD\nEdam\nNederland\n06 12345678"

const OrderDetailView = (props) => {
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
                <DeleveryAddressInfo item={item} />
                <Item item={item} isDelivered={true} />
                <Item item={item} isDelivered={false} />
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
            <Text style={styles.label}>ORDER TOTAL</Text>
            <TotalItem title="Sub-total" value="€ 66,66" />
            <TotalItem title="Delivery" value="FREE" />
            <TotalItem title="Discount" value="- € 5" />
            <TotalItem title="eCredits" value="€ 1,38" />
            <TotalItem isTotal={true} title="TOTAL" value="€ 61,66" />
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
            <Text style={styles.label}>PAYMENT DETAILS</Text>
            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 19, height: 22 }} source={PAYPAL_ICON} />
                <Text style={[styles.textId, { marginLeft: 5 }]}>{props.data.title}</Text>
            </View>

        </View>
    )
}

const Item = (props) => {
    var arr = ["", ""]
    return (
        <View style={[{ paddingTop: 10 }, (props.isDelivered && { borderBottomColor: "black", borderBottomWidth: 8 })]}>
            <View style={{ paddingBottom: 10, paddingHorizontal: 10, borderBottomColor: "black", borderBottomWidth: 0.29 }}>
                <Text style={styles.label}>DELIVERY 1/2</Text>
                <Text style={styles.textId}>{props.isDelivered ? `Delivered on` : `Expected delivery date: `} {props.item.date}</Text>

                {arr.map((str, index) => {
                    return (
                        <View key={index} style={styles.item}>
                            <Image style={{ width: 110, height: 110, backgroundColor: "#000" }} />
                            <View style={{ marginLeft: 10, width: WIDTH - 140, }}>
                                <Text style={styles.title}>Urban Classics Short dress Black</Text>
                                <Text style={styles.label}>€ 33,99</Text>
                                <Text style={[styles.title, { marginTop: 10 }]}>Size: XS</Text>
                                <Text style={styles.title}>Qty: 1</Text>
                            </View>
                        </View>
                    )
                })}

                <Text style={styles.title}>Shipped date:    03 March 2022</Text>
            </View>

            {
                props.isDelivered &&
                <>
                    <ButtonAction title="CREATE A RETURN" />
                    <ButtonAction title="TRACK PARCEL" />
                </>
            }

        </View>
    )
}


const ButtonAction = (props) => (
    <TouchableOpacity style={{ borderBottomColor: "black", borderBottomWidth: 0.29, marginTop: 5, paddingHorizontal: 10, paddingVertical: 8 }}>
        <Text style={styles.label}>{props.title}</Text>
    </TouchableOpacity>
)

const DeleveryAddressInfo = (props) => (
    <View style={{ padding: 10, borderBottomColor: "black", borderBottomWidth: 8 }}>
        <Text style={styles.label}>DELIVERY ADDRESS</Text>
        <Text style={[styles.textId, { marginTop: 15 }]}>{ADDRESS}</Text>
    </View>
)

const OrderInfo = (props) => (
    <View style={{ padding: 10, borderBottomColor: "black", borderBottomWidth: 0.29 }}>
        <Text style={[styles.textId]}>Order No.: {props.item.orderId}</Text>
        <Text style={styles.textId}>Order date: {props.item.date}</Text>
    </View>
)

export default OrderDetailView
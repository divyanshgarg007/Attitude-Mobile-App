import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "./logout.style";
import { ButtonAction, ButtonBorder } from "../components";

export default function LogoutView(props) {

    const onClick = (type, index) => {

        props.navigation.push('Signup', { from: type, index: index })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bg}>
                <Text style={styles.textBold}>JOIN THE ATTITUDE LIFESTYLE!</Text>
                <Text style={styles.textNormal}>View orders and update your details.</Text>

                <ButtonAction
                    style={{ width: "100%", marginTop: 30 }}
                    isValid={true}
                    title={"SIGN IN"}
                    onClick={() => onClick('signin', 1)}
                />

                <ButtonBorder
                    style={{ width: "100%", marginTop: 20 }}
                    isValid={true}
                    title={"JOIN"}
                    onClick={() => onClick('join', 0)}
                />
            </View>
        </SafeAreaView>
    )
}
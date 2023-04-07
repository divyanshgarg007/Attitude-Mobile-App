import React, { useState } from "react";
import { TouchableOpacity, TextInput, Image, Text, View, SafeAreaView, ScrollView } from "react-native";
import { NavigationBar, Title } from "../../components";
import GlobalStyle from "../../styles/globalstyle";
import { styles } from "./improve.style";

const ImproveAppDetailView = (props) => {
    const [type] = useState(props.route.params.type)

    React.useLayoutEffect(() => {
        props.navigation.setOptions({

            headerShown: true,
            headerTitle: () => (<Title title={type === "idea" ? "SUGGEST AN IDEA" : "REPORT A BUG"} />),
        });
    }, [props.navigation]);

    const onClick = () => {
        if (type === "idea") {
            alert("Thank you for your suggestion. We'll get back to you.")
        } else {
            alert("Thank you!. We'll get back to you.")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{}} contentContainerStyle={{ paddingHorizontal: 0 }}>
                <UserInput
                    label="SUBJECT"
                    value={type === "idea" ? "Attitude Holland app - Suggest an idea" : "Attitude Holland app - Report a bug"}
                />
                <UserInput
                    label="FIRST NAME"
                    value="Gabriëlle"
                />
                <UserInput
                    label="EMAIL"
                    value="inspire@attitudeholland.nl"
                />
                <UserInput
                    label="PHONE NUMBER"
                    value="06 21345678"
                />

                <UserInputMultiLine
                    label={type === "idea" ? "YOUR APP IDEA" : "TELL US ABOUT THE BUG"}
                />

                <ButtonAction
                    style={{ marginTop: 30 }}
                    title={type === "idea" ? "SEND IDEA" : "REPORT BUG"}
                    onClick={onClick}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const ButtonAction = (props) => {
    return (
        <TouchableOpacity style={[styles.btnContainer, props.style]} onPress={props.onClick}>
            <Text style={{ fontFamily: GlobalStyle.fontSet.CenturyGothicBold, color: "#fff" }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const UserInput = (props) => {
    const [value, setValue] = useState(props?.value)
    return (
        <View style={{ marginTop: 15, paddingHorizontal: 15, paddingBottom: 15, borderBottomColor: "black", borderBottomWidth: 0.28 }}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    )
}

const UserInputMultiLine = (props) => {
    const [value, setValue] = useState(props.value)
    return (
        <View style={{ marginTop: 15, paddingHorizontal: 15, paddingBottom: 15, borderBottomColor: "black", borderBottomWidth: 0.28 }}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.inputMultiLine}
                multiline={true}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    )
}

export default ImproveAppDetailView;
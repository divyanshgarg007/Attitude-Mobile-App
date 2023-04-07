import React, { useState } from "react";
import { SafeAreaView, Text, View, FlatList, Switch, Dimensions } from "react-native";
import { styles } from "./notification.style";
import DATA from '../../../assets/mockdata/notification.json';

const ALL = {
    "id": 0,
    "name": "ALLOW NOTIFICATIONS",
    "description": "",
    "status": true
}

const NotificationSettingsView = (props) => {
    const [data] = useState(DATA)
    const [allow, setAllow] = useState(true)

    function renderHeader() {
        return (
            <FirstItem
                item={ALL}
                status={allow}
                onChange={(flag) => setAllow(flag)}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                        allow={allow}
                    />
                )}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
            />
        </SafeAreaView>
    )
}

const Item = (props) => {

    const [isEnabled, setIsEnabled] = useState(props.item.status);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    return (
        <View style={[styles.item]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{props.item.name}</Text>
                <Text style={styles.desc}>{props.item.description}</Text>
            </View>
            <Switch
                trackColor={{ false: "#CCCCCC", true: "#00CA47" }}
                thumbColor="white"
                activeThumbColor="white"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />

            {
                !props.allow &&
                <View style={styles.blur} />
            }



        </View>
    )
}

const FirstItem = (props) => {
    const [isEnabled, setIsEnabled] = useState(props.status);
    const toggleSwitch = (previousState) => {

        setIsEnabled(!isEnabled)
        props.onChange(!isEnabled)
    };
    return (
        <View style={{ paddingVertical: 5, backgroundColor: "#000" }}>
            <View style={styles.itemFirst}>
                <Text style={styles.title}>{props.item.name}</Text>
                <Switch
                    trackColor={{ false: "#CCCCCC", true: "#00CA47" }}
                    thumbColor="white"
                    activeThumbColor="white"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}

export default NotificationSettingsView
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import GlobalStyle from "../styles/globalstyle";

export const Hud = (props) => {
    return (
        // <Portal.Host>
        <Portal>
            <Modal
                visible={props.visible}
                dismissable={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.container}>
                    <ActivityIndicator />
                    {
                        props?.title &&
                        <Text style={[styles.title, props?.style]}>{props.title}</Text>
                    }
                    {
                        props?.description &&
                        <Text style={styles.description}>{props.description}</Text>
                    }
                </View>
            </Modal>
        </Portal>
        // </Portal.Host>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    title: {
        marginTop: 5,
        fontSize: 15,
        color: GlobalStyle.colorSet.black,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
    },
    description: {
        fontSize: 14,
        color: GlobalStyle.colorSet.black,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
    }
})
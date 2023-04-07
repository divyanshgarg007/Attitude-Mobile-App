import React from "react"
import { StyleSheet, Text } from "react-native"

export function Title(props) {
    return (
        <Text style={styles.title}>{props.title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'CenturyGothic',
        fontSize: 20,
        color: "#000"
    }
})
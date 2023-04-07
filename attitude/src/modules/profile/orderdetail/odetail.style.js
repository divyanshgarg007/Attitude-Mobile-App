import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from "../../styles/globalstyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    label: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        color: "#000"
    },
    input: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    },
    checkBoxTitle: {
        marginLeft: 10,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14
    },
    textId: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    },
    title: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    itemHelp: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "black", borderBottomWidth: 0.29
    },

});

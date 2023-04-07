import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from "../../styles/globalstyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        height: 42,
        borderBottomColor: "black",
        borderBottomWidth: 0.28,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    textHi: {
        fontSize: 12,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    },

    item: {
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 32,
        backgroundColor: "#000"
    },
    title: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        color: "#000"
    },
    textId: {
        fontSize: 12,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    },
    prodItem: {
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        width: 110,
        height: 100,
        backgroundColor: '#000'
    },
    prodMaxItem: {
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        width: 110,
        height: 100,
        backgroundColor: '#434343',
        justifyContent: "center",
        alignItems: "center"
    },
    maxCount: {
        color: "#fff",
        fontSize: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    }
});

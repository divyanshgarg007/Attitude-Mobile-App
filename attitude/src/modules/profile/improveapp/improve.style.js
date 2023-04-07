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
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    },
    checkBoxTitle: {
        marginLeft: 10,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        color: "#000"
    },
    itemContainer: {
        backgroundColor: "#000",
        paddingTop: 8,
        borderBottomColor: "#000",
        borderBottomWidth: 0.33
    },
    item: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        color: '#000'
    },
    desc: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: '#000'
    },
    input: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000"
    },
    inputMultiLine: {
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: "#000",
        height: 200,
        borderColor: "#000",
        borderWidth: 0.33,
    },

    btnContainer: {
        backgroundColor: "#000",
        marginHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center"
    }
});

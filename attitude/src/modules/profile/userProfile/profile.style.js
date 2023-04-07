import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from "../../styles/globalstyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 42
    },
    textHi: {
        marginTop: 10,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    },
    textName: {
        color: '#fff',
        fontSize: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
    item: {
        flexDirection: 'row',

        paddingHorizontal: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        height: 15,
        backgroundColor: "#000"
    },
    title: {
        fontSize: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: '#000'
    }
});

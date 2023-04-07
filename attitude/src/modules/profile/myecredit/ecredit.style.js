import { StyleSheet } from 'react-native';
import GlobalStyle from "../../styles/globalstyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#000',
        height: 42
    },
    textNormal: {
        color: '#fff',
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    },
    textBold: {
        color: '#fff',
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
    footer: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});
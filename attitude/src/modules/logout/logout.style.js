import { StyleSheet } from 'react-native';
import GlobalStyle from "../styles/globalstyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bg: {
        flex: 1,
        marginTop: 80,
        alignItems: "center",
        paddingHorizontal: 15
    },
    textNormal: {
        color: '#000',
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic
    },
    textBold: {
        color: '#000',
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
});
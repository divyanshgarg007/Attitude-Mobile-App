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
    }
});

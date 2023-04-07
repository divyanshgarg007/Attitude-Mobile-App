import { Platform, StyleSheet } from "react-native"
import GlobalStyle from "../styles/globalstyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    tabBar: {

        marginTop: 0,
        flexDirection: 'row',
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    contentContainer: {
        flex: 1,
    },
    itemPrice: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        lineHeight: 16
    },
    itemName: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        lineHeight: 16
    },
    add: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        backgroundColor: "#000",
        marginHorizontal: 10,
        marginTop: 12,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
    }
});
import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from '../styles/globalstyle';

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        // alignItems: 'center',
    },
    itemPrice: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        lineHeight: 16,
        color: "#000"
    },
    itemName: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        lineHeight: 16,
        color: "#000"
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
    checkoutBg: {
        backgroundColor: "#00954F",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    textCheckout: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 20,
        color: '#fff'
    }
})
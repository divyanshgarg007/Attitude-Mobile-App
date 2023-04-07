import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from '../styles/globalstyle';

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        //backgroundColor: "red",
        marginBottom: 30
    },
    itemPrice: {

        fontSize: 16,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        lineHeight: 16,
        color: "#000"
    },
    itemPriceDiscount: {
        marginRight: 5,
        fontFamily: 'CenturyGothic-Bold',
        fontSize: 16,
        lineHeight: 16,
        color: '#922a27',
        textDecorationLine: "line-through",
        textDecorationStyle: 'solid'
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
    itemBoard: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    price: {
        fontSize: 14,
        marginLeft: 15,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,

    },
    stikePrice: {
        color: "#000",
        textDecorationLine: 'line-through',
        fontSize: 14,
        marginLeft: 15,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    }
})
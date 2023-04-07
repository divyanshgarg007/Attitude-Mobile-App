import { StyleSheet } from 'react-native';
import GlobalStyle from '../styles/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemFirst: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1
    },
    title: {
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 14,
        color: "#000"
    },
    subTitle: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        color: "#000"
    },
    item: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addressItem: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 15,
        //alignItems: 'center',
        justifyContent: 'space-between',
    },
    prodItem: {
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        width: 110,
        height: 100,
        backgroundColor: GlobalStyle.colorSet.red
    },
    prodMaxItem: {
        marginRight: 5,
        marginTop: 5,
        marginBottom: 15,
        width: 110,
        height: 100,
        backgroundColor: GlobalStyle.colorSet.redDark,
        justifyContent: "center",
        alignItems: "center"
    },
    maxCount: {
        color: "#fff",
        fontSize: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold
    },
    itemContainer: {
        backgroundColor: "#000",
        borderBottomColor: "#000",
        borderBottomWidth: 5
    },
    desc: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: '#000'
    },
    checkBoxTitle: {
        marginLeft: 10,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        color: "#000"
    },
    countryContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    countryName: {
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        color: "#000"
    },
    contentContainer: {
        flex: 1,
    },
});
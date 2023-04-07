/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import GlobalStyle from '../styles/globalstyle';

export const styles = StyleSheet.create({
    discountContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    discountBox: {
        paddingHorizontal: 15,
        marginTop: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    label: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        color: '#000',
    },
    input: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: '#000',
        paddingBottom: 0,
        paddingLeft: 0,
    },
    apply: {
        marginVertical: 40,
    },
    needBox: {
        paddingHorizontal: 15,
        marginTop: 25,
    },
    mb5: {
        marginBottom: 5,
    },
    bullets: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    round: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: '#000',
    },
    desc: {
        fontSize: 14,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        color: '#000',
        marginLeft: 5,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        zIndex: 1111,
    },
});

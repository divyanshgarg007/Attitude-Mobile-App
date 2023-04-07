import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from '../../styles/globalstyle';
const WIDTH = Dimensions.get("screen").width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        paddingHorizontal: 25,
        marginTop: 40
    },
    headerText: {
        marginTop: 33,
        fontSize: 32,
        fontWeight: 600
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1
    },
    itemFirst: {
        flexDirection: 'row',
        paddingHorizontal: 25,
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
    desc: {
        marginTop: 10,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,
        fontSize: 14,
        color: "#000"
    },
    blur: {
        zIndex: 1,
        top: 0,
        bottom: 0,
        position: "absolute",
        backgroundColor: "rgba(255,255,255,0.6)",
        width: WIDTH,
        flex: 1
    }
})
import { StyleSheet } from 'react-native';
import GlobalStyle from '../../styles/globalstyle';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 20,
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
        borderBottomColor: '#000',
        borderBottomWidth: 8
    },
    itemFirst: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    btnContainer: {
        backgroundColor: "#000",
        marginHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})
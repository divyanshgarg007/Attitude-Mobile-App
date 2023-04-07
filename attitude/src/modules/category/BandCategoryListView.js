import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native"
import { Title } from "../components";
import { SFHeader } from "./components";

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GlobalStyle from "../styles/globalstyle";

function BandCategoryListView(props) {
    const [item] = useState(props.route.params.data)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: () => (<Title title={item._attrs.extra1} />),
        });
    }, [props.navigation]);

    useEffect(() => {
        let { actions } = props;
        setLoading(true)
        actions.bandsCategory(onSuccess, onError)
    }, [])

    const onSuccess = (resp) => {
        console.log('bandsCategoryList', resp?.props?.pg)
        let bandsData = resp?.props?.pg?.filter((data) => {
            if (data?._attrs?.desc === item._attrs.description) {
                return data?._attrs?.desc
            }
        })[0]?.pv?.sort((a, b) => {
            return a?._attrs?.name.localeCompare(b?._attrs?.name);
        })
        setLoading(false)
        setData(bandsData)
    }
    const onError = (resp) => {
        setLoading(false)
        console.log('bandsCategoryListError', resp)
    }

    const onClick = (obj) => {
        props.navigation.navigate('BandsProductView', { data: obj, type: item._attrs.type })
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading &&
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>

            }
            <View style={styles.containerTop}>
                <Text style={styles.titleTop}>A-Z {item._attrs.extra1}</Text>
            </View>
            <View style={styles.categoriesContainer}>
                <Text style={styles.titleCategory}>Top {item._attrs.extra1}</Text>
            </View>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={data}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                        onClick={(item) => onClick(item)}
                    />
                )}
                keyExtractor={item => item._attrs.id}


            />
        </SafeAreaView>
    );
}

const Item = (props) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => props.onClick(props.item)}>
            <Text style={{ marginLeft: 5, color: "#000", fontFamily: 'CenturyGothic', fontSize: 20 }}>{props.item._attrs.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        height: 69,
        backgroundColor: '#fff',
        alignItems: 'center',

        borderBottomColor: '#DFDFDF',
        borderBottomWidth: 1
    },
    image: {
        width: 56,
        height: 56,
        backgroundColor: "#922a27",
        borderRadius: 28
    },
    containerTop: {
        height: 57,
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 25,
    },
    titleTop: {
        fontFamily: "CenturyGothic-Bold",
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    categoriesContainer: {
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderTopColor: '#000',
        borderBottomColor: '#000',
    },
    titleCategory: {
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 20,
        color: '#000',
        textAlign: 'left',
        padding: 15,
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
})

const mapStateToProps = state => ({
    sortFilter: state.article.sortFilter,
});

const ActionCreators = Object.assign(
    {
        bandsCategory: articleActions.bandsCategory,
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BandCategoryListView)





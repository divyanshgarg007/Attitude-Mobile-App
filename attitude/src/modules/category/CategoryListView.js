import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, Image, Dimensions, TouchableOpacity, SafeAreaView } from "react-native"
import { Title } from "../components";
import { SFHeader } from "./components";

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function CategoryListView(props) {
    const [item] = useState(props.route.params.data)

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: () => (<Title title={item._attrs.extra1} />),
        });
    }, [props.navigation]);


    useEffect(() => {
        let { actions } = props;
        actions.setSortFilter(null)
    }, [])

    const onClick = (data) => {
        if (props.route.params?.type !== 'Sale') {
            props.navigation.navigate('article-caterogy', { data: data })
        } else {
            props.navigation.navigate('sale-caterogy', { data: data })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SFHeader />
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={item.webgroup}
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
            <Text style={{ marginLeft: 5, color: "#000", fontFamily: 'CenturyGothic', fontSize: 20 }}>{props.item._attrs.extra1}</Text>
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
    }
})

const mapStateToProps = state => ({
    sortFilter: state.article.sortFilter,
});

const ActionCreators = Object.assign(
    {
        setSortFilter: articleActions.setSortFilter
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListView)





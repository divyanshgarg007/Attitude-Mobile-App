import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import { NavigationBar, Title } from '../components';
import { ArticleGrid } from './components';

import GlobalStyle from '../styles/globalstyle';

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ITEM_SIZE = windowWidth / 2

const PAGE_SIZE = 10

const SaleNewArticlesView = (props) => {
    const [loading, setLoading] = useState(true)
    const [item] = useState(props.route.params.data)

    const [request, setRequest] = useState({
        dataSource: [],
        start: 0,
        loading: true,
        morePage: false
    })

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: () => (<Title title={item._attrs.extra1.toUpperCase()} />),
        });
    }, [props.navigation]);

    useEffect(() => {
        callApi()
    }, [])

    const callApi = () => {
        let params
        // = "Sale=Uitverkoop"

        if (item._attrs.description === 'New') {
            params = "sort=isort1|desc"
            // params = "sort=dcreated DESC"
        }
        let { actions } = props;
        actions.getCategoryProduct({ id: `${item._attrs.parentId}&start=${request.start}&count=${PAGE_SIZE}&${params}` }, onSuccess, onError);
    }

    const onSuccess = (resp) => {
        console.log("SUCCESS: ", resp)

        if (resp.articles.article) {
            var startValue = request.start
            var morePg = false
            if (resp.articles.article.length >= PAGE_SIZE) {
                startValue += PAGE_SIZE
                morePg = true
            }
            setRequest({
                morePage: morePg,
                start: startValue,
                dataSource: [...request.dataSource, ...resp.articles.article],
                loading: false
            })
        } else {
            setRequest({ ...request, loading: false, morePage: false })
        }
    }

    const onError = (resp) => {
        console.log("ERROR: ", resp)
        setRequest({ ...request, loading: false })
    }

    const onClickItem = (item) => {
        props.navigation.push('ArticleDetail', { data: item })
    }

    const loadMoreData = () => {
        if (!request.loading) {
            console.log("LOAD MORE")
            let { actions } = props;
            actions.getCategoryProduct({ id: `${props.route.params.data._attrs.id}&start=${request.start}&count=${PAGE_SIZE}` }, onSuccess, onError);
            //setData({ ...data, loading: true })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <NavigationBar navigation={props.navigation} title={item._attrs.extra1.toUpperCase()} />
            <FilterView data={item.webgroup} onClick={(obj) => onClickFilterItem(obj)} />

            <ArticleGrid
                // isLoading={loading}
                // data={data ? data : []}
                // onClick={(item) => onClickItem(item)}

                isLoading={request.loading}
                data={request.dataSource}
                morePage={request.morePage}
                onClick={(item) => onClickItem(item)}
                loadMoreData={loadMoreData}
            />


        </SafeAreaView>
    );
}

const FilterView = (props) => {
    if (props.data?.length > 0) {
        return (
            <View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ padding: 10 }}>
                    {
                        props.data?.map((obj, i) => {
                            return <FilterButton
                                obj={obj}
                                isSelected={true}
                                key={obj._attrs.description}
                                title={obj._attrs.description}
                                style={{ marginLeft: i == 0 ? 0 : 7 }}
                                onClick={(obj) => props.onClick(obj)}
                            />
                        })
                    }
                </ScrollView>
            </View>
        )
    } else {
        return null
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        alignItems: 'center',
        justifyContent: 'center',
        width: ITEM_SIZE,
        height: 44
    },
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'CenturyGothic',
        fontSize: 20,
        color: "#000"
    },
    vDivider: {
        height: 44,
        width: 1,
        backgroundColor: '#707070'
    },
    sortContainer: {
        position: "absolute",
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    sortText: {
        marginLeft: 10,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 14,
        color: "#000"
    }
});

const mapStateToProps = state => ({
    access_token: state.auth.access_token,
});

const ActionCreators = Object.assign(
    {
        getCategoryProduct: articleActions.getCategoryProduct
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleNewArticlesView)





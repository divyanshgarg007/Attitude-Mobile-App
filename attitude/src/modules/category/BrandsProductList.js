import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import { NavigationBar } from '../components';
import { ArticleGrid } from './components';

import GlobalStyle from '../styles/globalstyle';

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ITEM_SIZE = windowWidth / 2

const PAGE_SIZE = 20

const BrandsProductList = (props) => {
    const [loading, setLoading] = useState(true)
    const [item] = useState(props.route.params.data)
    const type = props.route.params.type
    //const [data, setData] = useState(null)

    const [request, setRequest] = useState({
        dataSource: [],
        start: 0,
        loading: true,
        morePage: false
    })

    useEffect(() => {
        console.log("item:", props.route.params.data)
        callApi()
    }, [])

    const callApi = () => {
        let { actions } = props;
        let params = {
            start: request.start,
            count: PAGE_SIZE,
            includesubgroups: true
        }
        //Band: props.route.params.data._attrs.name
        params[type] = props.route.params.data._attrs.name
        actions.brandsArticles(params, onSuccess, onError);
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
        if (!request.loading && request.morePage) {
            callApi()
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <NavigationBar navigation={props.navigation} title={item._attrs.name.toUpperCase()} />

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

const mapStateToProps = state => ({
    access_token: state.auth.access_token,
});

const ActionCreators = Object.assign(
    {
        brandsArticles: articleActions.brandsArticles

    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsProductList)





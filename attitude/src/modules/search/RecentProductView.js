import React, { useEffect, useState } from "react"
import { SafeAreaView, View, FlatList, Text, Keyboard, Image, Pressable } from "react-native"
import { SearchTextBar, Title } from "../components"
import { ArticleGrid } from "../category/components"
import DATA from '../../assets/mockdata/search.json'
import { styles } from "./search.style"
import { Header } from "./components"

import { connect } from 'react-redux';
import { articleActions } from '../../services/articleactions/articleRedux';
import { bindActionCreators } from 'redux';

import ICON_SEARCH from '../../assets/images/magnifyingglass.png'

const PAZE_SIZE = 10
function RecentProductView(props) {

    const [text, setText] = useState(props.route.params.query)
    const [data, setData] = useState({
        dataSource: [],
        start: 0,
        loading: false,
        morePage: false
    })
    const [recent, setRecent] = useState(DATA.recent)

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerTitle: () => (<Title title={text.toUpperCase()} />),
        });
    }, [props.navigation]);

    useEffect(() => {
        console.log("recent: ", props.recentSearch)
    }, [props.recentSearch])

    useEffect(() => {
        let { actions } = props;
        actions.getSearchItems({ query: `${text}&start=0&count=${PAZE_SIZE}` }, onSuccess, onError);
        setData({ ...data, start: 0, loading: true })
    }, [])



    const callAPI = () => {

    }

    const onSuccess = (resp) => {
        console.log("SUCCESS: ", resp)
        Keyboard.dismiss()
        if (resp.articles.article) {
            var startValue = data.start
            var morePg = false
            if (resp.articles.article.length >= PAZE_SIZE) {
                startValue += PAZE_SIZE
                morePg = true
            }
            setData({
                morePage: morePg,
                start: startValue,
                dataSource: [...data.dataSource, ...resp.articles.article],
                loading: false
            })
        } else {
            setData({ ...data, loading: false, morePage: false })
        }
    }

    const onError = (resp) => {
        Keyboard.dismiss()
        console.log("ERROR: ", resp)
        setData({ ...data, loading: false })
    }

    const onClickItem = (item) => {
        props.navigation.push('ArticleDetail', { data: item })
    }

    const loadMoreData = () => {
        if (!data.loading) {
            console.log("LOAD MORE")
            let { actions } = props;
            actions.getSearchItems({ query: `${text}&start=${data.start}&count=${PAZE_SIZE}` }, onSuccess, onError);
            setData({ ...data, loading: true })
        }
    }

    const renderEmpty = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: 40, height: 40 }} source={ICON_SEARCH} />
                <Text style={[styles.emptyText, { marginTop: 5 }]}>You have no recent searches.</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', }}>
            <ArticleGrid
                isLoading={data.loading}
                data={data.dataSource}
                morePage={data.morePage}
                onClick={(item) => onClickItem(item)}
                loadMoreData={loadMoreData}
            />

        </SafeAreaView>
    )
}



const mapStateToProps = state => ({
    user: state.auth.user,
    recentSearch: state.article.recentSearch
});

const ActionCreators = Object.assign(
    {},
    {
        getSearchItems: articleActions.getSearchItems,
        recentSearch: articleActions.recentSearch

    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentProductView)



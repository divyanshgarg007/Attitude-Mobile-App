import React, { useState, useEffect } from 'react';
import { Platform, Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import { NavigationBar } from '../components';
import { ArticleGrid } from './components';

import IMG_STAR from '../../assets/images/star.png'
import GlobalStyle from '../styles/globalstyle';

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FilterButton, Hud, Title } from '../components';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ITEM_SIZE = windowWidth / 2

const PAGE_SIZE = 10

const ArticlesView = (props) => {
    const [hudLoading, setHudLoading] = useState(false)
    const [item] = useState(props.route.params.data)
    const [sort, setSort] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [request, setRequest] = useState({
        dataSource: [],
        article: {},
        start: 0,
        loading: true,
        morePage: false,
        temp: null
    })

    const [filter, setFilter] = useState(null)
    const [sortParam, setSortParam] = useState(null)
    const [isFilter, setIFilter] = useState(false)

    useEffect(() => {
        callApi()
    }, [])

    const callApi = () => {
        let { actions } = props;
        actions.getCategoryProduct({ id: `${props.route.params.data._attrs.id}&start=${request.start}&count=${PAGE_SIZE}` }, onSuccess, onError);
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
                article: resp.articles,
                dataSource: [...request.dataSource, ...resp.articles.article],
                loading: false
            })
        } else {
            setRequest({ ...request, loading: false, morePage: false })
        }

        setHudLoading(false)
    }
    const onFilterSuccess = (resp) => {
        console.log("SUCCESS: ", resp)

        if (resp.articles.article) {
            var startValue = request.start
            var morePg = false
            if (resp.articles.article.length >= PAGE_SIZE) {
                startValue = 10
                morePg = true
            }
            setRequest({
                morePage: morePg,
                start: startValue,
                article: request.article,
                dataSource: [...resp.articles.article],
                loading: false
            })
        } else {
            setRequest({ ...request, dataSource: [], loading: false, morePage: false })
        }

        setHudLoading(false)
    }
    const onError = (resp) => {
        console.log("ERROR: ", resp)
        setRequest({ ...request, loading: false })
        setHudLoading(false)
    }

    const onClickSort = () => {
        setSort(!sort)
    }

    const onClickFilter = () => {
        var filterProps = JSON.parse(JSON.stringify(request.article))//request.dataSource[0]
        var dataS = Object.assign([], request.dataSource)
        if (filterProps?.props?.pg) {
            props.navigation.navigate("filter-category", { data: filterProps, onGoBack: getFiter })
        }
    }

    const getFiter = (tag) => {

        setRequest({
            dataSource: [],
            start: 0,
            morePage: false
        })
        setHudLoading(true)
        var params = tag.join('&')

        if (sortParam) {
            params += sortParam
        }
        setFilter(params)

        let { actions } = props;
        actions.getCategoryProduct({ id: `${props.route.params.data._attrs.id}&start=0&count=${PAGE_SIZE}`, filter: params }, onFilterSuccess, onError)
    }

    const onClickItem = (item) => {
        console.log(item)
        props.navigation.push('ArticleDetail', { data: item })
    }

    const onClickFilterItem = (obj) => {
        props.navigation.push('ArticlesView', { data: obj })
    }

    const onClickSortItem = (index) => {
        setSelectedIndex(index)
        // isort1                    Popular, use with |desc to get the most popular first
        // dshow                  Date added (use for “Newest items”)
        // nunitprice           Price

        var sort = ""
        if (index === 0) {
            sort = "isort1"
        } else if (index == 1) {
            sort = "dshow|desc"
        } else {
            sort = "nunitprice"
        }

        var filterParam = filter
        if (filterParam) {
            filterParam += `sort=${sort}`
        } else {
            filterParam = `sort=${sort}`
        }
        let { actions } = props;
        //actions.getCategoryProduct({ id: props.route.params.data._attrs.id, params: { sort: sort } }, onSuccess, onError);
        actions.getCategoryProduct({ id: `${props.route.params.data._attrs.id}&start=0&count=${PAGE_SIZE}`, filter: filterParam }, onFilterSuccess, onError)
        setSort(false)
        setSortParam(sort)
        setHudLoading(true)
    }

    const loadMoreData = () => {
        if (!request.loading && request.morePage) {
            console.log("LOAD MORE")

            var filterParam = ""
            if (filter) {
                filterParam = filter
            }
            if (sortParam) {
                filterParam = `&sort=${sortParam}`
            }

            let { actions } = props;
            actions.getCategoryProduct({ id: `${props.route.params.data._attrs.id}&start=${request.start}&count=${PAGE_SIZE}`, filter: filterParam }, onSuccess, onError);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <NavigationBar navigation={props.navigation} title={item._attrs.extra1.toUpperCase()} />
            <TabBar
                onClickSort={onClickSort}
                onClickFilter={onClickFilter}
            />
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
            {
                sort &&
                <SortOption
                    setToggol={() => setSort(false)}
                    selectedIndex={selectedIndex}
                    getIndex={(index) => onClickSortItem(index)}
                />
            }

            {
                hudLoading &&
                <Hud visible={hudLoading} title="applying filter..." />
            }

        </SafeAreaView>
    );
}
const TabBar = (props) => {
    return (
        <View style={styles.tabBar}>
            <View style={styles.tabItem}>
                <TouchableOpacity style={styles.itemContainer} onPress={props.onClickSort}>
                    <Text style={styles.itemText}>SORT</Text>
                </TouchableOpacity>

                <View style={styles.vDivider} />

                <TouchableOpacity onPress={props.onClickFilter}
                    style={styles.itemContainer}>
                    <Text style={styles.itemText}>FILTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
function SortItem(props) {
    if (props.index === props.selectedIndex) {
        return (
            <TouchableOpacity onPress={() => props.getIndex(props.index)} style={{ borderBottomColor: "#000", borderBottomWidth: 0.33, paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'row', alignItems: "center" }}>
                <View style={{ width: 8, height: 8, backgroundColor: "#000", borderRadius: 4 }} />
                <Text style={styles.sortText}>{props.title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={() => props.getIndex(props.index)} style={{ borderBottomColor: "#000", borderBottomWidth: 0.33, paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'row', alignItems: "center" }}>
                <Text style={[styles.sortText, { fontFamily: GlobalStyle.fontSet.CenturyGothic }]}>{props.title}</Text>
            </TouchableOpacity>
        )
    }
}
const SortOption = (props) => {
    return (
        <TouchableOpacity style={styles.sortContainer} onPress={() => props.setToggol()}>
            <Image style={{ left: 80, top: Platform.OS === "ios" ? 45 : 15, width: 33, height: 33 }} source={IMG_STAR}></Image>
            <View style={{ left: 16, top: Platform.OS === "ios" ? 29 : 0, width: windowWidth - 32, height: 173, backgroundColor: '#fff' }}>
                <SortItem
                    selectedIndex={props.selectedIndex}
                    index={0} title="Popular"
                    isSelected={true}
                    getIndex={(index) => props.getIndex(index)}
                />
                <SortItem
                    selectedIndex={props.selectedIndex}
                    index={1}
                    title="What’s New"
                    isSelected={false}
                    getIndex={(index) => props.getIndex(index)}
                />
                <SortItem
                    selectedIndex={props.selectedIndex}
                    index={2} title="Lowest price"
                    isSelected={false}
                    getIndex={(index) => props.getIndex(index)}
                />
            </View>
        </TouchableOpacity>
    )
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
        height: 44,
    },
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'CenturyGothic',
        fontSize: 20,
        color: '#000',
    },
    vDivider: {
        height: 44,
        width: 1,
        backgroundColor: '#707070',
    },
    sortContainer: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sortText: {
        marginLeft: 10,
        fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
        fontSize: 14,
        color: '#000',
    },
});

const mapStateToProps = state => ({
    access_token: state.auth.access_token,
});

const ActionCreators = Object.assign({
    getCategoryProduct: articleActions.getCategoryProduct,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesView);

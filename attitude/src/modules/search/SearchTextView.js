import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Keyboard,
  Image,
  Pressable,
} from 'react-native';
import { SearchTextBar } from '../components';
import { ArticleGrid } from '../category/components';
import DATA from '../../assets/mockdata/search.json';
import { styles } from './search.style';
import { Header } from './components';

import { connect } from 'react-redux';
import { articleActions } from '../../services/articleactions/articleRedux';
import { bindActionCreators } from 'redux';

import ICON_SEARCH from '../../assets/images/magnifyingglass.png';

const PAZE_SIZE = 10;
function SearchTextView(props) {
  const [text, setText] = useState('');
  const [data, setData] = useState({
    dataSource: [],
    start: 0,
    loading: false,
    morePage: false,
    articles_attrs: {}
  });
  const [recent, setRecent] = useState(DATA.recent);

  useEffect(() => {
    console.log('recent: ', props.recentSearch);
  }, [props.recentSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (text) {
        console.log('SEND SEARCH REQ: ', text);
        callAPI(text);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const onClickRecentItem = item => {
    //setData({ ...data, dataSource: [] })
    //setText(item)
    props.navigation.push('recent-item', { query: item });
  };

  const callAPI = str => {
    let { actions } = props;
    actions.getSearchItems(
      { query: `${str}&start=0&count=${PAZE_SIZE}` },
      onSuccess,
      onError,
    );
    setData({ ...data, start: 0, loading: true });
  };

  const onSuccess = resp => {
    console.log('SUCCESS: ', resp);
    Keyboard.dismiss();
    if (resp.articles.article) {
      if (text?.length > 0) {
        let { actions } = props;
        let arr = props.recentSearch ? props.recentSearch : [];
        arr.push(text);
        arr = [...new Set(arr)];
        actions.recentSearch(arr);
      }

      var startValue = data.start;
      var morePg = false;
      if (resp.articles?.article?.length >= PAZE_SIZE) {
        startValue += PAZE_SIZE;
        morePg = true;
      }
      setData({
        morePage: morePg,
        start: startValue,
        dataSource: [...data.dataSource, ...resp.articles.article],
        loading: false,
        articles_attrs: resp.articles_attrs
      });
    } else {
      setData({ ...data, loading: false, morePage: false });
    }
  };

  const onError = resp => {
    Keyboard.dismiss();
    console.log('ERROR: ', resp);
    setData({ ...data, loading: false });
  };

  const onUpdateText = text => {
    console.log('changes: method');
    setData({ ...data, dataSource: [], articles_attrs: {} });
    setText(text);
  };

  const onClickClear = () => {
    //setRecent([])

    let { actions } = props;
    actions.recentSearch([]);
  };

  const onClickItem = item => {
    props.navigation.push('ArticleDetail', { data: item });
  };

  const loadMoreData = () => {
    if (!data.loading) {
      console.log('LOAD MORE');
      let { actions } = props;
      actions.getSearchItems(
        { query: `${text}&start=${data.start}&count=${PAZE_SIZE}` },
        onSuccess,
        onError,
      );
      setData({ ...data, loading: true });
    }
  };

  const renderEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 40, height: 40 }} source={ICON_SEARCH} />
        <Text style={[styles.emptyText, { marginTop: 5 }]}>
          You have no recent searches.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <SearchTextBar
        type='home'
        onClick={props.navigation.goBack}
        onUpdateText={text => onUpdateText(text)}
      />
      {text?.length > 0 ? (
        <ArticleGrid
          isLoading={data.loading}
          data={data.dataSource}
          articles_attrs={data.articles_attrs}
          morePage={data.morePage}
          onClick={item => onClickItem(item)}
          loadMoreData={loadMoreData}
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          //data={recent}
          data={props?.recentSearch ? props.recentSearch : []}
          renderItem={({ item }) => (
            <Pressable
              style={{ padding: 15 }}
              onPress={() => onClickRecentItem(item)}>
              <Text style={styles.emptyText}>{item}</Text>
            </Pressable>
          )}
          keyExtractor={item => item}
          ListEmptyComponent={renderEmpty}
          ItemSeparatorComponent={() => (
            <View style={{ height: 0.33, backgroundColor: 'black' }} />
          )}
          ListHeaderComponent={() => (
            <Header text={text} onClick={onClickClear} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  recentSearch: state.article.recentSearch,
});

const ActionCreators = Object.assign(
  {},
  {
    getSearchItems: articleActions.getSearchItems,
    recentSearch: articleActions.recentSearch,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTextView);

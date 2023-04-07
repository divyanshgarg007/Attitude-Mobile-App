/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { AppState, SafeAreaView, ScrollView, View } from 'react-native';

import { connect } from 'react-redux';
import { articleActions } from '../../services/articleactions/articleRedux';
import { bindActionCreators } from 'redux';
import { SearchBar, Divider } from '../components';
import {
  ScrollViewHoriRect,
  Category,
  Similar,
  Header,
  Slider,
  TextContent,
  Banner,
} from './components';
import { authActions } from '../../services/authactions/authRedux';
import { masterActions } from '../../services/masteractions/masterRedux';
import { homeActions } from '../../services/homeactions/homeRedux';
import { styles } from './home.style';

const HomeView = props => {
  const [banner, setBanner] = useState(null);
  const [sliderContent, setSliderContent] = useState(null);
  const [productgroup, setProductgroup] = useState(null);
  const [dataContent, setDataContent] = useState([]);

  useEffect(() => {
    console.log('');
    AppState.addEventListener('change', state => {
      if (state === 'active') {
        // do this and call refresh token api here
        //alert('active')
        let { actions } = props;
        actions.getToken({}, onTokenSuccess, onError);
      } else if (state === 'background') {
        // do that
        //alert('background')
      } else if (state === 'inactive') {
        // do that other thing
        //alert('inactive')
      }
    });
  }, []);

  useEffect(() => {
    if (props.API_TOKEN) {
      loginByToken();

      let { actions } = props;
      actions.getHomeContent({}, onSuccess, onError);
      actions.getJustDropped({}, onSuccess, onError);
      actions.getMostWanted({});
      actions.getCategory({}, onCategorySuccess, onCategoryError);
    }
  }, [props.API_TOKEN]);

  useEffect(() => {
    console.log('recentArticles');
  }, [props.recentArticles]);

  useEffect(() => {
    console.log('homeContents', props.homeContents);
    if (props?.homeContents && props?.homeContents?.item?.item?.length > 0) {
      var contents = props.homeContents.item.item[0].content;
      let arr = [];
      contents.map((item, index) => {
        console.log(item['item-type']);
        arr.push(item);
      });

      setDataContent(arr);
      let banner = contents.find(item => item['item-type'] === 'banner');
      let slider = contents.find(item => item['item-type'] === 'slider');
      let productgroup = contents.find(
        item => item['item-type'] === 'productgroups',
      );

      if (banner?.duplicable?.d) {
        setBanner(banner);
      }
      if (slider?.duplicable?.d) {
        setSliderContent(slider);
      }
      if (productgroup?.duplicable?.d) {
        setProductgroup(productgroup);
      }
    }
  }, [props.homeContents]);

  const onTokenSuccess = resp => {
    console.log('SUCCESS: ', resp);
    let { actions } = props;
    actions.setSessionLanguage(
      { language: 'EN' },
      response => {
        console.log('SUCCESS', response);
      },
      response => {
        console.log('ERROR', response);
      },
    );
  };

  const loginByToken = () => {
    if (props.loginToken) {
      let { actions } = props;
      actions.login(
        { token: props.loginToken },
        response => {
          console.log('SUCCESS', response);
        },
        response => {
          console.log('ERROR', response);
        },
      );
    }
  };

  const onSuccess = resp => {
    console.log('getJustDropped SUCCESS: ', resp);
  };

  const onError = resp => {
    console.log('ERROR: ', resp);
  };

  const onCategorySuccess = resp => {
    console.log('SUCCESS: ', resp);
  };

  const onCategoryError = resp => {
    console.log('ERROR: ', resp);
  };

  const onClick = data => {
    props.navigation.navigate('ArticleDetail', { data: data });
  };

  const onClickSearch = () => {
    props.navigation.navigate('search-text');
  };

  const onClickProductGroupItem = obj => {
    props.navigation.navigate('article-caterogy', {
      data: {
        _attrs: {
          id: obj.id,
          extra1: obj.title,
        },
      },
    });
  };

  const onClickBanner = obj => {
    parseAction(obj);
    console.log(obj);
  };

  const onClickSlider = obj => {
    parseAction(obj);
  };

  const onClickText = obj => {
    console.log('obj: ', obj);
    parseAction(obj);
  };

  const parseAction = obj => {
    if (obj['item-action']) {
      if (obj['item-action'] === 'productgroup') {
        props.navigation.navigate('article-caterogy', {
          data: {
            _attrs: {
              id: obj['item-action-data'],
              extra1: obj['item-title'],
            },
          },
        });
      } else {
        if (obj['item-action'] === 'product') {
          // go to product detail
          articleDetail(obj['item-action-data']);
        }
      }
    }
  };

  const articleDetail = articleId => {
    let { actions } = props;
    actions.getArticleDetail({ id: articleId }, onSuccessDetail, onErrorDetail);
  };

  const onSuccessDetail = resp => {
    console.log('SUCCESS: ', resp.articles.article[0]);
    props.navigation.navigate('ArticleDetail', {
      data: resp.articles.article[0],
    });
  };

  const onErrorDetail = resp => {
    console.log('ERROR: ', resp);
  };
  const onClickDelete = data => {
    let { actions } = props;
    //console.log('onClickDelete', data?.id)
    actions.articleAddRecentDelete(data?.id)
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onClick={onClickSearch} />
      <Divider />

      <ScrollView contentContainerStyle={styles.mainContainer}>
        {/* <Header
                    banner={banner}
                    slider={sliderContent}
                    onClickBanner={() => onClickBanner()}
                    onClickSlider={(obj) => onClickSlider(obj)}
                /> */}
        <View style={styles.innerContainer}>
          {dataContent.map((item, index) => {
            if (item['item-type'] === 'text') {
              return (
                <TextContent
                  key={index}
                  data={item}
                  onClickText={obj => onClickText(obj)}
                />
              );
            }
            if (item['item-type'] === 'slider') {
              return (
                <Slider
                  key={index}
                  slider={item}
                  onClickSlider={obj => onClickSlider(obj)}
                />
              );
            }
            if (item['item-type'] === 'banner') {
              // return (
              //     <Banner
              //         key={index}
              //         data={item}
              //         onClickBanner={(obj) => onClickBanner(obj)}
              //     />
              // )
              return (
                <Category
                  key={index}
                  productgroup={item}
                  onClickProductGroupItem={obj => onClickProductGroupItem(obj)}
                />
              );
            }
          })}

          <ScrollViewHoriRect
            type="just_dropped"
            title="Just dropped"
            data={props.justDroppedItems}
            onClick={data => onClick(data)}
          />
          {/* <Category
                    productgroup={productgroup}
                    onClickProductGroupItem={(obj) => onClickProductGroupItem(obj)}
                /> */}
          <ScrollViewHoriRect
            type="most_wanted"
            title="Most wanted"
            data={props.mostWantedItems}
            onClick={data => onClick(data)}
          />
          {/* <Similar /> */}
          {/* <ScrollViewHoriRect type="special" title="Specially selected for you!" data={[]} onClick={(data) => onClick(data)} /> */}
          {/* <ScrollViewHoriRect type="favourite" title="New items from your favourite brands" data={[]} onClick={(data) => onClick(data)} /> */}
          {props.recentArticles?.length > 0 &&
            <ScrollViewHoriRect
              type="recently"
              title="Recently viewed"
              data={props.recentArticles}
              onClick={data => onClick(data)}
              onClickDelete={data => onClickDelete(data)}
            />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  customer: state.auth.customer,
  loginToken: state.auth.loginToken,
  API_TOKEN: state.master.API_TOKEN,
  justDroppedItems: state.article.justDroppedItems,
  mostWantedItems: state.article.mostWantedItems,
  recentArticles: state.article.recentArticles,
  homeContents: state.home.homeContents,
});

const ActionCreators = Object.assign(
  {},
  {
    getJustDropped: articleActions.getJustDropped,
    getCategory: articleActions.getCategory,
    getMostWanted: articleActions.getMostWanted,
    articleFav: articleActions.articleFav,

    loginTokenSession: authActions.loginTokenSession,
    login: authActions.login,

    getToken: masterActions.getToken,
    setSessionLanguage: masterActions.setSessionLanguage,
    getHomeContent: homeActions.getHomeContent,
    getArticleDetail: articleActions.getArticleDetail,
    articleAddRecentDelete: articleActions.articleAddRecentDelete
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

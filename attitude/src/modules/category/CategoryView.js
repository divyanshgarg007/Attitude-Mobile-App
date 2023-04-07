/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Linking,
  Platform,
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { SectionWomen, SectionMan, Section } from './components';
import { SearchBar, Divider } from '../components';
import { FORUM_URL } from '../../util/constants';

import { styles } from './category.style';

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CATE_TOP from '../../assets/data/catetop.json';
import CATE_BOTTOM from '../../assets/data/catebottom.json';
import SALE_CATEGORY from '../../assets/mockdata/sale.json'
const windowWidth = Dimensions.get('window').width;

const ThirdRoute = () => (
  <View style={[styles.container, { backgroundColor: '#fff' }]} />
);

function CategoryView(props) {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'first', title: 'WOMEN' },
    { key: 'second', title: 'MEN' },
    { key: 'third', title: 'FORUM' },
  ]);

  const [data, setData] = useState({
    arrWomen: [], arrMen: [], webgroup: []
  });
  const [womenBanner, setBannerWomen] = useState(null)
  const [menBanner, setBannerMen] = useState(null)
  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(props.allCategories)); //Object.assign([], props.allCategories);
    console.log('arr', arr)
    if (arr && arr.length > 0) {
      var result = arr.find(obj => {
        return obj._attrs.id === '15';
      });

      // let arrSale = result?.webgroup?.filter(obj => {
      //   return obj?.extra5?.xml?.sale === "true"
      // })

      let arrWomen = result?.webgroup?.find(obj => {
        return obj._attrs.id === '1476';
      });

      var arrMen = result?.webgroup?.find(obj => {
        return obj._attrs.id === '1475';
      });

      var arrKids = result?.webgroup?.find(obj => {
        return obj._attrs.id === '2058';
      });

      // var arrGames = result?.webgroup?.find(obj => {
      //     return obj._attrs.id === "1724"
      // })

      var arrHomeware = result?.webgroup?.find(obj => {
        return obj._attrs.id === '1845';
      });

      arrWomen.webgroup.push(arrKids);
      //arrWomen.webgroup.push(arrGames)
      arrWomen.webgroup.push(arrHomeware);

      arrMen.webgroup.push(arrKids);
      //arrMen.webgroup.push(arrGames)
      arrMen.webgroup.push(arrHomeware);

      CATE_BOTTOM.map(item => {
        arrWomen.webgroup.push(item);
        arrMen.webgroup.push(item);
      });

      CATE_TOP.map(item => {
        arrWomen.webgroup.unshift(item);
        arrMen.webgroup.unshift(item);
      });
      // SALE_CATEGORY.webgroup.map(item => {
      //   arrSale.unshift(item);
      // });
      setData({ arrWomen: arrWomen, arrMen: arrMen, webgroup: result?.webgroup });
    }
  }, [props.allCategories]);

  useEffect(() => {

    if (props?.homeContents && props?.homeContents?.item?.item?.length > 0) {
      var contents = props.homeContents.item.item[0].content;
      let bannerWomen = contents.filter(item => item['title'] === 'APP Women' && item['item-type'] === 'productgroups');
      let bannerMen = contents.filter(item => item['title'] === 'APP Men' && item['item-type'] === 'productgroups');

      if (bannerWomen && bannerWomen[0]?.duplicable?.d) {
        setBannerWomen(bannerWomen[0]?.duplicable?.d);
      }
      if (bannerMen && bannerMen[0]?.duplicable?.d) {
        setBannerMen(bannerMen[0]?.duplicable?.d);
      }
    }
  }, [props.homeContents]);

  _handleIndexChange = index => {
    if (index === routes.length - 1) {
      console.log('INDEX FOUND');
      Linking.openURL(FORUM_URL);
      setIndex(0);
    } else {
      setIndex(index);
    }
  };

  const onClickSearch = () => {
    props.navigation.navigate('search-text');
  };

  const onClickItem = item => {
    console.log('itemData', item)
    if (
      item._attrs.id === '2058' ||
      item._attrs.id === '1845' ||
      item._attrs.id === '1724'
    ) {
      props.navigation.navigate('SubCategory', { data: item });
    } else if (item._attrs.id === '1227') {
      props.navigation.navigate('article-caterogy', { data: item });
    } else if (
      item._attrs.description === 'New'
    ) {
      props.navigation.navigate('SaleNew', { data: item });
    } else if (
      item._attrs.extra1 === 'Bands' ||
      item._attrs.extra1 === 'Brands' ||
      item._attrs.extra1 === 'Merchandise' ||
      item._attrs.extra1 === 'Games'
    ) {
      props.navigation.navigate('bandsCategory', { data: item });
    } else if (item._attrs.description === 'Sale') {
      let newSaleCategory = SALE_CATEGORY?.webgroup?.filter((data) => data?._attrs?.id !== '1475' && data?._attrs?.type !== 'men')
      if (index === 1) {
        newSaleCategory = SALE_CATEGORY?.webgroup?.filter((data) => data?._attrs?.id !== '1476' && data?._attrs?.type !== 'women')
      }
      let obj = {
        _attrs: SALE_CATEGORY?._attrs,
        webgroup: newSaleCategory
      }
      props.navigation.navigate('SubCategory', { data: obj });
    }

    // else if (item._attrs.extra1 === "Brands") {
    //     props.navigation.navigate('bandsCategory', { data: item })
    // } else if (item._attrs.extra1 === "Merchandise") {
    //     props.navigation.navigate('bandsCategory', { data: item })
    // }
    else {
      props.navigation.navigate('search-filter', { data: item });
    }
  };

  const onClickCatItem = item => {
    //alert(item.id)
    if (item.id === 'hairdye') {
      let obj = {
        webgroup: [],
        _attrs: {
          arts: 'true',
          bitpos: '440',
          description: 'Hairdye',
          extra1: 'Hairdye',
          id: '1227',
          image: 'Layout/Icons/homewear.png',
          mgi: '1',
          rank: '4',
          sel: 'false',
        },
      };
      props.navigation.navigate('article-caterogy', { data: obj });
    } else {
      Linking.openURL(FORUM_URL);
    }
  };

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={{ marginTop: Platform.OS === 'ios' ? 64 : 0 }}>
        <SearchBar onClick={onClickSearch} />
        <Divider />
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 1,
              ),
            });

            const isFocused = index === i;
            return (
              <View key={i} style={styles.tabItem}>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: isFocused ? 2 : 1,
                    borderBottomColor: isFocused ? '#922a27' : '#707070',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: windowWidth / 3,
                    height: 44,
                  }}
                  onPress={() => _handleIndexChange(i)}>
                  <Animated.Text
                    style={{
                      opacity,
                      color: '#000',
                      fontFamily: 'CenturyGothic',
                      fontSize: 20,
                    }}>
                    {route.title}
                  </Animated.Text>
                </TouchableOpacity>
                {index !== 2 && (
                  <View
                    style={{ height: 44, width: 1, backgroundColor: '#707070' }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
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
  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <Section
            type="women"
            data={data.arrWomen?.webgroup}
            onClick={item => onClickItem(item)}
            onClickCatItem={item => onClickCatItem(item)}
            bannerData={womenBanner}
            onClickProductGroupItem={obj => onClickProductGroupItem(obj)}
          />
        );
      case 'second':
        return (
          <Section
            type="men"
            data={data.arrMen?.webgroup}
            onClick={item => onClickItem(item)}
            onClickCatItem={item => onClickCatItem(item)}
            bannerData={menBanner}
            onClickProductGroupItem={obj => onClickProductGroupItem(obj)}
          />
        );
      case 'third':
        return <ThirdRoute />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      scrollEnabled={true}
      renderScene={renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
      sceneContainerStyle={{ overflow: 'visible' }}
    />
  );
}

const mapStateToProps = state => ({
  allCategories: state.article.allCategories,
  homeContents: state.home.homeContents,
});

const ActionCreators = Object.assign(
  {},
  {
    getJustDropped: articleActions.getJustDropped,
    getCategory: articleActions.getCategory,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);

/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image } from 'react-native';

import { styles } from './wishlist.style';
import GlobalStyle from '../styles/globalstyle';

import { WishAllItem } from './components';

import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { NavigationBar } from './components';

import { connect } from 'react-redux';
import { articleActions } from '../../services/articleactions/articleRedux';
import { authActions } from '../../services/authactions/authRedux';
import { bindActionCreators } from 'redux';

import CHEVON from '../../assets/images/arrowdown.png';
import { Hud } from '../components';
import { EmptyWish } from './components';
import { cartActions } from '../../services/cartactions/cartRedux';
import update from 'immutability-helper';
import { Snackbar } from 'react-native-paper';

const DATA_BOARD = [
  { id: 0, name: 'Blouse' },
  { id: 1, name: 'Dresses' },
];

function AllItemView(props) {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [hud, setHud] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [snack, setSanck] = useState({ visible: false, message: '' });

  // ref
  const bottomSheetModalAddRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  useEffect(() => {
    let { actions } = props;
    actions.resetArticleDetail({});
  }, []);

  useEffect(() => {
    callAPI();
  }, [props.user]);

  useEffect(() => {
    setData(props.favArticles);
  }, [props.favArticles]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const onDismissSnackBar = () =>
    setSanck({ visible: false, message: 'Article added to bag successfully' });

  const callAPI = () => {
    let { actions } = props;
    actions.favArticles(
      {},
      response => {
        console.log('SUCCESS', response);
        setData(response.articles.article);
        setIsFetching(false);
      },
      response => {
        console.log('ERROR', response);
        setIsFetching(false);
      },
    );
  };

  const onRefresh = () => {
    setIsFetching(true);
    callAPI();
  };

  const onClickSize = (item, size) => {
    var objIdx = data.findIndex(obj => {
      return obj.id === item.parentid;
    });
    var obj = data.find(obj => {
      return obj.id === item.parentid;
    });

    const updatedData = update(data, {
      $splice: [[objIdx, 1, Object.assign(obj, { selSizeObj: item })]],
    }); // array.splice(start, deleteCount, item1)
    setData(updatedData);
  };

  const onClickDelete = item => {
    //alert("")
    var result = data.filter(obj => {
      return obj.id !== item.id;
    });

    setHud(true);
    let { actions } = props;
    actions.articleUnFav(
      { id: item.id },
      response => {
        console.log('SUCCESS', response);
        setHud(false);
        setData([...result]);
      },
      response => {
        console.log('ERROR', response);
        setHud(false);
      },
    );
  };

  const onPressAdd = () => {
    bottomSheetModalAddRef.current?.present();
  };

  const onPressAddCancel = () => {
    bottomSheetModalAddRef.current?.close();
  };

  const clickAddToBag = item => {
    if (item?.cluster === 'true') {
      if (item.selSizeObj) {
        callAddToCartAPI(item.selSizeObj.id);
      } else {
        alert('Please select size');
      }
    } else {
      callAddToCartAPI(item.id);
    }
  };

  const callAddToCartAPI = articleId => {
    setHud(true);
    let { actions } = props;
    actions.addArticleToCart(
      { item_id1: articleId, item_qty1: '1' },
      response => {
        console.log('SUCCESS', response);
        setHud(false);
        setSanck({ visible: true, message: 'Article added to bag successfully' });
      },
      response => {
        setHud(false);
        console.log('ERROR', response);
      },
    );
  };

  const getItemDetail = item => {
    setHud(true);
    let { actions } = props;
    actions.getArticleDetail(
      { id: item.id },
      response => {
        console.log('SUCCESS', response.articles.article[0]);
        var objIdx = data.findIndex(obj => {
          return obj.id === item.id;
        });
        console.log(objIdx);
        const updatedData = update(data, {
          $splice: [[objIdx, 1, response.articles.article[0]]],
        }); // array.splice(start, deleteCount, item1)
        setData(updatedData);
        setHud(false);
      },
      error => {
        console.log('ERROR', error);
        setHud(false);
      },
    );
  };

  const onClickSignin = () => {
    console.log(formData);
    let { actions } = props;
    actions.loginToken(formData);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={({ item }) => (
          <WishAllItem
            key={item.id}
            item={item}
            selectItem={props.selectItem}
            onClickSize={(item, type) => onClickSize(item, type)}
            onClickDelete={item => onClickDelete(item)}
            ClickAdd={item => clickAddToBag(item)}
            getItemDetail={item => getItemDetail(item)}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        ListEmptyComponent={() => <EmptyWish />}
        ListHeaderComponent={() => (
          <Header data={data} selectItem={props.selectItem} />
        )}
      />

      {props.selectItem && <Footer onPressAdd={onPressAdd} />}

      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalAddRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={() => <View />}
        backgroundComponent={props => <BottomSheetBackground {...props} />}>
        <View style={styles.contentContainer}>
          <NavigationBar
            type={'addBoard'}
            title="ADD TO BOARD"
            onPressAddCancel={onPressAddCancel}
          />
          <FlatList
            style={{ flex: 1, backgroundColor: '#fff' }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={DATA_BOARD}
            renderItem={({ item }) => <ItemAddBoard item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </BottomSheetModal>

      <Hud visible={hud} />

      <Snackbar
        style={{ backgroundColor: '#00954F' }}
        visible={snack.visible}
        duration={3000}
        onDismiss={onDismissSnackBar}>
        {snack.message}
      </Snackbar>
    </View>
  );
}

const BottomSheetBackground = ({ style }) => {
  return (
    <View
      style={[
        {
          borderRadius: 0,
        },
        { ...style },
      ]}
    />
  );
};

const Header = props => {
  var suffix = props.data?.length > 1 ? 'Items' : 'Item';
  if (props.selectItem) {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          backgroundColor: '#00954F',
          height: 38,
        }}>
        <Text
          style={{
            color: '#000',
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
            fontSize: 12,
          }}>
          Items added to Board
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          borderBottomColor: '#000',
          borderBottomWidth: 0.33,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 12,
            fontFamily: GlobalStyle.fontSet.CenturyGothic,
          }}>
          {props.data?.length} {suffix}
        </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text
            style={{
              color: '#000',
              fontSize: 12,
              fontFamily: GlobalStyle.fontSet.CenturyGothic,
            }}>
            Recently Added
          </Text>
          <Image style={{ width: 15, height: 15 }} source={CHEVON} />
        </View>
      </View>
    );
  }
};

const Footer = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: 'black',
        borderTopWidth: 0.33,
        paddingVertical: 10,
      }}>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          Delete
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressAdd}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          Add to Board
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ItemSize = props => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          {props.item.name}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            marginLeft: 15,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          {props.item.price}
        </Text>
      </View>
      <Text
        style={{
          color: '#000',
          fontSize: 14,
          fontFamily: GlobalStyle.fontSet.CenturyGothic,
        }}>
        {props.item.deliverytime}
      </Text>
    </TouchableOpacity>
  );
};
const HeaderSize = props => {
  return (
    <View style={{ backgroundColor: '' }}>
      <View style={{ backgroundColor: '#000', padding: 10 }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          SELECT SIZE
        </Text>
      </View>
      <View
        style={{
          bottomBorderColor: '#000',
          borderBottomWidth: 0.33,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothic,
          }}>
          Shipping to:{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Netherlands</Text>
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemAddBoard = props => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{ fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>
          {props.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loginToken: state.auth.loginToken,
  favArticles: state.article.favArticles,
});

const ActionCreators = Object.assign(
  {},
  {
    favArticles: articleActions.favArticles,
    articleUnFav: articleActions.articleUnFav,
    addToBag: articleActions.addToBag,
    loginToken: authActions.loginToken,
    addArticleToCart: cartActions.addArticleToCart,
    getArticleDetail: articleActions.getArticleDetail,
    resetArticleDetail: articleActions.resetArticleDetail,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllItemView);

/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Platform,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { styles } from './cart.style';
import GlobalStyle from '../styles/globalstyle';

import { CartItem, Empty } from './components';
import { getPrice } from '../utils/Utils';

import { connect } from 'react-redux';
import { cartActions } from '../../services/cartactions/cartRedux';
import { bindActionCreators } from 'redux';
import { articleActions } from '../../services/articleactions/articleRedux';
import { Hud } from '../components';
import { Snackbar } from 'react-native-paper';

function CartView(props) {
  const [data, setData] = useState(null);
  const [type, setType] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [snack, setSanck] = useState({ visible: false, message: '' });
  const [hud, setHud] = useState(false);

  // ref
  const bottomSheetModalRef = useRef(null);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <>
            {props?.cartArticles?.basket?.basketline?.length > 0 && (
              <TouchableOpacity
                style={styles.checkoutBg}
                onPress={() => onClickCheckout()}>
                <Text style={styles.textCheckout}>CHECKOUT</Text>
              </TouchableOpacity>
            )}
          </>
        );
      },
    });
  }, [props.navigation, props.cartArticles.basket]);

  useEffect(() => {
    callAPI();
  }, [props.user]);

  useEffect(() => {
    if (props.cartArticles) {
      setData(props.cartArticles.basket);
    }
  }, [props.cartArticles]);

  const onDismissSnackBar = () =>
    setSanck({ visible: false, message: 'Article added successfully' });

  const callAPI = () => {
    let { actions } = props;
    actions.cartArticles(
      {},
      response => {
        console.log('SUCCESS', response);
        //setData(response.basket)
        setIsFetching(false);
      },
      response => {
        console.log('ERROR', response);
        setIsFetching(false);
      },
    );
  };

  const onClickSize = type => {
    setType(type);
    bottomSheetModalRef.current?.present();
  };

  const onClickDelete = item => {
    setHud(true);
    let { actions } = props;
    actions.removeCartArticle(
      { id: item.id },
      response => {
        console.log('SUCCESS', response);
        setHud(false);
        //setData([...result])
        var dat = {};
        if (response.basket.basketline?.id) {
          dat = { ...response.basket, basketline: [response.basket.basketline] };
        } else {
          dat = {
            ...response.basket,
            basketline: [...response.basket.basketline],
          };
        }
        setData(dat);
      },
      response => {
        setHud(false);
        console.log('ERROR', response);
      },
    );
  };

  const onClickSave = item => {
    setHud(true);
    let { actions } = props;
    actions.articleFav(
      { item_id1: item.parentartid },
      response => {
        console.log('SUCCESS', response);
        setHud(false);
        setSanck({
          visible: true,
          message: 'Article added to favourite successfully',
        });
      },
      response => {
        console.log('ERROR', response);
        setHud(false);
      },
    );
  };

  const onUpdateItemQuantity = (item, qty) => {
    let { actions } = props;
    actions.updateCartArticle(
      { basketline_id1: item.id, basketline_qty1: qty },
      response => {
        console.log('SUCCESS', response);
        var dat = {};
        if (response.basket.basketline?.id) {
          dat = { ...response.basket, basketline: [response.basket.basketline] };
        } else {
          dat = {
            ...response.basket,
            basketline: [...response.basket.basketline],
          };
        }

        setData(dat);
        setSanck({ visible: true, message: 'Article updated successfully' });
      },
      response => {
        console.log('ERROR', response);
      },
    );
  };

  const onRefresh = () => {
    setIsFetching(true);
    callAPI();
  };

  const onClickCheckout = () => {
    if (props.cartArticles?.basket?.basketline?.length > 0) {
      props.navigation.navigate('Checkout');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data?.basketline}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            qty={item}
            onClickSize={type => onClickSize(type)}
            onClickDelete={item => onClickDelete(item)}
            onClickSave={item => onClickSave(item)}
            onUpdateItemQuantity={(item, qty) =>
              onUpdateItemQuantity(item, qty)
            }
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        ListHeaderComponent={() => <Header data={data} />}
        ListEmptyComponent={() => <Empty />}
      />

      <Snackbar
        style={{ backgroundColor: '#00954F' }}
        visible={snack.visible}
        duration={3000}
        onDismiss={onDismissSnackBar}>
        {snack.message}
      </Snackbar>

      <Hud visible={hud} />
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  favArticles: state.article.favArticles,
  cartArticles: state.cart.cartArticles,
});

const ActionCreators = Object.assign(
  {},
  {
    cartArticles: cartActions.cartArticles,
    removeCartArticle: cartActions.removeCartArticle,
    articleFav: articleActions.articleFav,
    updateCartArticle: cartActions.updateCartArticle,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartView);

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
          <Text style={{ color: '#000', textDecorationLine: 'underline' }}>
            Netherlands
          </Text>
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

const Header = props => {
  var suffix = props.data?.basketline?.length > 1 ? 'Items' : 'Item';
  var total = `€ ${getPrice(props.data?.total?.amount)}`;
  if (props.data?.basketline?.length > 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: 'black',
          borderBottomWidth: 0.33,
          paddingVertical: 10,
          flexDirection: 'row'
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 12,
            fontFamily: GlobalStyle.fontSet.CenturyGothic,
          }}>
          {props.data.length} {suffix}: Total (excluding delivery)
        </Text>
        <Text style={{
          color: '#000',
          fontSize: 12,
          fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          paddingLeft: 4,
        }}>{total}{' '}</Text>
      </View>
    );
  } else {
    return null;
  }
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

const ItemPicker = props => {
  return (
    <TouchableOpacity>
      <Text style={{ color: '#000', padding: 10, textAlign: 'center' }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

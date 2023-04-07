/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './checkout.style';
import { useSelector } from 'react-redux';
import { ButtonAction, Hud } from '../components';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import ARROW_RIGHT from '../../assets/images/arrowright.png';
import CHECK from '../../assets/images/check.png';
import UNCHECK from '../../assets/images/uncheck.png';
import { IMAGE_PREFIX } from '../../util/constants';
import { getPrice } from '../utils/Utils';
import { checkoutActions } from '../../services/checkoutactions/checkoutRedux';
import { cartActions } from '../../services/cartactions/cartRedux';
import COUNTRIES from "../../assets/mockdata/pickupCountry.json"
import ICON_TICK from '../../assets/images/tick.png'

const CheckoutView = props => {
  const user = useSelector(state => {
    return state.auth.user;
  });
  const [hud, setHud] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [billingAddress, setBillingAddress] = useState();

  const [addressType, setAddressType] = useState('');
  const [basketItems, setBasketItems] = useState(null);
  const [country, setCountry] = useState(COUNTRIES[0])
  const [addresses, setAddresses] = useState(COUNTRIES[0])
  const [deliveryType, setDeliveryType] = useState('')
  const [ecreaditType, setEcreaditType] = useState(props?.cartArticles?.basket?.extra?.ecreditusage === 'yes' ? true : false)
  const [availablevalue, setavailablevalue] = useState(user?.ecredits?.availablevalue)
  const [availableqty, setAvailableqty] = useState(user?.ecredits?.availableqty)
  const [discountLoading, setDiscountLoading] = useState(false)
  // ref
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRefCountry = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  useEffect(() => {
    console.log('DEL ADDRESS: ', user?.deladdresses?.deladdress);
    if (user?.deladdresses?.deladdress) {
      if (Array.isArray(user?.deladdresses?.deladdress)) {
        setAddresses(user?.deladdresses?.deladdress)
        setDeliveryAddress(user?.deladdresses?.deladdress[0])
        setBillingAddress(user?.deladdresses?.deladdress[0])
      } else {
        setAddresses([user?.deladdresses?.deladdress])
        setDeliveryAddress(user?.deladdresses?.deladdress)
        setBillingAddress(user?.deladdresses?.deladdress)
      }
    }

    if (user?.deladdresses?.deladdress) {
      updateDetail();
    }
  }, []);

  useEffect(() => {
    if (props.cartArticles) {
      setBasketItems(props.cartArticles.basket.basketline);
    }
  }, [props.cartArticles]);

  const updateDetail = () => {
    let { actions } = props;
    var params = {
      deliverymethod: user.mstatus.paymentmethod,
      deliveryaddrno: deliveryAddress?.addrnr,
    };
    actions.basketDetail(
      { params },
      response => {
        console.log('SUCCESS', response);
      },
      response => {
        console.log('ERROR', response);
      },
    );
  };

  const onClickAddNewAddress = () => {
    props.navigation.navigate('NewAddress', { onsubmit: handleAddNewAddress });
    bottomSheetModalRef.current?.close();
  };

  const handleAddNewAddress = obj => {
    let { actions } = props;

    var params = {};

    params.deliverymethod = user.mstatus.paymentmethod;
    params.deliveryname1 = obj?.firstName;
    params.deliveryname2 = obj?.lastName;
    params['delivery street'] = obj?.street;
    params.deliveryhouseno = obj?.hNo;
    params['delivery zip code'] = obj?.zip;
    params.deliverycity = obj?.city;
    params['delivery state'] = obj?.state;
    params['delivery country'] = obj?.country;
    params['delivery email'] = '';
    params.deliveryphone1 = '';
    params.deliveryphone2 = '';
    params.deliveryfax = '';

    actions.basketDetail(
      { params },
      (response, data) => {
        console.log('SUCCESS', response, data);
        props?.navigation.navigate('Checkout');
        let obj = {
          addrnr: '',
          cpnr: '-1',
          desc: '',
          name1: data.deliveryname1,
          name2: data.deliveryname2,
          street: data['delivery street'],
          housenr: data.deliveryhouseno,
          zipcode: data['delivery zip code'],
          city: params.deliverycity,
          state: params['delivery state'],
          country: params['delivery country'],
          phone1: params.deliveryphone1,
          phone2: params.deliveryphone2,
          fax: params.deliveryfax,
          email: params['delivery email'],
        };
        setBillingAddress(obj);
        setDeliveryAddress(obj);
      },
      response => {
        console.log('ERROR', response);
      },
    );
  };

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

  const onChangeDelAddress = () => {
    bottomSheetModalRef.current?.present();
    setAddressType('delivery');
  };

  const onChangeBillAddress = () => {
    bottomSheetModalRef.current?.present();
    setAddressType('billing');
  };
  const handlePickupAddress = (data) => {
    let obj = {
      addrnr: "1",
      city: data.address?.city,
      country: data.address?.countryCode,
      cpnr: "-1",
      desc: "",
      email: "",
      extra: { info: '' },
      fax: "",
      housenr: "14",
      name1: data?.name,
      name2: "",
      phone1: "",
      phone2: "",
      state: "",
      street: data.address?.street,
      zipcode: data.address?.zipCode,
    }
    //setBillingAddress(obj);
    setDeliveryAddress(obj);
  }
  const onChangeDeliveryType = (data) => {
    setDeliveryType(data)
    if (data === 'pickup') {
      props.navigation.navigate('search-area', { onSubmit: handlePickupAddress, country_type: country.type })
    }
  };
  const onChangeEcreaditType = (data) => {
    setEcreaditType(!ecreaditType)
    updateEcreadit()
  }
  const onClickDiscountCode = (data) => {
    setDiscountLoading(true)
    let { actions } = props;
    let params = {
      discountcode: data,
    };
    actions.basketDetail(
      { params },
      response => {
        console.log('SUCCESSEDISCOUNTCODE', response);
        actions.cartArticles(
          {},
          response => {
            setDiscountLoading(false)
            console.log('resposneDiscountCode', response)
          },
          response => {
            console.log('error')
          },
        );
        props.navigation.goBack()
      },
      response => {
        setDiscountLoading(false)
        console.log('ERROREcreadit', response);
      },
    );
  }
  const updateEcreadit = () => {
    let { actions } = props;
    var params
    if (!ecreaditType) {
      params = {
        useecredits: 'yes',
      };
    } else {
      params = {
        ecredits: 'no',
      };
    }

    actions.basketDetail(
      { params },
      response => {
        console.log('SUCCESSEcreadit', response);
        actions.cartArticles(
          {},
          response => {
            console.log('resposneEcreadit', response)
            if (response?.basket?.total?.ecreditvalue !== undefined && response?.basket?.total?.ecreditqty !== undefined) {
              setavailablevalue(response?.basket?.total?.ecreditvalue)
              setAvailableqty(response?.basket?.total?.ecreditqty)
            }
          },
          response => {
            console.log('error')
          },
        );
      },
      response => {
        console.log('ERROREcreadit', response);
      },
    );
  }
  const onClickCountryItem = (item) => {
    setCountry(item)
    bottomSheetModalRefCountry.current?.close();
  }
  const onClickSize = (type) => {
    console.log('click country')
    bottomSheetModalRefCountry.current?.present();
  }
  const onClickAdressItem = item => {
    if (addressType === 'delivery') {
      setDeliveryAddress(item);
    } else {
      setBillingAddress(item);
    }

    bottomSheetModalRef.current?.close();
  };

  const onClickContinue = () => {
    setHud(true);
    let { actions } = props;
    var params = {
      successurl: 'app_id://paymentsuccess',
      cancelurl: 'app_id://paymentcancelled',
      errorurl: 'app_id://paymenterror',
      rejecturl: 'app_id://paymentrejected',
    };

    actions.paymentTransaction(
      { params },
      response => {
        setHud(false);
        console.log('SUCCESS', response);
        //setPaymentUrl(response.redirecturl)
        //setTransactionId(response.transactionid)
        //setOrderNo(response.orderid)
        props.navigation.navigate('Payment', { response: response });
      },
      response => {
        setHud(false);
        console.log('ERROR', response);
      },
    );
  };
  console.log('props.cartArticles', props.cartArticles)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <RowItem title="DELIVER TO:  " subTitle="The Netherlands" onClick={onClickSize} country={country} />
        <DiscountRow title="DISCOUNT CODE / GIFT CARD"
          onClick={() => props.navigation.navigate('discount', { onClick: onClickDiscountCode, discountLoading: discountLoading })}
        />
        {basketItems && <Item items={basketItems} />}
        <DeliveryOption
          country={country}
          label="DELIVERY OPTIONS"
          deliveryType={deliveryType}
          onChangeDeliveryType={onChangeDeliveryType}
        />
        <AddressBlock
          type="DELIVERY ADDRESS"
          item={deliveryAddress}
          onClick={() => onChangeDelAddress()}
        />
        <AddressBlock
          type="BILLING ADDRESS"
          item={billingAddress}
          onClick={() => onChangeBillAddress()}
        />
        <EcreaditOption
          availablevalue={availablevalue}
          availableqty={availableqty}
          user={user}
          label="ATTITUDECOINS"
          ecreaditType={ecreaditType}
          onChangeEcreaditType={onChangeEcreaditType}
        />
        <TotalBlock data={props.cartArticles.basket} />

        <ButtonAction
          isValid={true}
          style={{
            height: 45,
            marginBottom: 25,
            paddingHorizontal: 25,
            backgroundColor: '#00964F',
          }}
          title="CONTINUE"
          onClick={() => onClickContinue()}
        />

        {/* <ButtonAction
          isValid={true}
          style={{
            height: 45,
            marginBottom: 25,
            paddingHorizontal: 25,
            backgroundColor: '#000',
          }}
          title="DHL Pickup"
          onClick={() => props.navigation.navigate('search-area')}
        /> */}

        {/* <ButtonAction
          isValid={true}
          style={{
            height: 45,
            marginBottom: 25,
            paddingHorizontal: 25,
            backgroundColor: '#000',
          }}
          title="DHL Pickup"
          onClick={()=>props.navigation.navigate('dhl-pickup')}
        /> */}

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          enableHandlePanningGesture={true}
          detached={true}
          onChange={handleSheetChanges}>
          <SafeAreaView style={{ flex: 1 }}>
            <ButtonAction
              isValid={true}
              style={{
                height: 45,
                marginBottom: 25,
                paddingHorizontal: 25,
                backgroundColor: '#00964F',
              }}
              title="ADD NEW ADDRESS"
              onClick={() => onClickAddNewAddress()}
            />
            <Text style={[styles.title, { fontSize: 18, marginLeft: 10 }]}>
              Select an address
            </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              data={addresses}
              renderItem={({ item }) => (
                <AddressItem
                  item={item}
                  onClick={item => onClickAdressItem(item)}
                />
              )}
              keyExtractor={item => item.addrnr}
            />
          </SafeAreaView>
        </BottomSheetModal>
        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={bottomSheetModalRefCountry}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          enableHandlePanningGesture={true}
          detached={true}
          onChange={handleSheetChanges}
        >
          <SafeAreaView style={styles.contentContainer}>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              data={COUNTRIES}
              renderItem={({ item }) => (
                <CountryItem
                  item={item}
                  select={country}
                  onClick={(item) => onClickCountryItem(item)}
                />
              )}
              keyExtractor={item => item.id}

            />
          </SafeAreaView>
        </BottomSheetModal>
      </ScrollView>

      {hud && <Hud visible={hud} />}
    </SafeAreaView>
  );
};

const RowItem = props => {
  return (
    <View style={{ paddingVertical: 5, backgroundColor: '#000' }}>
      <View style={styles.itemFirst}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subTitle}>{props.country?.name}</Text>
        </View>
        <TouchableOpacity onPress={props?.onClick}>
          <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DiscountRow = props => {
  return (
    <View style={{ paddingBottom: 5, backgroundColor: '#000' }}>
      <View style={styles.itemFirst}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <TouchableOpacity onPress={props?.onClick}>
          <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Item = props => {
  return (
    <Pressable
      style={{
        paddingHorizontal: 15,
        borderBottomWidth: 5,
        borderBottomColor: '#000',
      }}
      onPress={() => null}>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={styles.item}>
          <Text style={styles.title}>MY BAG</Text>
          <TouchableOpacity onPress={props.onClick}>
            <Text style={styles.title}>View</Text>
          </TouchableOpacity>
        </View>
        <ProductItem
          //items={item.items}
          items={props.items}
        />
      </View>
    </Pressable>
  );
};

const ProductItem = props => {
  var arr = [];
  for (let index = 0; index < props.items.length; index++) {
    var item = props.items[index];
    if (index <= 1) {
      arr.push(
        <Image
          key={index}
          style={styles.prodItem}
          source={{ uri: `${IMAGE_PREFIX}${item.thumbnail}` }}
        />,
      );
    } else {
      if (props.items.length > 3) {
        arr.push(
          <View key={index} style={styles.prodMaxItem}>
            <Text style={styles.maxCount}>+{props.items.length - 3}</Text>
          </View>,
        );
      } else {
        arr.push(<View key={index} style={styles.prodItem} />);
      }

      break;
    }
  }
  return <View style={{ flexDirection: 'row' }}>{arr}</View>;
};

const AddressBlock = props => {
  var address =
    props.item?.name1 +
    ' ' +
    props.item?.name2 +
    '\n' +
    props.item?.street +
    ' ' +
    props.item?.housenr +
    '\n' +
    props.item?.zipcode +
    ' ' +
    props.item?.city +
    '\n' +
    props.item?.country +
    '\n' +
    props.item?.phone1;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.addressItem}>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.title}>{props.type}</Text>
          <Text style={styles.desc}>{address}</Text>
        </View>

        <ButtonAction
          isValid={true}
          style={{ height: 45, paddingHorizontal: 25 }}
          title="CHANGE"
          onClick={() => props.onClick()}
        />
      </View>
    </View>
  );
};

const AddressItem = props => {
  var address =
    props.item.name1 +
    ' ' +
    props.item.name2 +
    '\n' +
    props.item.street +
    ' ' +
    props.item.housenr +
    '\n' +
    props.item.zipcode +
    ' ' +
    props.item.city +
    '\n' +
    props.item.country +
    '\n' +
    props.item.phone1;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { borderBottomWidth: 0.33 }]}
      onPress={() => props.onClick(props.item)}>
      <View style={styles.addressItem}>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.title}>{props.type}</Text>
          <Text style={styles.desc}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DeliveryOption = props => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomColor: '#000',
        borderBottomWidth: 5,
      }}>
      <Text style={[styles.title]}>{props.label}</Text>
      {props?.country.type === "NL" &&
        <CheckBox
          style={{ marginTop: 10 }}
          title="FREE"
          subTitle="DHL pick up point"
          icon={CHECK}
          uncheck={UNCHECK}
          check={props?.deliveryType === 'pickup'}
          onChange={props?.onChangeDeliveryType}
          type="pickup"
        />
      }
      <CheckBox
        style={{ marginTop: 10 }}
        title="FREE"
        subTitle="DHL Home address. Free from €75"
        icon={CHECK}
        uncheck={UNCHECK}
        check={props?.deliveryType === 'home'}
        onChange={props?.onChangeDeliveryType}
        type="home"
      />
      <CheckBox
        style={{ marginTop: 10 }}
        title="€ 5,9"
        subTitle="DHL not with the neighbors"
        icon={CHECK}
        uncheck={UNCHECK}
        check={props?.deliveryType === 'neighbors'}
        onChange={props?.onChangeDeliveryType}
        type='neighbors'
      />
    </View>
  );
};
const EcreaditOption = props => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomColor: '#000',
        borderBottomWidth: 5,
      }}>
      <Text style={[styles.title]}>{props.label}</Text>

      <CheckBox
        style={{ marginTop: 10 }}
        title={props?.availableqty}
        subTitle={`AttitudeCoins - Worth`}
        ecreditvalue={`€ ${getPrice(props?.availablevalue)}`}
        icon={CHECK}
        uncheck={UNCHECK}
        check={props?.ecreaditType}
        onChange={props?.onChangeEcreaditType}
      />
    </View>
  );
};
const CheckBox = props => {
  //const [check, setCheck] = useState(props.check);
  const handleChange = () => {
    //if (props?.type === 'pickup' && !check) {
    props?.onChange()
    //}
    //setCheck(!check)
  }
  return (
    <TouchableOpacity
      style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}
      onPress={() => props?.onChange(props?.type)}>
      <Image
        style={{ width: 14, height: 14 }}
        source={props?.check ? props.icon : props.uncheck}
      />
      <Text style={[styles.title, { marginLeft: 10 }]}>{props.title}</Text>
      <Text style={[styles.subTitle, { marginLeft: 10 }]}>{props.subTitle}</Text>
      {props?.ecreditvalue && props?.ecreditvalue !== undefined &&
        <Text style={[styles.title, { marginLeft: 10 }]}>{props.ecreditvalue}</Text>
      }
    </TouchableOpacity>
  );
};

const TotalBlock = props => {
  var price = props.data?.total?.amount - props?.data?.total?.discount
  var total = `€ ${getPrice(price)}`;
  return (
    <View style={{ marginVertical: 15, paddingHorizontal: 15 }}>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.subTitle}>Sub-total</Text>
        <Text style={styles.subTitle}>{total}</Text>
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.subTitle}>Delivery</Text>
        <Text style={styles.subTitle}>FREE</Text>
      </View>
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>TOTAL</Text>
        <Text style={styles.title}>{total}</Text>
      </View>
    </View>
  );
};
const CountryItem = (props) => {
  //const [select, setSelect] = useState(false)

  return (
    <TouchableOpacity style={styles.countryContainer} onPress={() => props.onClick(props.item)}>
      <Text style={styles.countryName}>{props.item.name}</Text>

      {(props.select && props.select === props.item.name) &&
        <Image style={{ marginTop: 10, width: 12, height: 12 }} source={ICON_TICK} />}
    </TouchableOpacity>
  )
}
const mapStateToProps = state => ({
  user: state.auth.user,
  cartArticles: state.cart.cartArticles,
  customer: state.auth.customer
});

const ActionCreators = Object.assign(
  {},
  {
    basketDetail: checkoutActions.basketDetail,
    basketOrder: checkoutActions.basketOrder,
    paymentTransaction: checkoutActions.paymentTransaction,
    paymentTransactionSuccess: checkoutActions.paymentTransactionSuccess,
    cartArticles: cartActions.cartArticles,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView);

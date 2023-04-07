/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import ARROW_RIGHT from '../../../assets/images/arrowright.png';
import { ButtonAction } from '../../components';
import { styles } from './address.style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkoutActions } from '../../../services/checkoutactions/checkoutRedux';


const AddressListView = props => {

  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    console.log('USER: ', props.user);
    if (Array.isArray(props.user?.deladdresses?.deladdress)) {
      setAddresses(props.user?.deladdresses?.deladdress)
    } else {
      setAddresses([props.user?.deladdresses?.deladdress])

    }
  }, []);

  const onClickItem = item => {
    props.navigation.navigate('NewAddress', { item: item });
  };

  const onClickAddNew = (item) => {
    props.navigation.navigate("NewAddress", { onsubmit: handleAddNewAddress })
  }
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
        props?.navigation.navigate('AddressList');
      },
      response => {
        console.log('ERROR', response);
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) =>
          <Item
            item={item}
            onClick={(item) => onClickItem(item)}
          />}
      />

      <ButtonAction
        isValid={true}
        style={{ marginBottom: 20 }}
        title="ADD NEW ADDRESS"
        onClick={onClickAddNew}
      />
    </SafeAreaView>
  )
}

const Item = props => {
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
    <TouchableOpacity style={styles.itemContainer} onPress={() => props.onClick(props.item)}>
      <View style={styles.item}>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.title}>DELIVERY ADDRESS</Text>
          <Text style={styles.desc}>{address}</Text>
        </View>
        <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
      </View>
    </TouchableOpacity>
  )
}
const mapStateToProps = state => ({
  user: state.auth.user,
});

const ActionCreators = Object.assign(
  {},
  {
    basketDetail: checkoutActions.basketDetail,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressListView);

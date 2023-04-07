/* eslint-disable prettier/prettier */
import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import {
  ButtonAction,
  CountryDropDown,
  DropDown,
  NavigationBar,
} from '../../components';
import { styles } from './newAddress.style';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import COUNTRIES from '../../../assets/mockdata/country.json';
import ICON_TICK from '../../../assets/images/tick.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { checkoutActions } from '../../../services/checkoutactions/checkoutRedux';
import { Buffer } from 'buffer'
const NewAddressView = props => {
  const [address] = useState(props.route.params?.item);
  const [title, setTitle] = useState(address?.title);
  const [firstName, setFirstName] = useState(address?.name1);
  const [lastName, setLastName] = useState(address?.name2);
  const [country, setCountry] = useState(address?.country);
  const [zip, setZip] = useState(address?.zip);
  const [hNo, setHNo] = useState(address?.houseNumber);
  const [street, setStreet] = useState(address?.street);
  const [address2, setAdress2] = useState(address?.address2);
  const [city, setCity] = useState(address?.city);
  const [state, setState] = useState(address?.state);

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false)
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

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

  const onClickSize = type => {
    bottomSheetModalRef.current?.present();
  };

  const onAddUpdate = () => {
    if (isFormValid()) {
      var titleText = 'Success';
      var message = 'Your address has been added successfully.';
      if (address) {
        message = 'Your address has been updated successfully.';
      }
      Alert.alert(titleText, message, [
        { text: 'OK', onPress: () => props.navigation.goBack() },
      ]);
    }
  };

  const addNewAddress = () => {
    let obj = {
      title: title,
      firstName: firstName,
      lastName: lastName,
      country: country,
      zip: zip,
      hNo: hNo,
      street: street,
      address2: address2,
      city: city,
      state: state,
    };
    props?.route?.params?.onsubmit(obj);
  };
  const isFormValid = () => {
    if (
      title &&
      firstName &&
      lastName &&
      country &&
      zip &&
      hNo &&
      street &&
      title.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      country.length > 0 &&
      zip.length > 0 &&
      hNo.length > 0 &&
      street.length > 0
    ) {
      return true;
    }

    return false;
  };

  const onClickCountryItem = item => {
    setCountry(item.name);
    bottomSheetModalRef.current?.close();
  };
  const onClickPostCode = item => {

    setHNo(item)
    const encodedString = Buffer.from('key:secret').toString('base64');
    setTimeout(() => {
      if (country === 'Netherlands' && zip && item) {
        setLoading(true)
        fetch(`https://api.postcode.eu/nl/v1/addresses/postcode/${zip}/${item}`, {
          method: 'get',
          headers: new Headers({
            'Authorization': 'Basic ' + encodedString
          })
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong');
        })
          .then((responseJson) => {
            setLoading(false)
            setCity(responseJson?.city)
            setStreet(responseJson?.street)
          })
          .catch((error) => {
            setLoading(false)
            setCity('')
            setStreet('')
            console.log(error)
          });
      }
    }, 1000)

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          styles.label,
          { marginTop: 20, paddingHorizontal: 15, fontSize: 20 },
        ]}>
        NEW ADDRESS
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {loading &&
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>

        }
        <ScrollView
          style={{}}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 20 }}>
          <UserInput
            label="TITLE:"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <UserInput
            label="FIRST NAME"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <UserInput
            label="LAST NAME"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />

          <CountryDropDown
            label="COUNTRY"
            value={country}
            onClick={type => onClickSize(type)}
          />
          <UserInput
            label="ZIP/POSTAL CODE"
            value={zip}
            onChangeText={text => setZip(text)}
          />
          <UserInput
            label="HOUSE NUMBER"
            value={hNo}
            onChangeText={text => onClickPostCode(text)}
          />
          <UserInput
            label="STREET ADDRESS"
            value={street}
            onChangeText={text => setStreet(text)}
          />
          <UserInput
            label="CITY"
            value={city}
            onChangeText={text => setCity(text)}
          />
          <UserInput
            label="STATE"
            value={state}
            onChangeText={text => setState(text)}
          />
          <UserInput
            label="ADDRESS 2"
            value={address2}
            onChangeText={text => setAdress2(text)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <ButtonAction
        style={{ marginBottom: 20 }}
        isValid={isFormValid()}
        title={address ? 'SAVE CHANGES' : 'ADD NEW ADDRESS'}
        onClick={address ? onAddUpdate : addNewAddress}
      />

      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        detached={true}
        onChange={handleSheetChanges}>
        <SafeAreaView style={styles.contentContainer}>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={COUNTRIES}
            renderItem={({ item }) => (
              <CountryItem
                item={item}
                select={country}
                onClick={item => onClickCountryItem(item)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const UserInput = props => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.label}
        value={props.value}
        onChangeText={text => props.onChangeText(text)}
      />
    </View>
  );
};

const CountryItem = props => {
  //const [select, setSelect] = useState(false)

  return (
    <TouchableOpacity
      style={styles.countryContainer}
      onPress={() => props.onClick(props.item)}>
      <Text style={styles.countryName}>{props.item.name}</Text>

      {props.select && props.select === props.item.name && (
        <Image
          style={{ marginTop: 10, width: 12, height: 12 }}
          source={ICON_TICK}
        />
      )}
    </TouchableOpacity>
  );
};
const mapStateToProps = state => ({
  user: state.auth.user,
});

const ActionCreators = Object.assign(
  {},
  {
    postCodeDetail: checkoutActions.postCodeDetail,

  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAddressView);

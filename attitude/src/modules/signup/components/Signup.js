/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { SocialButton } from './SocialButton';
import { UserInput } from './UserInput';
import { ButtonAction, Hud } from '../../components';

import FB from '../../../assets/images/social/facebook.png';
import GOOGLE from '../../../assets/images/social/google.png';
import APPLE from '../../../assets/images/social/apple.png';
import TWITTER from '../../../assets/images/social/twitter.png';
import GlobalStyle from '../../styles/globalstyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ARROWDOWN from '../../../assets/images/arrowdown.png';
import { ContactPref } from './contactPref';
import CHECK from '../../../assets/images/check_cir.png';
import UNCHECK from '../../../assets/images/uncheck.png';
import SelectDropdown from 'react-native-select-dropdown';

const days = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const years = [
  '1970',
  '1971',
  '1972',
  '1973',
  '1974',
  '1975',
  '1976',
  '1977',
  '1978',
  '1979',
  '1980',
  '1981',
  '1982',
  '1983',
  '1984',
  '1985',
  '1986',
  '1987',
  '1988',
  '1989',
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
];
const DESC =
  "Signing up with social is super quick.\nNo extra passwords to remember - no brain fail.\nDon't worry, we'd never share any of your data or post anything on your behalf.";
const START_YEAR = 1950;

export default function Signup(props) {
  const [scrType, setScrType] = useState('');

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [genderType, setGenderType] = useState('')
  const getYears = () => {
    var years = [];
    for (let index = START_YEAR; index < 2022; index++) {
      years.push(index);
    }
    return years;
  };

  const onClickSignup = () => {
    props.onClick({
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName,
    });
  };
  const onChangeGenderType = (data) => {
    setGenderType(data)
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP WITH...</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SocialButton icon={FB} title="FACEBOOK" />
          <SocialButton icon={GOOGLE} title="GOOGLE" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SocialButton icon={APPLE} title="APPLE" />
          <SocialButton icon={TWITTER} title="TWITTER" />
        </View>

        <Text style={styles.desc}>{DESC}</Text>

        <Text style={[styles.title, { marginTop: 40 }]}>SIGN UP WITH EMAIL</Text>
        <UserInput
          style={{ marginTop: 20 }}
          title="EMAIL ADDRESS:"
          onChangeText={text => setEmail(text)}
        />
        <UserInput
          style={{ marginTop: 20 }}
          title="FIRST NAME:"
          onChangeText={text => setFirstName(text)}
        />
        <UserInput
          style={{ marginTop: 20 }}
          title="LAST NAME:"
          onChangeText={text => setLastName(text)}
        />
        <UserInput
          style={{ marginTop: 20 }}
          title="PASSWORD:"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Text style={[styles.title, { alignSelf: 'flex-start' }]}>
          DATE OF BIRTH:
        </Text>

        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SelectDropdown
            defaultButtonText="DD"
            data={days}
            buttonTextStyle={{
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothic,
              color: '#000',
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              width: '28%',
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderColor: '#000',
              borderWidth: 0.28,
            }}
            renderDropdownIcon={isOpened => {
              return (
                <Image style={{ width: 21, height: 21 }} source={ARROWDOWN} />
              );
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <SelectDropdown
            defaultButtonText="Month"
            data={months}
            buttonTextStyle={{
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothic,
              color: '#000',
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              width: '35%',
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderColor: '#000',
              borderWidth: 0.28,
            }}
            renderDropdownIcon={isOpened => {
              return (
                <Image style={{ width: 21, height: 21 }} source={ARROWDOWN} />
              );
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <SelectDropdown
            defaultButtonText="YYYY"
            data={getYears()}
            buttonTextStyle={{
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothic,
              color: '#000',
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              width: '32%',
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderColor: '#000',
              borderWidth: 0.28,
            }}
            renderDropdownIcon={isOpened => {
              return (
                <Image style={{ width: 21, height: 21 }} source={ARROWDOWN} />
              );
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>

        <Text style={[styles.title, { alignSelf: 'flex-start' }]}>
          MOSTLY INTERESTED IN:
        </Text>
        <Interest label="MOSTLY INTERESTED IN" value="22 November 1993" onChangeGenderType={onChangeGenderType}
          genderType={genderType} />

        <ContactPref />

        <ButtonAction
          style={styles.join}
          title="JOIN ATTITUDE"
          isLoading={isLoading}
          isValid={
            email.length > 0 &&
            firstName.length > 0 &&
            lastName.length > 0 &&
            password.length > 0
          }
          onClick={onClickSignup}
        />
      </View>
      <Text style={[styles.desc, { alignSelf: 'center', marginVertical: 20 }]}>
        Privacy Policy | Terms and Conditions
      </Text>
    </KeyboardAwareScrollView>
  );
}

const Interest = props => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10, paddingBottom: 15 }}>
      <CheckBox
        title="Womenswear"
        icon={CHECK}
        uncheck={UNCHECK}
        check={props?.genderType === 'womenswear'}
        onChange={props?.onChangeGenderType}
        type="womenswear"
      />
      <CheckBox
        style={{ marginLeft: 10 }}
        title="Menswear"
        icon={CHECK}
        uncheck={UNCHECK}
        check={props?.genderType === 'menswear'}
        onChange={props?.onChangeGenderType}
        type="menswear"
      />
    </View>
  );
};

const CheckBox = props => {
  const [check, setCheck] = useState(props.check);
  return (
    <TouchableOpacity
      style={[{ flexDirection: 'row', alignItems: 'center' }, props.style]}
      onPress={() => props?.onChange(props?.type)}>
      <Image
        style={{ width: 14, height: 14 }}
        source={props.check ? props.icon : props.uncheck}
      />
      <Text style={styles.checkBoxTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
  },
  desc: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    lineHeight: 17,
  },
  checkBoxTitle: {
    marginLeft: 10,
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 14,
    color: '#000',
  },
  join: {
    marginTop: 30,
    paddingVertical: 0,
    marginHorizontal: 0,
    height: 35,
  },
});

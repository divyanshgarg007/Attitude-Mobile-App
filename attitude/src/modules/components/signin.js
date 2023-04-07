/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SocialButton} from './socialButton';
import {UserInput} from './userInput';

import FB from '../../assets/images/social/facebook.png';
import GOOGLE from '../../assets/images/social/google.png';
import APPLE from '../../assets/images/social/apple.png';
import TWITTER from '../../assets/images/social/twitter.png';
import GlobalStyle from '../styles/globalstyle';
import {ButtonAction} from './buttonAction';

export function Signin(props) {
  const onClickForgot = () => {
    alert('onClickForgot');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <UserInput
          style={{marginTop: 20}}
          title="USERNAME:"
          onChangeText={text => props.onChangeUserName(text)}
        />
        <UserInput
          style={{marginTop: 20}}
          title="PASSWORD:"
          secureTextEntry={true}
          onChangeText={text => props.onChangePassword(text)}
        />
        <ButtonAction
          style={{
            marginTop: 30,
            paddingVertical: 0,
            marginHorizontal: 0,
            height: 35,
          }}
          isLoading={props.isLoading}
          title="SIGN IN"
          isValid={
            props.formData?.username?.length > 0 &&
            props.formData?.password?.length > 0
          }
          onClick={props.onClick}
        />

        <Text style={styles.desc} onPress={onClickForgot}>
          Forgot password?
        </Text>
      </View>
      <Text style={[styles.desc, {alignSelf: 'center', marginTop: 0}]}>
        Privacy Policy | Terms and Conditions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingBottom: 14,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 60,
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
});

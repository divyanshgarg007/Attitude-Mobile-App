/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { SocialButton } from './SocialButton';
import { UserInput } from './UserInput';

import FB from '../../../assets/images/social/facebook.png';
import GOOGLE from '../../../assets/images/social/google.png';
import APPLE from '../../../assets/images/social/apple.png';
import TWITTER from '../../../assets/images/social/twitter.png';
import GlobalStyle from '../../styles/globalstyle';
import { ButtonAction } from '../../components';

export default function Signin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onClickForgot = () => {
    alert('onClickForgot');
  };

  const onClickSignin = () => {
    props.onClick({ username: email, password: password });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <UserInput
          style={{ marginTop: 20 }}
          title="USERNAME / EMAIL ADDRESS:"
          onChangeText={text => setEmail(text)}
        />
        <UserInput
          style={{ marginTop: 20 }}
          title="PASSWORD:"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <ButtonAction
          style={{
            marginTop: 30,
            paddingVertical: 0,
            marginHorizontal: 0,
            height: 35,
          }}
          title="SIGN IN"
          isLoading={isLoading}
          isValid={email.length > 0 && password.length > 0}
          onClick={onClickSignin}
        />

        <Text style={styles.desc} onPress={onClickForgot}>
          Forgot password?
        </Text>

        <Text style={styles.title}>OR SIGN IN WITH...</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SocialButton icon={FB} title="FACEBOOK" />
          <SocialButton icon={GOOGLE} title="GOOGLE" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SocialButton icon={APPLE} title="APPLE" />
          <SocialButton icon={TWITTER} title="TWITTER" />
        </View>
      </View>
      <Text style={[styles.desc, { alignSelf: 'center', marginTop: 0 }]}>
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

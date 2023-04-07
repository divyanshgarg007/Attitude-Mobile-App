/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  TextInput,
  Image,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {NavigationBar} from '../../components';
import {styles} from './detail.style';

import DATA from '../../../assets/mockdata/order.json';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ButtonAction} from '../../components';
import CHECK from '../../../assets/images/check.png';
import UNCHECK from '../../../assets/images/uncheck.png';

const MyDetailsView = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{}} contentContainerStyle={{paddingHorizontal: 0}}>
        <UserInput label="FIRST NAME" value="Gabriëlle" />
        <UserInput label="LAST NAME" value="Karsowidjojo" />
        <UserInput label="EMAIL ADDRESS" value="inspire@attitudeholland.nl" />

        <DateInput label="DATE OF BIRTH" value="22 November 1993" />

        <Interest label="MOSTLY INTERESTED IN" value="22 November 1993" />
      </ScrollView>
      <ButtonAction
        isValid={true}
        style={{marginBottom: 10}}
        title="SAVE CHANGES"
      />
    </SafeAreaView>
  );
};

const Interest = props => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 0.28,
      }}>
      <Text style={styles.label}>{props.label}</Text>
      <CheckBox
        title="Womenswear"
        icon={CHECK}
        uncheck={UNCHECK}
        check={true}
      />
      <CheckBox
        style={{marginTop: 5}}
        title="Menswear"
        icon={CHECK}
        uncheck={UNCHECK}
        check={false}
      />
    </View>
  );
};

const CheckBox = props => {
  const [check, setCheck] = useState(props.check);
  return (
    <TouchableOpacity
      style={[{flexDirection: 'row', alignItems: 'center'}, props.style]}
      onPress={() => setCheck(!check)}>
      <Image
        style={{width: 14, height: 14}}
        source={check ? props.icon : props.uncheck}
      />
      <Text style={styles.checkBoxTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const DateInput = props => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 0.28,
      }}>
      <Text style={styles.label}>{props.label}</Text>
      <TouchableOpacity>
        <Text style={styles.input}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const UserInput = props => {
  const [value, setValue] = useState(props.value);
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 0.28,
      }}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

export default MyDetailsView;

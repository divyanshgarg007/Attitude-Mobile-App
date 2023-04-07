/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { ButtonAction } from '../components';
import { styles } from './discount.style';

export default function DiscountView(props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false)
  const onClick = () => {
    setLoading(true)
    props?.route?.params?.onClick(value)
  }
  return (
    <SafeAreaView style={styles.discountContainer}>
      <View style={styles.discountBox}>
        {loading &&
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        }
        <Text style={styles.label}>ADD A DISCOUNT OR GIFT CARD CODE</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => setValue(text)}
          onSubmitEditing={item => {
            onClick()
          }}
        />
      </View>
      <View style={styles.apply}>
        <ButtonAction
          isValid={true}
          title="APPLY CODE"
          onClick={() => onClick()}
        />
      </View>
      <View style={{ paddingVertical: 5, backgroundColor: '#000' }} />
      <View style={styles.needBox}>
        <Text style={[styles.label, styles.mb5]}>NEED TO KNOW</Text>
        <View style={styles.bullets}>
          <View style={styles.round} />
          <Text style={styles.desc}>Loren Ipsum Text Here</Text>
        </View>
        <View style={styles.bullets}>
          <View style={styles.round} />
          <Text style={styles.desc}>Loren Ipsum Text Here</Text>
        </View>
        <View style={styles.bullets}>
          <View style={styles.round} />
          <Text style={styles.desc}>Loren Ipsum Text Here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

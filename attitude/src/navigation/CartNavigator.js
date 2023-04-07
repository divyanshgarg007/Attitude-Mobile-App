/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CartView,
  CheckoutView,
  DhlPickupView,
  DiscountView,
  NewAddressView,
  PaymentView,
  SaleNewArticlesView,
  SearchDHLView,
  SearchTextView,
} from '../modules';
import { Title, Back } from '../modules/components';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export function CartNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name="Cart"
        component={CartView}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: () => <Title title="BAG" />,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
        })}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutView}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <View style={{ marginLeft: -14 }}>
              <Back navigation={navigation} />
            </View>
          ),
          headerTitle: () => <Title title="CHECKOUT" />,
        })}
      />
      <Stack.Screen
        name={'search-area'}
        component={SearchDHLView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'discount'}
        component={DiscountView}
        options={({ navigation }) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="DISCOUNT CODE / GIFT CARD" />,
          headerLeft: () => (
            <View style={{ marginLeft: -14 }}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'dhl-pickup'}
        component={DhlPickupView}
        options={({ navigation }) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="DHL PICKUP POINT" />,
          headerLeft: () => (
            <View style={{ marginLeft: -14 }}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'NewAddress'}
        component={NewAddressView}
        options={({ navigation }) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="ADDRESS BOOK" />,
          headerLeft: () => (
            <View style={{ marginLeft: -14 }}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name={'Payment'}
        component={PaymentView}
        options={({ navigation }) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="PAYMENT" />,
          headerLeft: () => (
            <View style={{ marginLeft: -14 }}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

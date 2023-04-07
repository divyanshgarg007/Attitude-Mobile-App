/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProfileMineView,
  MyOrdersView,
  MyReturnsView,
  MyDetailsView,
  OrderDetailView,
  ReturnsDetailView,
  NotificationSettingsView,
  ContactPrefView,
  ImproveAppView,
  ImproveAppDetailView,
  AddressListView,
  NewAddressView,
  MyECreditView,
  HelpCreditView,
  LogoutView,
  SignupView,
} from '../modules';

import {Back, Title} from '../modules/components';

const Stack = createNativeStackNavigator();

export function ProfileNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'profile'}
      screenOptions={({navigation}) => ({
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={'profile'}
        component={ProfileMineView}
        options={({navigation}) => ({
            contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerShown: true,
          headerTitle: () => <Title title="MY ACCOUNT" />,
        })}
      />
      <Stack.Screen
        name={'MyOrder'}
        component={MyOrdersView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="MY ORDERS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'MyReturns'}
        component={MyReturnsView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="MY RETURNS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'MyDetails'}
        component={MyDetailsView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="MY DETAILS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'OrderDetails'}
        component={OrderDetailView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="ORDER DETAILS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'RerurnsDetails'}
        component={ReturnsDetailView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="RETURN DETAILS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'NotificationSettings'}
        component={NotificationSettingsView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="NOTIFICATIONS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'ContactPref'}
        component={ContactPrefView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="CONTACT PREFERENCES" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'ImproveApp'}
        component={ImproveAppView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="IMPROVE THE APP" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'ImproveAppDetail'}
        component={ImproveAppDetailView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'AddressList'}
        component={AddressListView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="ADDRESS BOOK" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'NewAddress'}
        component={NewAddressView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="ADDRESS BOOK" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'MyECredit'}
        component={MyECreditView}
        options={({navigation}) => ({
          headerShown: true,
          contentStyle: {borderTopColor: '#000', borderTopWidth: 0.6},
          headerTitle: () => <Title title="MY ECREDITS" />,
          headerLeft: () => (
            <View style={{marginLeft: -14}}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'HelpCredit'}
        component={HelpCreditView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutView}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: () => <Title title="MY ACCOUNT" />,
          headerLeft: () => <Back navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={'Signup'}
        component={SignupView}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

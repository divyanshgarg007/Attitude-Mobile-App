/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeView,
  ArticleDetailView,
  ProductInfoView,
  ProductSizeGuideView,
  SearchTextView,
  SignupView,
  CategoryItemsView,
  FilterListView,
  RecentProductView,
} from '../modules';
import { Back, Title } from '../modules/components';

const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetailView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfoView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductSizeGuide"
          component={ProductSizeGuideView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'search-text'}
          component={SearchTextView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'recent-item'}
          component={RecentProductView}
          options={({ navigation }) => ({
            headerShown: true,
            contentStyle: { borderTopColor: '#000', borderTopWidth: 0.6 },
            headerLeft: () => (
              <View style={{ marginLeft: -14 }}>
                <Back navigation={navigation} />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name={'article-caterogy'}
          component={CategoryItemsView}
          options={({ navigation }) => ({
            headerShown: true,
            contentStyle: { borderTopColor: '#000', borderTopWidth: 0.6 },
            headerLeft: () => (
              <View style={{ marginLeft: -14 }}>
                <Back navigation={navigation} />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="filter-category"
          component={FilterListView}
          options={({ navigation }) => ({
            headerShown: true,
            contentStyle: { borderTopColor: '#000', borderTopWidth: 0.6 },
            headerTitle: () => <Title title="FILTER" />,
            headerLeft: () => <Back navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name={'Signup'}
          component={SignupView}
          options={{ headerShown: true }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}>

      </Stack.Group>
    </Stack.Navigator>
  );
}

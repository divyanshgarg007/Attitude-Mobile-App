/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CategoryView,
  CategoryListView,
  CategoryItemsView,
  CategorySaleItemsView,
  SearchTextView,
  FilterListView,
  ArticleDetailView,
  ArticlesView,
  ArticleSaleView,
  ProductInfoView,
  ProductSizeGuideView,
  SubCategoryListView,
  SaleNewArticlesView,
  BandCategoryListView,
  BrandsProductList,
  RecentProductView,
} from '../modules';
import { Title, Back } from '../modules/components';

const Stack = createNativeStackNavigator();

export function SearchNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'search'}
      screenOptions={({ navigation }) => ({
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={'search'}
        component={CategoryView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'search-filter'}
        component={CategoryListView}
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
        name={'sale-caterogy'}
        component={CategorySaleItemsView}
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
        name="ArticleDetail"
        component={ArticleDetailView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticlesView"
        component={ArticlesView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticleSaleView"
        component={ArticleSaleView}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BandsProductView"
        component={BrandsProductList}
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
        name="SubCategory"
        component={SubCategoryListView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'SaleNew'}
        component={SaleNewArticlesView}
        options={({ navigation }) => ({
          headerShown: false,
          contentStyle: { borderTopColor: '#000', borderTopWidth: 0.6 },
          headerTitle: () => <Title title="SALE" />,
          headerLeft: () => (
            <View style={{ marginLeft: -14 }}>
              <Back navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={'bandsCategory'}
        component={BandCategoryListView}
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
    </Stack.Navigator>
  );
}

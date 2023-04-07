/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  WishlistView,
  BoardItemListView,
  CreateBoardView,
  AllItemView,
  ArticleDetailView,
} from '../modules';
import { Title } from '../modules/components';

const Stack = createNativeStackNavigator();

export function WishlistNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'allItems'}
      screenOptions={({ navigation }) => ({
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      })}>
      <Stack.Screen
        name={'allItems'}
        component={AllItemView}
        options={{
          headerShown: true,
          headerTitle: () => <Title title="WISHLIST" />,
          contentStyle: { borderTopColor: '#000', borderTopWidth: 0.6 },
        }}
      />
      <Stack.Screen
        name={'wishlist'}
        component={WishlistView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'boardItemList'}
        component={BoardItemListView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'createBoard'}
        component={CreateBoardView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

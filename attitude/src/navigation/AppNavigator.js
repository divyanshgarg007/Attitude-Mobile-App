import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Image } from 'react-native';

import TAB_STORE from '../assets/images/tabstore.png';
import TAB_SEARCH from '../assets/images/tabsearch.png';
import TAB_BAG from '../assets/images/tabbag.png';
import TAB_FAV from '../assets/images/tabfav.png';
import TAB_USER from '../assets/images/tabuser.png';

import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { CategoryView } from '../modules';
import { SearchNavigator } from './SearchNavigator';
import { CartNavigator } from './CartNavigator';
import { WishlistNavigator } from './WishlistNavigator';

import { getBagCount } from '../util/helpers';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppNavigator(props) {
  useEffect(() => {
    console.log("jh", getBagCount())
  }, [props.count]);

  return (
    <Stack.Navigator>
      {/* <Stack.Screen 
      name="home" component={TabNav} 
      options={{ headerShown: false }} /> */}
      <Stack.Screen name="home" options={{ headerShown: false }}>
        {props => <TabNav {...props} extraData={props.count} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const TabNav = (props) => {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#000', height: 85 },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          var iconName

          if (route.name === "tab-home") {
            iconName = TAB_STORE
            return <Image style={{ width: 38, height: 35, }} source={iconName} />;
          } else if (route.name === "tab-search") {
            iconName = TAB_SEARCH
            return <Image style={{ width: 45, height: 29, tintColor: color }} source={iconName} />;
          } else if (route.name === "tab-bag") {
            iconName = TAB_BAG
            return <Image style={{ width: 24, height: 29, tintColor: color }} source={iconName} />;
          } else if (route.name === "tab-wish") {
            iconName = TAB_FAV
            return <Image style={{ width: 34, height: 29, tintColor: color }} source={iconName} />;
          } else if (route.name === "tab-user") {
            iconName = TAB_USER
            return <Image style={{ width: 25, height: 29, tintColor: color }} source={iconName} />;
          }
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#737373',
      })}
    >
      <Tab.Screen name="tab-home" component={HomeNavigator}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="tab-search" component={SearchNavigator}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="tab-bag" component={CartNavigator}
        options={{
          headerShown: false,
          // tabBarIconStyle: {  },
          tabBarBadgeStyle: { marginTop: 25, backgroundColor: "#009847" },
          tabBarBadge: getBagCount()
        }}
      />

      <Tab.Screen name="tab-wish" component={WishlistNavigator}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="tab-user" component={ProfileNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const mapStateToProps = state => ({
  count: state.article.count
});

export default connect(mapStateToProps, null)(AppNavigator)


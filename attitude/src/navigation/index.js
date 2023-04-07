import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { isLoggedIn } from '../util/helpers';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function RootNavigator(props) {


    if (isLoggedIn()) {
        return (
            <NavigationContainer >
                <AppNavigator />
            </NavigationContainer>
        );
    } else {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </GestureHandlerRootView>
        );
    }

}

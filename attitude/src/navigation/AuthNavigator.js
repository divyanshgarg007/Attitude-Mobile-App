import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../modules/home/components/HomeView';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={'Attitude'}>
            <Stack.Screen name="Attitude" component={HomeView} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

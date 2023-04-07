import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/redux/store';
import AppRedux from './src/AppRedux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

export default function App(props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <PaperProvider>
            <ActionSheetProvider>
              <AppRedux />
            </ActionSheetProvider>
          </PaperProvider>
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}


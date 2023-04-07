/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import * as _redux from "./src/redux";
import axios from 'axios'
import store, { persistor } from "./src/redux/store";

_redux.setupAxios(axios, store);

AppRegistry.registerComponent(appName, () => App);

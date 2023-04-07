
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from "./actionTypes";


export const CONSTANTS = {
}

const initialState = {
  cartArticles: {}
};

//REDUCER

export const getKeyName = () => {
  return 'v1.0' + "-module-cart";
}

//export const masterReducer = (state = initialState, action) => {
export const cartReducer = persistReducer(
  {
    storage: AsyncStorage,
    key: getKeyName(),
    whitelist: ["cartArticles"]
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.CartArticlesSuccess: {
        return {
          ...state, cartArticles: action.payload
        }
      }
      case actionTypes.LogoutSuccess: {

        console.log(action.type, " Auth clearing state...")

        console.log("[BP][UD][LOGOUT][ALL]", initialState)

        return {
          ...state, favArticles: [], count: 0
        }
      }

      default:
        return state;
    }
  })

import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from "./actionTypes";



export const CONSTANTS = {
  OTP_STATE_NONE: undefined,
  OTP_STATE_VERIFY: 100,
  OTP_STATE_VERIFIED: 200,
  OTP_STATE_VERIFY_INCORRECT: 400,
  STATE_STARTED: 100,
  STATE_SUCCESS: 200,
  STATE_ERROR: 400,
  STATE_ERROR_CRITICAL: 500,
}

const initialState = {
  count: 0,
  favArticles: [],
  allCategories: [],
  sortFilter: null,
  justDroppedItems: [],
  mostWantedItems: [],
  articleDetail: null,
  recentArticles: [],
  recentSearch: []
};

//REDUCER

export const getKeyName = () => {
  return 'v1.0' + "-module-article";
}

//export const articleReducer = persistReducer(state = initialAuthState, action) => {
export const articleReducer = persistReducer(
  {
    storage: AsyncStorage,
    key: getKeyName(),
    whitelist: ["count", "allCategories", "sortFilter", "justDroppedItems", "mostWantedItems", "favArticles", "recentArticles", "recentSearch"]
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.addToBagSuccess: {
        return {
          ...state, count: (state.count + 1)
        }
      }

      case actionTypes.sortFilterSuccess: {
        return {
          ...state, sortFilter: action.payload
        }
      }
      case actionTypes.allCategorySuccess: {
        return {
          ...state, allCategories: action.payload.data.result.webgroups.webgroup
        }
      }

      case actionTypes.justDroppedSuccess: {
        return {
          ...state, justDroppedItems: action.payload.data.articles?.article
        }
      }

      case actionTypes.mostWantedSuccess: {
        return {
          ...state, mostWantedItems: action.payload.data.articles?.article
        }
      }

      case actionTypes.articleDetailSuccess: {
        return {
          ...state, articleDetail: action.payload
        }
      }

      case actionTypes.resetArticleDetail: {
        return {
          ...state, articleDetail: null
        }
      }

      case actionTypes.favArticlesSuccess: {
        return {
          ...state, favArticles: action.payload.data.result.articles?.article
        }
      }

      case actionTypes.articleAddRecent: {
        return {
          ...state, recentArticles: action.payload
        }
      }
      case actionTypes.articleAddRecentDelete: {
        return {
          ...state, recentArticles: []
        }
      }
      case actionTypes.recentSearch: {
        return {
          ...state, recentSearch: action.payload
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

import { all } from "redux-saga/effects";
import { combineReducers } from "redux";


import * as auth from '../services/authactions/authRedux'
import * as article from '../services/articleactions/articleRedux'
import * as master from '../services/masteractions/masterRedux'
import * as cart from '../services/cartactions/cartRedux'
import * as home from '../services/homeactions/homeRedux'
import * as checkout from '../services/checkoutactions/checkoutRedux'

import { authReducer } from "../services/authactions/authReducer"
import { articleReducer } from "../services/articleactions/articleReducer";
import { masterReducer } from "../services/masteractions/masterReducer";
import { cartReducer } from "../services/cartactions/cartReducer";
import { homeReducer } from "../services/homeactions/homeReducer";
import { checkoutReducer } from "../services/checkoutactions/checkoutReducer";

export const rootReducer = combineReducers({
  'auth': authReducer,
  'article': articleReducer,
  'master': masterReducer,
  'cart': cartReducer,
  'home': homeReducer,
  'checkout': checkoutReducer
});

export function* rootSaga() {
  console.log("[AUTH] saga initialzing...")

  yield all([
    auth.saga(),
    article.saga(),
    master.saga(),
    cart.saga(),
    home.saga(),
    checkout.saga()
  ]);
  console.log("[AUTH] saga initialized...")
}

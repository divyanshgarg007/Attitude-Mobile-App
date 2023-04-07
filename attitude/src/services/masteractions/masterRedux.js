import { put, call, takeLatest } from "redux-saga/effects";
import { requestPromise, createHeaders, createHeadersWithAuth } from '../../util/request';
import { API_ENDPOINTS } from "../../util/constants";

import { actionTypes } from './actionTypes'


//ACTIONS

export const masterActions = {
  getToken: (payload, onSuccess, onError) => {
    console.log("token action::", { type: actionTypes.GetToken, payload, onSuccess, onError })
    return { type: actionTypes.GetToken, payload, onSuccess, onError }
  },
  getTokenSuccess: (payload) => ({ type: actionTypes.GetTokenSuccess, payload }),

  setSessionLanguage: (payload, onSuccess, onError) => {
    console.log("session language action::", { type: actionTypes.SetSessionLanguage, payload, onSuccess, onError })
    return { type: actionTypes.SetSessionLanguage, payload, onSuccess, onError }
  },

  getLoginToken: (payload, onSuccess, onError) => {
    console.log("token action::", { type: actionTypes.GetLoginToken, payload, onSuccess, onError })
    return { type: actionTypes.GetLoginToken, payload, onSuccess, onError }
  },

};


//SAGA FUNCTION

/*
 * Login Saga with username & password 
 */
export function* postGetToken(action) {

  console.log(action, "SAGA postGetToken");

  //yield put(actions.userLoginStarted(true));
  let requestURL = API_ENDPOINTS.token;

  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {
    // const { email, password } = action.payload;
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetToken After Yield Response");

    //if login success then fetch user details and then forward to login success
    if (response && response.status === 200) {
      yield put(masterActions.getTokenSuccess(response, options.method));
    }

    if (response) {
      action.onSuccess(response);
    }

  } catch (error) {
    console.log("TOKEN", "token", "token-failed")
    let defaultMessage = 'Token Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postSetSessionLanguage(action) {

  console.log(action, "SAGA postSetSessionLanguage");

  //yield put(actions.userLoginStarted(true));
  let requestURL = API_ENDPOINTS.sessionLanguage;

  let options = {};
  options.headers = createHeaders();
  options.method = 'POST';
  options.data = action.payload
  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postSetSessionLanguage After Yield Response");

    if (response) {
      action.onSuccess(response);
    }

  } catch (error) {
    console.log("SESSION LANGUAGE", "language", "language-failed")
    let defaultMessage = 'SESSION LANGUAGE Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}




export function* saga() {
  yield takeLatest(actionTypes.GetToken, postGetToken);
  yield takeLatest(actionTypes.SetSessionLanguage, postSetSessionLanguage);
}


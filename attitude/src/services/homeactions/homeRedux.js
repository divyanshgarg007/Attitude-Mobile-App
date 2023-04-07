import { put, call, takeLatest } from "redux-saga/effects";
import { requestPromise, createHeaders, createHeadersWithAuth } from '../../util/request';
import { API_ENDPOINTS } from "../../util/constants";

import { actionTypes } from './actionTypes'


//ACTIONS

export const homeActions = {
  getHomeContent: (payload, onSuccess, onError) => {
    return { type: actionTypes.HomeContent, payload, onSuccess, onError }
  },
  getHomeContentSuccess: (payload) => ({ type: actionTypes.HomeContentSuccess, payload }),
};


//SAGA FUNCTION

/*
 * HOME Content Saga
 */
export function* postGetHomeContent(action) {

  console.log(action, "SAGA postGetHomeContent");
  let requestURL = API_ENDPOINTS.homeContent;

  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {
    // const { email, password } = action.payload;
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetHomeContent After Yield Response");

    //if login success then fetch user details and then forward to login success
    if (response && response.status === 200) {
      yield put(homeActions.getHomeContentSuccess(response, options.method));
    }

    if (response) {
      action.onSuccess(response);
    }

  } catch (error) {
    console.log("HOME CONTENT", "CONTENT", "CONTENT-failed")
    let defaultMessage = 'CONTENT Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* saga() {
  yield takeLatest(actionTypes.HomeContent, postGetHomeContent);
}


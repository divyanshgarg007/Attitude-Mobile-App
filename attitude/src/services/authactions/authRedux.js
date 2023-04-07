import { put, call, takeLatest } from "redux-saga/effects";
import { requestPromise, createHeaders, createHeadersWithAuth, dataUrlEncoded } from '../../util/request';
import { API_ENDPOINTS } from "../../util/constants"

import { actionTypes } from './actionTypes'


//ACTIONS

export const authActions = {
  loginToken: (payload, onSuccess, onError) => {
    console.log("login token action::", { type: actionTypes.LoginToken, payload, onSuccess, onError })
    return { type: actionTypes.LoginToken, payload, onSuccess, onError }
  },
  loginTokenSession: (payload, onSuccess, onError) => {
    console.log("login token action::", { type: actionTypes.LoginTokenSession, payload, onSuccess, onError })
    return { type: actionTypes.LoginTokenSession, payload, onSuccess, onError }
  },

  loginTokenSuccess: (payload) => {
    console.log("login token success action::", { type: actionTypes.LoginTokenSuccess, payload })
    return { type: actionTypes.LoginTokenSuccess, payload }
  },

  login: (payload, onSuccess, onError) => {
    console.log("login action::", { type: actionTypes.Login, payload, onSuccess, onError })
    return { type: actionTypes.Login, payload, onSuccess, onError }
  },

  loginSuccess: (payload, onSuccess, onError) => {
    console.log("login success action::", { type: actionTypes.LoginSuccess, payload, onSuccess, onError })
    return { type: actionTypes.LoginSuccess, payload, onSuccess, onError }
  },

  sigup: (payload, onSuccess, onError) => {
    console.log("signup action::", { type: actionTypes.Signup, payload, onSuccess, onError })
    return { type: actionTypes.Signup, payload, onSuccess, onError }
  },

  sigupSuccess: (payload, onSuccess, onError) => {
    console.log("signup success action::", { type: actionTypes.SignupSuccess, payload, onSuccess, onError })
    return { type: actionTypes.SignupSuccess, payload, onSuccess, onError }
  },

  customerData: (payload, onSuccess, onError) => {
    console.log("customer data action::", { type: actionTypes.CustomerData, payload, onSuccess, onError })
    return { type: actionTypes.CustomerData, payload, onSuccess, onError }
  },

  saveUser: (payload) => ({ type: actionTypes.SaveUser, payload }),

  //logout: () => ({ type: actionTypes.Logout }),
  logout: (payload, onSuccess, onError) => {
    console.log("logout action::", { type: actionTypes.Logout, payload, onSuccess, onError })
    return { type: actionTypes.Logout, payload, onSuccess, onError }
  },
  logoutSuccess: () => ({ type: actionTypes.LogoutSuccess }),
};


//SAGA FUNCTION

/*
 * Login Token Saga with username & password 
 */
export function* postLoginToken(action) {

  console.log(action, "SAGA PostLoginToken");
  let requestURL = API_ENDPOINTS.loginToken;

  const data = dataUrlEncoded(action.payload)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  console.log("")
  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postLogin After Yield Response");


    //if login success then fetch user details and then forward to login success
    if (response) {
      yield put(authActions.loginTokenSuccess(response, options.method));
      yield put(authActions.saveUser({ username: action.payload.username, password: action.payload.password }));
      // yield put(authActions.login({ token: response.data.result.token }));
      action.onSuccess(response);
    }
  } catch (error) {
    console.log(error)
    console.log("AUTH", "login", "login-failed")
    let defaultMessage = 'Login Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postLogin(action) {

  console.log(action, "SAGA PostLogin");
  let requestURL = API_ENDPOINTS.login;

  const data = dataUrlEncoded(action.payload)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  console.log("")
  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postLogin After Yield Response");
    //if login success then fetch user details and then forward to login success
    if (response) {
      action.onSuccess(response);
    }
  } catch (error) {
    console.log(error)
    // console.log("AUTH", "login", "login-failed")
    let defaultMessage = 'Login Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postLoginTokenSession(action) {

  console.log(action, "SAGA postLoginTokenSession");
  let requestURL = API_ENDPOINTS.loginToken;

  const data = dataUrlEncoded(action.payload)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  console.log("")
  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postLoginTokenSession After Yield Response");


    //if login success then fetch user details and then forward to login success
    if (response) {
      yield put(authActions.loginTokenSuccess(response, options.method));
      //yield put(authActions.saveUser({ username: action.payload.username, password: action.payload.password }));
      action.onSuccess(response);
    }
  } catch (error) {
    console.log(error)
    console.log("AUTH", "login", "login-failed")
    let defaultMessage = 'Login Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}



/*
 * Signup Saga with user info 
 */
export function* postSignup(action) {

  console.log(action, "SAGA postSignup");
  let requestURL = API_ENDPOINTS.signup;

  const data = dataUrlEncoded(action.payload)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  console.log("")
  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postSignup After Yield Response");

    if (response) {
      yield put(authActions.sigupSuccess(response, options.method));
      action.onSuccess(response);
    }
  } catch (error) {
    console.log(error)
    console.log("AUTH", "signup", "signup-failed")
    let defaultMessage = 'Signup Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}


/*
 * Customer data Saga for user info 
 */
export function* postCustomerData(action) {

  console.log(action, "SAGA postCustomerData");
  let requestURL = API_ENDPOINTS.customerData;

  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'GET';
  options.url = requestURL;
  console.log("")
  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postCustomerData After Yield Response");

    if (response) {
      yield put(authActions.saveUser(response.data.result.customer, options.method));
      action.onSuccess(response);
    }
  } catch (error) {
    console.log(error)
    console.log("AUTH", "CustomerData", "CustomerData-failed")
    let defaultMessage = 'CustomerData Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}


/*
 * Logout Saga
 */
export function* postLogout(action) {

  console.log(action, "SAGA postLogout");
  let requestURL = API_ENDPOINTS.logoff;

  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'POST';
  options.url = requestURL;
  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postLogout After Yield Response");
    yield put(authActions.logoutSuccess(response, options.method));
    action.onSuccess(response);
  } catch (error) {
    console.log(error)
    yield put(authActions.logoutSuccess(error, options.method));
    action.onError(error);
  }
}



export function* saga() {
  yield takeLatest(actionTypes.LoginToken, postLoginToken);
  yield takeLatest(actionTypes.Login, postLogin);
  yield takeLatest(actionTypes.LoginTokenSession, postLoginTokenSession);
  yield takeLatest(actionTypes.Signup, postSignup);
  yield takeLatest(actionTypes.CustomerData, postCustomerData);

  yield takeLatest(actionTypes.Logout, postLogout);
}


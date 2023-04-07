import { put, call, takeLatest } from "redux-saga/effects";
import { requestPromise, createHeaders, createHeadersWithAuth } from '../../util/request';
import { API_ENDPOINTS } from "../../util/constants";
import { dataUrlEncoded } from "../../util/request";
import { actionTypes } from './actionTypes'

//ACTIONS
export const checkoutActions = {
  basketDetail: (payload, onSuccess, onError) => {
    console.log("basketDetail action::")
    return { type: actionTypes.BasketDetail, payload, onSuccess, onError }
  },
  basketOrder: (payload, onSuccess, onError) => {
    console.log("basketOrder action::")
    return { type: actionTypes.BasketOrder, payload, onSuccess, onError }
  },
  paymentTransaction: (payload, onSuccess, onError) => {
    console.log("paymentTransaction action::")
    return { type: actionTypes.PaymentTransaction, payload, onSuccess, onError }
  },
  paymentTransactionSuccess: (payload, onSuccess, onError) => {
    console.log("paymentTransactionSuccess action::")
    return { type: actionTypes.PaymentTransactionSuccess, payload, onSuccess, onError }
  },
  dhlPickUpList: (payload, onSuccess, onError) => {
    console.log("dhlpickup action::")
    return { type: actionTypes.dhlPickupType, payload, onSuccess, onError }
  },
}




//SAGA FUNCTION

/*
 * Basket detail
 */
export function* postBasketDetail(action) {

  console.log(action, "SAGA postBasketDetail");

  let requestURL = API_ENDPOINTS.basketDetail

  const data = dataUrlEncoded(action.payload.params)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postBasketDetail After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result, action.payload.params);
    }

  } catch (error) {
    console.log("postBasketDetail", error)
    let defaultMessage = 'postBasketDetail Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

/*
 * Basket order
 */
export function* postBasketOrder(action) {

  console.log(action, "SAGA postBasketOrder");

  let requestURL = API_ENDPOINTS.basketOrder

  const data = dataUrlEncoded(action.payload.params)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postBasketOrder After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("postBasketOrder", error)
    let defaultMessage = 'postBasketOrder Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

/*
 * Payment Transaction
 */
export function* postPaymentTransaction(action) {

  console.log(action, "SAGA postPaymentTransaction");

  let requestURL = API_ENDPOINTS.paymentTransaction

  const data = dataUrlEncoded(action.payload.params)

  console.log(data);
  var options = {
    method: 'POST',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postPaymentTransaction After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("postPaymentTransaction", error)
    let defaultMessage = 'postPaymentTransaction Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

//Payment result
export function* paymentTransactionResult(action) {

  console.log(action, "SAGA postPaymentTransaction");

  let requestURL = API_ENDPOINTS.paymentTransaction

  const data = dataUrlEncoded(action.payload.params)

  console.log(data);
  var options = {
    method: 'PATCH',
    headers: createHeadersWithAuth(),
    data,
    url: requestURL,
  };

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postPaymentTransaction After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("postPaymentTransaction", error)
    let defaultMessage = 'postPaymentTransaction Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}
//DHL pickup list
export function* dhlPichupListAction(action) {

  console.log(action, "SAGA dhlPichupListAction");

  let requestURL = API_ENDPOINTS.dhlPickup.replace("<ARTICLE_ID>", action.payload.id).replace("<COUNTRY_CODE>", action.payload.country_id);

  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {

    const response = yield call(requestPromise, options);
    console.log(response, "SAGA dhlPichupListAction After Yield Response");
    if (response && response.status === 200) {
      action.onSuccess(response);
    }

  } catch (error) {
    console.log("All category", "All category", "All category-failed")
    let defaultMessage = 'All category Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}
export function* saga() {
  yield takeLatest(actionTypes.BasketDetail, postBasketDetail);
  yield takeLatest(actionTypes.BasketOrder, postBasketOrder);
  yield takeLatest(actionTypes.PaymentTransaction, postPaymentTransaction);
  yield takeLatest(actionTypes.PaymentTransactionSuccess, paymentTransactionResult);
  yield takeLatest(actionTypes.dhlPickupType, dhlPichupListAction);
}


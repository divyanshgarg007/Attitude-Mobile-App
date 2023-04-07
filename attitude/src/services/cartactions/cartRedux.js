import { put, call, takeLatest } from "redux-saga/effects";
import { requestPromise, createHeaders, createHeadersWithAuth } from '../../util/request';
import { API_ENDPOINTS } from "../../util/constants";
import { dataUrlEncoded } from "../../util/request";
import { actionTypes } from './actionTypes'


//ACTIONS

export const cartActions = {
  addArticleToCart: (payload, onSuccess, onError) => ({
    type: actionTypes.AddArticleToCart, payload, onSuccess, onError
  }),

  cartArticles: (payload, onSuccess, onError) => ({
    type: actionTypes.CartArticles, payload, onSuccess, onError
  }),
  cartArticlesSuccess: (payload, onSuccess, onError) => ({
    type: actionTypes.CartArticlesSuccess, payload, onSuccess, onError
  }),
  removeCartArticle: (payload, onSuccess, onError) => ({
    type: actionTypes.RemoveArticleFromCart, payload, onSuccess, onError
  }),
  updateCartArticle: (payload, onSuccess, onError) => ({
    type: actionTypes.UpdateArticleFromCart, payload, onSuccess, onError
  }),
};


//SAGA FUNCTION

/*
 * Add article to cart
 */
export function* postAddArticleToCart(action) {

  console.log(action, "SAGA postAddArticleToCart");

  let requestURL = API_ENDPOINTS.articleCart

  const data = dataUrlEncoded(action.payload)

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
    console.log(response, "SAGA postAddArticleToCart After Yield Response");

    if (response && response.status === 200) {
      yield put(cartActions.cartArticles(response));
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("Add Article To Cart", error)
    let defaultMessage = 'Add Article To Cart Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}


export function* postCartArticles(action) {

  console.log(action, "SAGA postCartArticles");

  let requestURL = API_ENDPOINTS.articleCart


  console.log(requestURL)
  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'GET';

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postFavArticles After Yield Response");

    if (response && response.status === 200) {
      yield put(cartActions.cartArticlesSuccess(response.data.result));
      if (action?.onSuccess) {
        action?.onSuccess(response.data.result);
      }
    }

  } catch (error) {
    console.log("CartArticles", "CartArticles", "CartArticles-failed", error)
    let defaultMessage = 'CartArticles Failure.'
    if (error && error.response && error.response.status) {
      action?.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action?.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

/*
 * Remove article to cart
 */
export function* postRemoveCartArticle(action) {

  console.log(action, "SAGA postRemoveCartArticle");

  let requestURL = API_ENDPOINTS.removeArticleCart.replace("<ARTICLE_ID>", action.payload.id)

  console.log(requestURL)
  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'DELETE';

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postRemoveCartArticle After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("Remove Article To Cart", error)
    let defaultMessage = 'Remove Article To Cart Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

/*
 * Update article to cart
 */
export function* postUpdateCartArticle(action) {

  console.log(action, "SAGA postUpdateCartArticle");

  let requestURL = API_ENDPOINTS.updateCart

  const data = dataUrlEncoded(action.payload)

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
    console.log(response, "SAGA postUpdateCartArticle After Yield Response");

    if (response && response.status === 200) {
      yield put(cartActions.cartArticles(response));
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("UPDATE Article To Cart", error)
    let defaultMessage = 'UPDATE Article To Cart Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}





export function* saga() {
  yield takeLatest(actionTypes.AddArticleToCart, postAddArticleToCart);
  yield takeLatest(actionTypes.CartArticles, postCartArticles);
  yield takeLatest(actionTypes.RemoveArticleFromCart, postRemoveCartArticle);
  yield takeLatest(actionTypes.UpdateArticleFromCart, postUpdateCartArticle);
}


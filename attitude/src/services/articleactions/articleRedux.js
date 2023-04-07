
import { put, call, takeLatest } from "redux-saga/effects";
import { requestPromise, createHeaders, createHeadersWithAuth, dataUrlEncoded, createQueryString } from '../../util/request';
import { API_ENDPOINTS } from "../../util/constants";
import { actionTypes } from "./actionTypes";


//ACTIONS

export const articleActions = {
  getCategory: (payload, onSuccess, onError) => ({
    type: actionTypes.allCategory, payload, onSuccess, onError
  }),
  getCategorySuccess: (payload, onSuccess, onError) => ({
    type: actionTypes.allCategorySuccess, payload, onSuccess, onError
  }),


  addToBag: (payload, onSuccess, onError) => ({
    type: actionTypes.addToBag, payload, onSuccess, onError
  }),
  addToBagSuccess: (payload) => ({
    type: actionTypes.addToBagSuccess, payload
  }),

  getJustDropped: (payload, onSuccess, onError) => ({
    type: actionTypes.justDropped, payload, onSuccess, onError
  }),
  getJustDroppedSuccess: (payload, onSuccess, onError) => ({
    type: actionTypes.justDroppedSuccess, payload, onSuccess, onError
  }),


  getMostWanted: (payload, onSuccess, onError) => ({
    type: actionTypes.mostWanted, payload, onSuccess, onError
  }),
  getMostWantedSuccess: (payload, onSuccess, onError) => ({
    type: actionTypes.mostWantedSuccess, payload, onSuccess, onError
  }),

  getCategoryProduct: (payload, onSuccess, onError) => ({
    type: actionTypes.categoryItem, payload, onSuccess, onError
  }),
  bandsCategory: (onSuccess, onError) => ({
    type: actionTypes.bandsList, onSuccess, onError
  }),
  brandsArticles: (payload, onSuccess, onError) => ({
    type: actionTypes.brandArticles, payload, onSuccess, onError
  }),
  getSearchItems: (payload, onSuccess, onError) => ({
    type: actionTypes.searchItems, payload, onSuccess, onError
  }),


  getArticleDetail: (payload, onSuccess, onError) => ({
    type: actionTypes.articleDetail, payload, onSuccess, onError
  }),
  articleDetailSuccess: (payload, onSuccess, onError) => ({
    type: actionTypes.articleDetailSuccess, payload, onSuccess, onError
  }),
  resetArticleDetail: () => ({ type: actionTypes.resetArticleDetail }),

  setSortFilter: (payload, onSuccess, onError) => ({
    type: actionTypes.sortFilter, payload, onSuccess, onError
  }),

  sortFilterSuccess: (payload, onSuccess, onError) => ({
    type: actionTypes.sortFilterSuccess, payload, onSuccess, onError
  }),

  articleFav: (payload, onSuccess, onError) => ({
    type: actionTypes.articleFav, payload, onSuccess, onError
  }),
  articleUnFav: (payload, onSuccess, onError) => ({
    type: actionTypes.articleUnFav, payload, onSuccess, onError
  }),

  favArticles: (payload, onSuccess, onError) => ({
    type: actionTypes.favArticles, payload, onSuccess, onError
  }),
  favArticlesSuccess: (payload) => ({
    type: actionTypes.favArticlesSuccess, payload
  }),

  articleAddRecent: (payload) => ({ type: actionTypes.articleAddRecent, payload }),
  articleAddRecentDelete: (payload) => ({ type: actionTypes.articleAddRecentDelete, payload }),
  recentSearch: (payload) => ({
    type: actionTypes.recentSearch, payload
  }),
};


//SAGA FUNCTION

/*
 * Feed Saga
 */

export function* postGetCategory(action) {

  console.log(action, "SAGA postGetCategory");

  let requestURL = API_ENDPOINTS.allCategory;

  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {

    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetCategory After Yield Response");

    if (response && response.status === 200) {
      yield put(articleActions.getCategorySuccess(response, options.method));
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


export function* postAddToBag(action) {

  console.log(action, "SAGA addToBag");

  yield put(articleActions.addToBagSuccess(true));
}

export function* postSetSortFilter(action) {

  console.log(action, "SAGA postSetSortFilter");

  yield put(articleActions.sortFilterSuccess(action.payload));
}

export function* postGetJustDropped(action) {

  console.log(action, "SAGA postGetJustDropped");

  let requestURL = API_ENDPOINTS.justDropped;

  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {
    // const { email, password } = action.payload;
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetJustDropped After Yield Response");

    //if login success then fetch user details and then forward to login success
    if (response && response.status === 200) {
      yield put(articleActions.getJustDroppedSuccess(response, options.method));
    }

    if (response) {
      action.onSuccess(response);
    }

  } catch (error) {
    console.log("JustDropped", "JustDropped", "JustDropped-failed")
    let defaultMessage = 'JustDropped Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postGetMostWanted(action) {

  console.log(action, "SAGA postGetMostWanted");

  //yield put(actions.userLoginStarted(true));
  let requestURL = API_ENDPOINTS.mostWanted;

  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {
    // const { email, password } = action.payload;
    const response = yield call(requestPromise, options);
    console.log("SAGA postGetMostWanted After Yield Response", response);

    //if login success then fetch user details and then forward to login success
    if (response && response.status === 200) {
      yield put(articleActions.getMostWantedSuccess(response, options.method));
    }

  } catch (error) {
    console.log("MostWanted", "MostWanted", "MostWanted-failed", error)
  }
}

export function* postGetCategoryItem(action) {

  console.log(action, "SAGA postGetCategoryItem");

  let requestURL = API_ENDPOINTS.articles.replace("<CAT_ID>", action.payload.id);
  if (action.payload.filter) {
    requestURL = requestURL + "&" + action.payload.filter
  } else {
    requestURL = `${requestURL}&sort=dshow|desc`
  }

  console.log('requestURL', requestURL)
  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';

  // if (action.payload.params) {
  //   options.params = action.payload.params
  // }

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetCategoryItem After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("CategoryItem", "CategoryItem", "CategoryItem-failed")
    let defaultMessage = 'CategoryItem Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postGetArticleDetail(action) {
  console.log(action, "SAGA postGetArticleDetail");

  let requestURL = API_ENDPOINTS.articleDetail.replace("<ARTICLE_ID>", action.payload.id);

  console.log(requestURL)
  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';
  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetArticleDetail After Yield Response");

    if (response && response.status === 200) {
      if (!action.payload?.from) {
        yield put(articleActions.articleDetailSuccess(response.data.result));
      }

      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("ArticleDetail", "ArticleDetail", "ArticleDetail-failed")
    let defaultMessage = 'ArticleDetail Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postGetSearchItem(action) {

  console.log(action, "SAGA postGetSearchItem");

  let requestURL = API_ENDPOINTS.searchItems.replace("<QUERY>", action.payload.query);


  console.log(requestURL)
  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';

  if (action.payload.params) {
    options.params = action.payload.params
  }

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postGetSearchItem After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("SearchItem", "SearchItem", "SearchItem-failed")
    let defaultMessage = 'SearchItem Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postArticleFav(action) {

  console.log(action, "SAGA postArticleFav");

  let requestURL = API_ENDPOINTS.articleFav

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
    console.log(response, "SAGA postArticleFav After Yield Response");

    if (response && response.status === 200) {
      yield put(articleActions.favArticles(response));
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("ArticleFav")
    let defaultMessage = 'Article Favorite Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postArticleUnFav(action) {

  console.log(action, "SAGA postArticleUnFav");

  let requestURL = API_ENDPOINTS.articleUnFav.replace("<ARTICLE_ID>", action.payload.id)

  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'DELETE';
  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postArticleUnFav After Yield Response");

    if (response && response.status === 200) {
      yield put(articleActions.favArticles(response));
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("ArticleFav: ", error)
    let defaultMessage = 'Article UN Favorite Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postFavArticles(action) {

  console.log(action, "SAGA postFavArticles");

  let requestURL = API_ENDPOINTS.articleFav


  console.log(requestURL)
  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postFavArticles After Yield Response");

    if (response && response.status === 200) {
      yield put(articleActions.favArticlesSuccess(response));
      if (action?.onSuccess) {
        action?.onSuccess(response.data.result);
      }
    }

  } catch (error) {
    console.log("FavArticles", "FavArticles", "FavArticles-failed")
    let defaultMessage = 'FavArticles Failure.'
    if (error && error.response && error.response.status) {
      action?.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action?.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postArticleAddRecent(action) {

  console.log(action, "SAGA postArticleAddRecent");

  let requestURL = API_ENDPOINTS.articleFav

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
    console.log(response, "SAGA postArticleFav After Yield Response");

    if (response && response.status === 200) {
      yield put(articleActions.favArticles(response));
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("ArticleFav")
    let defaultMessage = 'Article Favorite Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}
export function* bandsCategoryList(action) {

  console.log(action, "SAGA bandsCategoryList");

  let requestURL = API_ENDPOINTS.bands;

  console.log(requestURL)
  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';

  // if (action.payload.params) {
  //   options.params = action.payload.params
  // }

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA bandsCategoryList After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("CategoryItem", "CategoryItem", "CategoryItem-failed")
    let defaultMessage = 'CategoryItem Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });


    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* postBrandArticles(action) {

  console.log(action, "SAGA postBrandArticles");

  let requestURL = API_ENDPOINTS.brandArticles + "?" + createQueryString(action.payload)


  console.log(requestURL)
  let options = {};
  options.headers = createHeaders();
  options.method = 'GET';

  if (action.payload) {
    //options.params = action.payload
  }

  options.url = requestURL;

  try {
    const response = yield call(requestPromise, options);
    console.log(response, "SAGA postBrandArticles After Yield Response");

    if (response && response.status === 200) {
      action.onSuccess(response.data.result);
    }

  } catch (error) {
    console.log("BrandArticles", "BrandArticles", "BrandArticles-failed")
    let defaultMessage = 'BrandArticles Failure.'
    if (error && error.response && error.response.status) {
      action.onError({ status: error.response.status, message: defaultMessage, log: error });
    } else {
      action.onError({ status: 500, message: defaultMessage, log: error });
    }
  }
}

export function* saga() {
  yield takeLatest(actionTypes.allCategory, postGetCategory);
  yield takeLatest(actionTypes.addToBag, postAddToBag);
  yield takeLatest(actionTypes.sortFilter, postSetSortFilter);
  yield takeLatest(actionTypes.justDropped, postGetJustDropped);
  yield takeLatest(actionTypes.mostWanted, postGetMostWanted);
  yield takeLatest(actionTypes.categoryItem, postGetCategoryItem);
  yield takeLatest(actionTypes.searchItems, postGetSearchItem);

  yield takeLatest(actionTypes.articleDetail, postGetArticleDetail);

  yield takeLatest(actionTypes.articleFav, postArticleFav);
  yield takeLatest(actionTypes.articleUnFav, postArticleUnFav);
  yield takeLatest(actionTypes.favArticles, postFavArticles);
  yield takeLatest(actionTypes.bandsList, bandsCategoryList);
  yield takeLatest(actionTypes.brandArticles, postBrandArticles);
}


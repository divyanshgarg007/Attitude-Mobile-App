
// import { put, call, takeLatest } from "redux-saga/effects";
// import { requestPromise, createHeaders, createHeadersWithAuth } from '../../util/request';
// import { API_ENDPOINTS } from "../../util/constants"
// import { Tracker } from '../../util/analytics';
// import { actionTypes } from './profileReducer'


// //ACTIONS

// export const actions = {
//   userProfile: (payload, onSuccess, onError) => ({ type: actionTypes.UserProfile, payload, onSuccess, onError }),
//   userProfileSuccess: (payload) => ({ type: "ProfileSuccess", payload }),
// };


// //SAGA FUNCTION

// /*
//  * Search Saga
//  */
// export function* postUserProfile(action) {

//   console.log(action, "SAGA postUserProfile");

//   //yield put(actions.userLoginStarted(true));
//   let requestURL = API_ENDPOINTS.userProfile.replace('<USER_ID>', action.payload.customer.id);

//   let options = {};
//   options.headers = createHeadersWithAuth();

//   options.method = 'PUT';
//   options.data = action.payload;
//   options.url = requestURL;

//   try {
//     const response = yield call(requestPromise, options);
//     console.log(response, "SAGA postUserProfile After Yield Response");

//     if (response && response.status === 200) {
//       yield put(actions.userProfileSuccess(response, options.method));
//     }

//     if (response && action.onSuccess) {
//       action.onSuccess(response);
//     }

//   } catch (error) {
//     console.log("USERPROFILE", "UserProfile", "UserProfile-failed")
//     let defaultMessage = 'UserProfile Failure.'
//     if (error && error.response && error.response.status) {
//       action.onError({ status: error.response.status, message: defaultMessage, log: error });
//     } else {
//       action.onError({ status: 500, message: defaultMessage, log: error });
//     }
//   }
// }

// export function* saga() {
//   yield takeLatest(actionTypes.UserProfile, postUserProfile);
// }


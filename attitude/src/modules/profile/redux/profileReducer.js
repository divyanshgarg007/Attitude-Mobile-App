// import { all } from "redux-saga/effects";
// import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";

// import { Tracker } from "../../util/analytics";

// export const actionTypes = {
//   UserProfileLoading: "UserProfileLoading",
//   UserProfile: "UserProfile",
//   UserProfileSuccess: "UserProfileSuccess",
// };


// export const CONSTANTS = {
//   OTP_STATE_NONE: undefined,
//   OTP_STATE_VERIFY: 100,
//   OTP_STATE_VERIFIED: 200,
//   OTP_STATE_VERIFY_INCORRECT: 400,
//   STATE_STARTED: 100,
//   STATE_SUCCESS: 200,
//   STATE_ERROR: 400,
//   STATE_ERROR_CRITICAL: 500,
// }

// const initialAuthState = {
//   data: null
// };

// //REDUCER

// export const getKeyName = () => {
//   return process.env.REACT_APP_VERSION + "-module-auth";
// }

// export const profileReducer = persistReducer(
//   {
//     storage, key: getKeyName(), whitelist: ["user", "access_token"
//       , "lastaccess_tokenRefreshedTime", "profile",
//       "plans", "role",
//       , "status_color"]
//   },
//   (state = initialAuthState, action) => {

//     switch (action.type) {
//       case actionTypes.UserProfileSuccess: {
//         console.log('UserProfileSuccess-1')

//         if (action.payload && action.payload.status === 200) {
//           const newState = {

//             ...state, user: action.payload.data.user,
//             access_token: action.payload.data.user.access_token,
//             login_state: CONSTANTS.STATE_SUCCESS
//           };
//           console.log("[USERPROFILE][ACCT] UserProfileSuccess:", newState)

//           const user = action.payload.data.user
//           console.log_v2("USERPROFILE", "userprofile", "UserProfile success", "user-profile-success"
//             , { 'user': user })

//           return newState

//         }
//       }

//       default:
//         return state;
//     }
//   }
// );
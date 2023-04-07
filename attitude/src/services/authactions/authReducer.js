
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from "./actionTypes";


const initialState = {
  user: undefined,
  loginToken: undefined,
  customer: undefined
};

//REDUCER

export const getKeyName = () => {
  return "v1.0" + "-module-auth";
}

export const authReducer = persistReducer(
  {
    storage: AsyncStorage,
    key: getKeyName(),
    whitelist: ["loginToken", "user", "customer"]
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.LoginTokenSuccess: {
        if (action.payload && action.payload.status === 200) {
          const newState = {
            ...state,
            customer: action.payload.data.result,
            loginToken: action.payload.data.result.token,
          };
          console.log("[USER][ACCT] LoginSuccess:", newState)

          const user = action.payload.data
          console.log("AUTH", "login", "Login success", "user-login-success"
            , { 'user': user })

          return newState
        }
        return { ...state, user: null, access_token: null };
      }

      case actionTypes.SignupSuccess: {
        if (action.payload && action.payload.status === 200) {
          const newState = {
            ...state,
            user: action.payload.data.result,
          };
          console.log("[USER][ACCT] Signup Success:", newState)

          const user = action.payload.data
          console.log("AUTH", "signup", "signup success", "user-signup-success"
            , { 'user': user })

          return newState
        }
        return { ...state, user: null, };
      }

      case actionTypes.SaveUser: {
        if (action.payload) {
          const newState = {
            ...state,
            user: action.payload,
          };
          console.log("[USER][ACCT] Signup Success:", newState)

          const user = action.payload.data
          console.log("AUTH", "signup", "signup success", "user-signup-success"
            , { 'user': user })

          return newState
        }
        return { ...state, user: null, };
      }

      case actionTypes.LogoutSuccess: {

        console.log(action.type, " Auth clearing state...")

        console.log("[BP][UD][LOGOUT][ALL]", initialState)
        return initialState;
      }

      default:
        return state;
    }
  })

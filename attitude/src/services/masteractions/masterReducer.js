
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from "./actionTypes";


export const CONSTANTS = {
}

const initialState = {
  API_TOKEN: undefined,
  lastAPI_TokenRefreshedTime: undefined
};

//REDUCER

export const getKeyName = () => {
  return 'v1.0' + "-module-master";
}

//export const masterReducer = (state = initialState, action) => {
export const masterReducer = persistReducer(
  {
    storage: AsyncStorage,
    key: getKeyName(),
    whitelist: ["API_TOKEN"]
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GetTokenSuccess: {

        if (action.payload && action.payload.status === 200) {
          const newState = {
            ...state, API_TOKEN: action.payload.data.result.token,
            // lastAPI_TokenRefreshedTime: action.payload.data.time,
          };
          console.log("TOKEN REFRESHED:", newState)

          return newState
        }
        return { ...state };
      }

      default:
        return state;
    }
  })

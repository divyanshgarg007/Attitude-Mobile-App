
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from "./actionTypes";

const initialState = {
  homeContents: undefined,
};

//REDUCER
export const getKeyName = () => {
  return 'v1.0' + "-home-master";
}

export const homeReducer = persistReducer(
  {
    storage: AsyncStorage,
    key: getKeyName(),
    whitelist: ["homeContents"]
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.HomeContentSuccess: {
        if (action.payload && action.payload.status === 200) {
          const newState = {
            ...state, homeContents: action.payload.data,
          };
          console.log("CONTENT:", newState)

          return newState
        }
        return { ...state };
      }

      default:
        return state;
    }
  })

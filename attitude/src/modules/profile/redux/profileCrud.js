import axios from "axios";

import { API_ENDPOINTS } from "../../util/constants"
export const USER_PROFILE_URL = API_ENDPOINTS.userProfile;

export function userProfile(data) {

  console.log("USER_PROFILE_URL..." + USER_PROFILE_URL)
  return axios.put(USER_PROFILE_URL, { data });
}

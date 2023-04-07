/* eslint-disable prettier/prettier */
import store, {persistor} from '../redux/store';
import axios from 'axios';

/**
 * Parses the JSON returned by a network request
 *
 * @param {object} response A response from a network request
 *
 * @return {object} The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param {object} response A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status <= 400) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param {string} url The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 *
 * @return {object} The response data
 */
export default function request(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

export function createQueryString(queryParams) {
  // console.log("queryParams :", queryParams)
  const keyValuePairs = [];

  for (const key in queryParams) {
    // console.log("Loop queryParams :", key, queryParams[key])
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]),
    );
  }
  return keyValuePairs.join('&');
  // return JSON.stringify(queryParams);
}

export function createHeadersWithAuth() {
  const {
    master: {API_TOKEN},
  } = store.getState();
  // console.log(store.getState(), "createHeadersWithAuth+++");
  console.log(API_TOKEN, 'createHeadersWithAuth+++');
  return {
    'X-API-Key': 'iEQftwOK0HenqV0l',
    //'Content-Type': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ' + API_TOKEN,
  };
}

export function createHeaders() {
  return {
    'X-API-Key': 'iEQftwOK0HenqV0l',
    'Content-Type': 'application/json',
  };
}

export async function requestPromise(options) {
  try {
    console.log('RQ::options', options);
    const response = await axios.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export function dataUrlEncoded(params) {
  const data = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  console.log(data);
  return data;
}

export async function requestPromisedd(url, options) {
  try {
    const response = await fetch(url, options)
      .then(checkStatus)
      .then(parseJSON);
    return response;
  } catch (error) {
    throw error;
  }
}

// export default function setupAxios(axios, store) {
//     axios.interceptors.request.use(
//       config => {
//         const {
//           auth: { authToken }
//         } = store.getState();

//         if (authToken) {
//           config.headers.Authorization = `Bearer ${authToken}`;
//         }

//         return config;
//       },
//       err => Promise.reject(err)
//     );
//   }

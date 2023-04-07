
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const { master: { API_TOKEN } } = store.getState();
      console.log("MASTER ::", API_TOKEN)
      if (API_TOKEN) {
        config.headers.Authorization = `Bearer ${API_TOKEN}`;
        config.headers['Content-Type'] = 'application/json';
        //config.headers.jwtAuthorization= access_token;
        //config.headers['Access-Control-Allow-Methods']= 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }

      return config;
    },
    err => Promise.reject(err)
  );

  const { dispatch } = store; // direct access to redux store.
  ///
  // Add a 401 response interceptor

  /** 
axios.interceptors.response.use(function (response) {
  //dispatch({type:"[Auth] Logout Action"});
  return response;
}, function (error) {
  if (error && error.response && 401 === error.response.status && isLoggedIn()) {
    console.log("[401] error detcted... force logout.")
    dispatch({type:"[Auth] Logout Action"});
      
  } else {
      return Promise.reject(error);
  }
});**/
}

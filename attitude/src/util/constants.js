export const APP_VERSION = '0.80+'
//export const API_ENDPOINT_BASE_URL = "https://attitude.local.ibvision.nl";
export const API_ENDPOINT_BASE_URL = "https://app.attitudeholland.nl"

export const APP_ENV_MOCK = 'mock'
export const APP_ENV_PROD = 'prod'
export const APP_ENV = APP_ENV_MOCK

export const API_ENDPOINTS = {
  base_url: API_ENDPOINT_BASE_URL,

  token: API_ENDPOINT_BASE_URL + "/api/v1/token",
  sessionLanguage: API_ENDPOINT_BASE_URL + "/api/v1/language",
  loginToken: API_ENDPOINT_BASE_URL + "/api/v1/customer/getlogintoken",
  login: API_ENDPOINT_BASE_URL + "/api/v1/customer/login",
  signup: API_ENDPOINT_BASE_URL + "/api/v1/customer",
  customerData: API_ENDPOINT_BASE_URL + "/api/v1/customer/data",
  logoff: API_ENDPOINT_BASE_URL + "/api/v1/customer/logoff",

  homeContent: API_ENDPOINT_BASE_URL + "/api/v1/content",
  justDropped: API_ENDPOINT_BASE_URL + "/api/v1/articles/justdropped",
  mostWanted: API_ENDPOINT_BASE_URL + "/api/v1/articles/mostwanted",

  allCategory: API_ENDPOINT_BASE_URL + "/api/v1/webgroups",
  articles: API_ENDPOINT_BASE_URL + "/api/v1/articles/?webgroupfilter=<CAT_ID>&includesubgroups=true",
  brandArticles: API_ENDPOINT_BASE_URL + "/api/v1/articles",
  articleDetail: API_ENDPOINT_BASE_URL + "/api/v1/article/<ARTICLE_ID>",
  searchItems: API_ENDPOINT_BASE_URL + "/api/v1/articles/?Search=<QUERY>&searchmode=FUZZYAND&sort=relevance",

  articleFav: API_ENDPOINT_BASE_URL + "/api/v1/customer/favorites",
  articleUnFav: API_ENDPOINT_BASE_URL + "/api/v1/customer/favorites/<ARTICLE_ID>",

  articleCart: API_ENDPOINT_BASE_URL + "/api/v1/basket",
  removeArticleCart: API_ENDPOINT_BASE_URL + "/api/v1/basket/<ARTICLE_ID>",
  updateCart: API_ENDPOINT_BASE_URL + "/api/v1/basket",

  basketDetail: API_ENDPOINT_BASE_URL + "/api/v1/basket/details",
  basketOrder: API_ENDPOINT_BASE_URL + "/api/v1/basket/order",

  paymentTransaction: API_ENDPOINT_BASE_URL + "/api/v1/paymenttransaction",

  sale: API_ENDPOINT_BASE_URL + "/api/v1/articles/?webgroupfilter=1476&includesubgroups=true&start=0&count=10&Sale=Uitverkoop",

  bands: API_ENDPOINT_BASE_URL + '/api/v1/artprops',

  dhlPickup: 'https://api-gw.dhlparcel.nl/parcel-shop-locations/<COUNTRY_CODE>?postalCode=<ARTICLE_ID>&showUnavailable=false'
}

export const API_CONSTANTS = {

}


export const API_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\
                               MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBPNh150iqmU58BIPZcFNTmfTg\
                               TLKz0UttceY4HcrwemFAJ3tEog5ohjXxAhj/1fjhzBob7SmG1gsDMbog+VSJwni/\
                               onmqutz7mqrv7NZno6ctdBGwQ3BBmPqzZ6trJvwE8pihimTUqglqRciGd9A4G9ee\
                               dQGgP5coi4RN3ubMkwIDAQAB\
                               -----END PUBLIC KEY-----";


export const API_AWS_KEY = ""
export const GOOGLE_APP_ID = ""
export const FACEBOOK_APP_ID = ""


export const IMAGE_PREFIX = "https://cdn.attitudeholland.nl/_clientfiles/King/";
export const HOME_CONTENT_IMG = "https://www.attitudeholland.nl/_clientfiles/"

export const APP_CONSTANT = {
  FORUM_URL: "https://www.attitudeholland.nl/attitudeevents/",
  RETURN_FAQ: "https://www.attitudeholland.nl/klantenservice/retourneren/",
  CONTACT: "https://www.attitudeholland.nl/klantenservice/contact/",
  RETURN_HOW: "https://www.attitudeholland.nl/help/waar-gaat-je-vraag-over/retourneren/"
}

export const FILTER_TYPES = {
  'dates_filter': 'dates_filter',

}
/**
 * Last 30 minutes
Last 1 Hour
Current Week
Last 7 Days
Current Month
Last Month
Custom Date
 */
export const DATE_SETTINGS = {
  filters: {
    'last_30_minutes': { code: 'last_30_minutes' },
    'last_1_hour': { code: 'last_1_hour' },
    'current_week': { code: 'current_week' },
    'last_7_days': { code: 'last_7_days' },
    'current_month': { code: 'current_month' },
    'last_month': { code: 'last_month' },
    'custom_date': { code: 'custom_date' },
    'today': { code: 'today' },
    'yesterday': { code: 'yesterday' },
  }
}

export const COUNTRY_DELIVERY_DAYS = {
  GERMANY_HIGH: 1,
  GERMANY_LOW: 4,
  BELGIUM_HIGH: 1,
  BELGIUM_LOW: 3,
  NETHERLANDS_HIGH: 1,
  NETHERLANDS_LOW: 2
}

export const DAY_COUNT_MAP = {
  "meerdan10dagen": 15,
  "Binnen10dagen": 10,
  "5dagen": 5,

  "Pre-order": 20
}

//API Version
export const REACT_APP_API_VERSION = "2";

export const API_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"
export const DISPLAY_DATE_FORMAT = "YYYY-MM-DD HH:mm"
export const DISPLAY_DATE_FORMAT_2 = "DD MMM YYYY, HH:mm:ss A"
export const DISPLAY_DATE_FORMAT_3 = "DD MMM YYYY"
export const DISPLAY_DATE_FORMAT_4 = "DD MMM YYYY HH:mm"

// export const REACT_APP_MOCK_DATA_ENABLED = process.env.REACT_APP_MOCK_DATA_ENABLED;
export const REACT_APP_MOCK_DATA_ENABLED = false;

export const FORUM_URL = "https://www.attitudeholland.nl/attitudeevents"
export const RETURN_FAQ = "https://www.attitudeholland.nl/klantenservice/retourneren/"
export const CONTACT = "https://www.attitudeholland.nl/klantenservice/contact/"
export const RETURN_HOW = "https://www.attitudeholland.nl/help/waar-gaat-je-vraag-over/retourneren/"

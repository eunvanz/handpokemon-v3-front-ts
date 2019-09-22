let isProd = process.env.NODE_ENV === 'production';
let isDev = process.env.NODE_ENV === 'development';

const PROD_API_BASE_URL =
  'http://handpokemon.ap-northeast-2.elasticbeanstalk.com';
const DEV_API_BASE_URL = 'http://127.0.0.1:9999';

// const LOCAL_API_BASE_URL = 'http://127.0.0.1:9999';
// const LOCAL_API_BASE_URL = 'http://192.168.219.102:9999';
// const LOCAL_API_BASE_URL = DEV_API_BASE_URL;
const LOCAL_API_BASE_URL = PROD_API_BASE_URL;

export const API_BASE_URL = isProd
  ? PROD_API_BASE_URL
  : isDev
  ? DEV_API_BASE_URL
  : LOCAL_API_BASE_URL;

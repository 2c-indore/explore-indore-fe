import axios from 'axios';

const rootURL = 'https://api-ssl.bitly.com/v3/shorten';
const homeUrl = 'https://preparepokhara.org/#/share/';


// params.access_token = '0d4bb4bf4e192b8c03bd7bdd75d621298ee9e5e0';


const fetchShortUrl = (enc) => {
  return axios({
    method: 'get',
    url: rootURL,
    params: { access_token: '0d4bb4bf4e192b8c03bd7bdd75d621298ee9e5e0', longUrl: homeUrl + enc },
  });
};


export default fetchShortUrl;

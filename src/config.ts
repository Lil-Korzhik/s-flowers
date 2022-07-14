const NODE_ENV: string = 'production';

const DEVELOPMENT_API_URL: string = 'http://localhost:5000/api';
const PRODUCTION_API_URL: string = 'https://s-flowers.herokuapp.com/api';

const API_URL: string = NODE_ENV == 'development' ? DEVELOPMENT_API_URL : PRODUCTION_API_URL;
const PRODUCTS_STATIC_URL: string = `${API_URL.split('api')[0]}products/`;
const PREVIEW_URL: string = `${API_URL.split('api')[0]}preview.png`;

const config =  {
    API_URL,
    PRODUCTS_STATIC_URL,
    PREVIEW_URL
}

export default config;
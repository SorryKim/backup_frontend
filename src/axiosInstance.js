import axios from 'axios';
import https from 'https-browserify';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
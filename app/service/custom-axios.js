import axios from 'axios';
import config from '../../config/index';

const customAxios = axios.create({
    baseURL: (typeof window === 'undefined') ? config.env.proxyTable['/api/'].target : '/api/',
    headers: {
        'content-type': 'application/json',
    },
    timeout: 10000,
    validateStatus: () => true,
});

export default customAxios;

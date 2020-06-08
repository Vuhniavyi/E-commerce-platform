import api from './request';

import {
    STORE,
} from 'constants/apiUrls';


export const getMyStore = () => {
    return api('get', STORE)
};

export const updateStore = (store) => {
    return api('patch', STORE, store)
};

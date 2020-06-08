import axios from 'axios';
import api from './request';

import { NOVA_POSHTA } from 'constants/apiUrls';

export const getNovaPoshtaSavedData = () => {
  return api('get', NOVA_POSHTA);
};
export const addNovaPoshtaData = data => {
  return api('put', NOVA_POSHTA, data);
};
export const updateNovaPoshtaData = data => {
  return api('patch', NOVA_POSHTA, data);
};

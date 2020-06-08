import api from './request';
import { MODULES } from 'constants/apiUrls';

export const getModules = url => {
  return api('get', MODULES);
};

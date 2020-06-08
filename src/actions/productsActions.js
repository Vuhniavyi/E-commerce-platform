import api from './request';

import {
  ALL_CATEGORIES,
  FIRST_LEVEL_CATEGORIES,
  ALL_CATEGORIES_PROM,
  FIRST_LEVEL_CATEGORIES_PROM,
  OPTIONS_BY_CATEGORY,
  OPTIONS_BY_CATEGORY_WITH_TEXT_AREA,
  CONTRACTOR_PRODUCTS,
  CONTRACTOR_CATEGORIES,
  UPLOAD_PRODUCTS,
  UPLOAD_PRODUCTS_PROM,
  DOWNLOADS_STATUS,
  NEW_PRODUCTS,
  COPY_PRODUCT,
  ALL_PRODUCTS,
  REMOVE_CONTRACTOR_PRODUCTS,
  REMOVE_PARTNER_PRODUCTS,
  COPY_TO_MY_PRODUCTS,
  PARTNER_PRODUCTS,
  PARTNER_PRODUCTS_FOR_ROZETKA,
  PARTNER_PRODUCTS_FOR_PROM,
  YML,
  DELETE_PRODUCTS_FROM_YML,
  UPDATE_PRODUCTS_ROZETKA,
  UPDATE_PRODUCTS_PROM,
  UPDATE_MASS_PRODUCTS,
} from 'constants/apiUrls';

//CATEGORIES
export const getAllCategories = () => {
  return api('get', `${ALL_CATEGORIES}`);
};
export const getFirstLevelCategories = () => {
  return api('get', `${FIRST_LEVEL_CATEGORIES}`);
};
export const getCategoriesById = id => {
  return api('get', `${ALL_CATEGORIES}${id}/children`);
};

//CATEGORIES_PROM
export const getAllCategoriesProm = () => {
  return api('get', `${ALL_CATEGORIES_PROM}`);
};
export const getFirstLevelCategoriesProm = () => {
  return api('get', `${FIRST_LEVEL_CATEGORIES_PROM}`);
};
export const getCategoriesByIdProm = id => {
  return api('get', `${ALL_CATEGORIES_PROM}${id}/children`);
};

//OPTIONS
export const getOptionsByCategory = categoryId => {
  return api('get', `${OPTIONS_BY_CATEGORY}${categoryId}`);
};
export const getOptionsByCategoryWithTextArea = categoryId => {
  return api('get', `${OPTIONS_BY_CATEGORY_WITH_TEXT_AREA}${categoryId}`);
};

//CONTRACTOR
export const getContractorProducts = url => {
  return api('get', CONTRACTOR_PRODUCTS + url);
};
export const getContractorCategories = () => {
  return api('get', CONTRACTOR_CATEGORIES);
};
export const uploadXls = file => {
  return api('post', UPLOAD_PRODUCTS, file);
};
// export const uploadXlsProm = file => {
//   return api('post', UPLOAD_PRODUCTS_PROM, file);
// };
export const getDownloadsStatus = () => {
  return api('get', DOWNLOADS_STATUS);
};
export const createNewProduct = product => {
  return api('post', NEW_PRODUCTS, product);
};
export const copyProduct = product => {
  return api('get', `${COPY_PRODUCT}${product.id}/`, product);
};
export const updateProduct = product => {
  return api('patch', `${NEW_PRODUCTS}${product.id}/`, product);
};
export const removeContractorProduct = products => {
  return api('post', `${REMOVE_CONTRACTOR_PRODUCTS}`, products);
};

//PARTNER
export const getAllProducts = (url = '') => {
  return api('get', `${ALL_PRODUCTS + url}`);
};
export const copyProducts = products => {
  return api('post', `${COPY_TO_MY_PRODUCTS}`, products);
};
export const getPartnerProducts = (url = '') => {
  return api('get', `${PARTNER_PRODUCTS + url}`);
};
export const getPartnerProductsRozetka = (url = '') => {
  return api('get', `${PARTNER_PRODUCTS_FOR_ROZETKA + url}`);
};
export const getPartnerProductsProm = (url = '') => {
  return api('get', `${PARTNER_PRODUCTS_FOR_PROM + url}`);
};
export const updatePartnerProduct = product => {
  return api('patch', `${PARTNER_PRODUCTS}${product.id}/`, product);
};
export const updateProductRozetka = product => {
  return api('patch', `${UPDATE_PRODUCTS_ROZETKA}${product.id}`, product);
};
export const updateProductProm = product => {
  return api('patch', `${UPDATE_PRODUCTS_PROM}${product.id}`, product);
};
export const updateMassProducts = products => {
  return api('patch', `${UPDATE_MASS_PRODUCTS}`, products);
};
export const removePartnerProduct = products => {
  return api('post', `${REMOVE_PARTNER_PRODUCTS}`, products);
};


// YML
export const generateYml = () => {
  return api('get', `${YML}`);
};
export const addProductsToYml = (products, type) => {
  return api('post', `${YML}`, products);
};
export const deleteProductsFromYml = (products, type) => {
  return api('post', `${DELETE_PRODUCTS_FROM_YML}`, products);
};

//Aside

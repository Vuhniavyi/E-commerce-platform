import api from './request';

import {
  ORDERS,
  ORDERS_PROM,
  CONTRACTOR_ORDERS,
  PASS_TO_CONTRACTOR,
  ORDER_SELF,
  SEND_TO_CONTRACTOR
} from 'constants/apiUrls';


export const getOrders = (url) => {
  return api('get', ORDERS + url)
};

export const createOrderSelf = (params) => {
  return api('post', ORDER_SELF, params)
};
// api/{version}/order_self/{id}/ - patch запрос для добавления ттн к заказу
export const getOrdersSelf = (url) => {
  return api('get', ORDER_SELF + url)
};

export const addTTNOrderSelf = (id, params) => {
  return api('patch', `${ORDER_SELF}${id}/`, params)
}


// export const getOrders = (url) => {
//     return api('get', url + ORDERS )
// };

export const getOrdersProm = (url) => {
  return api('get', ORDERS_PROM + url)
};


export const passToContractor = (id) => {
  return api('get', PASS_TO_CONTRACTOR(id))
};



export const getContractorOrders = (url) => {
  return api('get', CONTRACTOR_ORDERS + url)
};

export const sendToContractor = (data) => {
  return api('post', SEND_TO_CONTRACTOR, data)
};



// // PARNER
// export const getOrders = url => api('get', ORDERS + url);
export const editOrder = (id, data) => api('patch', ORDERS + `${id}/`, data);
export const editOrderProm = (id, data) => api('patch', ORDERS_PROM + `${id}/`, data);
// export const passToContractor = id => api('get', PASS_TO_CONTRACTOR(id));

// // CONTRACTOR
// export const getContractorOrders = url => api('get', CONTRACTOR_ORDERS + url);
// export const editContractorOrder = (id, data) =>
//   api('patch', CONTRACTOR_ORDERS + `${id}/`, data);

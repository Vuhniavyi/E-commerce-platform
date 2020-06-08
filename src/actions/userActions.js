import api from './request';
// import axios from 'axios'


import {
  LOGIN,
  REGISTRATION,
  CONFIRM_EMAIL,
  PROFILE,
  PASSWORD,
  RESET_PASSWORD,
  CONTACT_FORM,
  PACK_INVOICE,
  PACK_LIQPAY,
  RECHARGE_INVOICE,
  RECHARGE_LIQPAY,
  UNBALANCES,
  TRANSACTIONS_FULL,
  TRANSACTIONS_WAYFORPAY_CONTRACTOR,
  TRANSACTIONS_WAYFORPAY_CONTRACTOR_SEND,
  TRANSACTIONS_BALANCE,
  TRANSACTIONS_BALANCE_PARTNER,
  TRANSACTIONS_RECHARGE_BY_LIQPAY,
  RECHARGE_BY_INVOICE,
  GET_LANDING,
  ROZETKA_TRANSACTIONS_HISTORY,
  ROZETKA_INVOICES,
  ROZETKA_SALES_REPORTS,
  ORDERS_HISTORY,
  BASE_URL
} from 'constants/apiUrls';

export const login = user => dispatch => {
  return api('post', LOGIN, user).then(res => {
    localStorage.setItem('token', res.access);

    getProfile().then(res => {
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: res
      });
    });
  });
};

export const registration = user => {
  return api('post', REGISTRATION, user);
};

export const confirmEmail = token => {
  return api('get', CONFIRM_EMAIL + token);
};

export const getProfile = () => {
  return api('get', PROFILE);
};

export const updateProfile = user => dispatch => {
  return api('patch', PROFILE, user).then(res => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res
    });
  });
};

export const selectedCategory = category => dispatch => {
  return dispatch({
    type: 'CHANGE_CATEGORY',
    payload: category
  });
};

export const changePassword = pass => {
  return api('put', PASSWORD, pass);
};

export const resetPassword = email => {
  return api('post', RESET_PASSWORD, email);
};

export const sendContactForm = form => {
  return api('post', CONTACT_FORM, form);
};

// FINANCE GET MONEY | POST
// Продавец. Для покупки пакетов. Счёт-фактура. ИСПОЛЬЗУЕТСЯ
export const sendInvoice = pocket => {
  return api('post', PACK_INVOICE, pocket);
};
// Продавец. Для покупки пакетов. LiqPay. ИСПОЛЬЗУЕТСЯ
export const buyPackByLiqPay = pocketId => {
  return api('post', PACK_LIQPAY, pocketId);
};
// Продавец. Для вывода средств. LiqPay. ИСПОЛЬЗУЕТСЯ
export const unbalances = amount => {
  return api('post', UNBALANCES, amount);
};
// Поставщик. Для попонения баланса. Cчёт-фактура. ИСПОЛЬЗУЕТСЯ
export const rechargeInvoice = pocket => { 
  return api('post', RECHARGE_INVOICE, pocket);
};
// Поставщик. Для попонения баланса. LiqPay. ИСПОЛЬЗУЕТСЯ
export const rechargeByLiqPay = amount => {
  return api('post', RECHARGE_LIQPAY, amount);
};

// FINANCE HYSTORY
export const transactionsHistory = (query = '') => {
  return api('get', TRANSACTIONS_FULL + query);
};
export const transactionsBalance = (query = '') => {
  return api('get', TRANSACTIONS_BALANCE + query);
};
export const transactionsBalancePartner = (query = '') => {
  return api('get', TRANSACTIONS_BALANCE_PARTNER + query);
};
export const transactionsWayforpayContractor = (query = '') => {
  return api('get', TRANSACTIONS_WAYFORPAY_CONTRACTOR + query);
};
export const transactionsWayforpayContractorSend = (data) => {
  return api('post', TRANSACTIONS_WAYFORPAY_CONTRACTOR_SEND, data);
};
export const transactionsRechargeByLiqpay = (query = '') => {
  return api('get', TRANSACTIONS_RECHARGE_BY_LIQPAY + query);
};
export const rechargeByInvoice = (query = '') => {
  return api('get', RECHARGE_BY_INVOICE + query);
};
export const rozetkaTransactionsHistory = (query = '') => {
  return api('get', ROZETKA_TRANSACTIONS_HISTORY + query);
};
export const rozetkaInvoices = (query = '') => {
  return api('get', ROZETKA_INVOICES + query);
};
export const rozetkaSalesReports = (query = '') => {
  return api('get', ROZETKA_SALES_REPORTS + query);
};
export const ordersHistory = (query = '') => {
  return api('get', ORDERS_HISTORY + query);
};

export const getLanding = () => {
  return api('get', GET_LANDING);
};

// export const getLanding = () => {
//   return axios.get('http://192.168.0.113:8001/get_landing/');
// };


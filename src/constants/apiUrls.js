const SERVERS = {
  PRODUCT: {
    XHR: 
    // 'http://192.168.0.130:8001/api/v1/'
    // 'https://api-dev.buy-sell.com.ua/api/v1/'
    'https://api.buy-sell.com.ua/api/v1/'


    // XHR: 'http://192.168.0.130:8001/api/v1/'
    // XHR: 'http://192.168.0.144:8001/api/v1/'
  },
  DEV: {
    // XHR: 'https://cors-anywhere.herokuapp.com/http://94eebd51.ngrok.io/api/v1/'
    XHR:
      // 'https://cors-anywhere.herokuapp.com/http://api.buy-sell.com.ua/api/v1/'
      'https://api.buy-sell.com.ua/api/v1/'

      // 'https://api-dev.buy-sell.com.ua/api/v1/'
      // 'http://192.168.88.250:8001/api/v1/'
    // 'http://192.168.0.111:8001/api/v1/'
    // 'https://33cc2aa6.ngrok.io/api/v1/'
    // 'http://192.168.0.117:8001/api/v1/'
    // 'https://f1772878.ngrok.io/api/v1/'
  }
};

export const BASE_URL = /\bdev\b|\blocalhost\b/.test(document.location.hostname)
    ? // ? SERVERS.DEV.XHR /* <=== set here server what needs for developing -  */
    SERVERS.DEV.XHR /* <=== set here server what needs for developing -  */
    : SERVERS.PRODUCT.XHR;


//USER
export const LOGIN = 'login/';
export const REGISTRATION = 'register/';
export const CONFIRM_EMAIL = 'activate/';
export const PROFILE = 'profile/';
export const PASSWORD = 'password_change/';
export const RESET_PASSWORD = 'password_reset/';
export const CONTACT_FORM = 'marketplace/base/contact_us/';

//COMPANY
export const COMPANY_PROFILE = 'company/detail/';
export const UPDATE_COMPANY_PROFILE = 'company/update/';
export const GET_COMPANY_TYPE = 'company/company_type/';
export const GET_ACTIVITY_AREAS = 'company/activity_areas/';
export const GET_SERVICE_INDUSTRY = 'company/service_industry/';
export const COMPANY_DOCUMENTS = 'company/documents/';
export const COMPANY_PITCH = 'company/pitch/';
export const COMPANY = 'company/';
//PRODUCTS
export const CONTRACTOR_PRODUCTS = 'catalog/contractor_products/';
// export const PARTNER_PRODUCTS = 'catalog/partner_products/';
// export const PARTNER_PRODUCTS_FOR_ROZETKA = 'catalog/products_in_yml/';
// export const PARTNER_PRODUCTS_FOR_PROM = 'catalog/products_in_yml/';
export const PARTNER_PRODUCTS = 'catalog/partner_products/';
export const PARTNER_PRODUCTS_FOR_ROZETKA =
    'catalog/get_product_from_yml/rozetka';
export const PARTNER_PRODUCTS_FOR_PROM = 'catalog/get_product_from_yml/prom';

export const ALL_PRODUCTS = 'catalog/partner_products/products_by_contractors/';
export const CONTRACTOR_CATEGORIES =
    'catalog/contractor_products/contractor_categories/';
export const UPLOAD_PRODUCTS = 'catalog/products_upload/';
export const UPLOAD_PRODUCTS_PROM = 'catalog/products_upload_prom/';
export const REMOVE_CONTRACTOR_PRODUCTS =
    'catalog/contractor_products/delete_list_of_products/';
export const REMOVE_PARTNER_PRODUCTS =
    'catalog/partner_products/delete_list_of_products/';
export const NEW_PRODUCTS = 'catalog/contractor_products/';
export const COPY_PRODUCT = 'catalog/copy_prod/';

export const DOWNLOADS_STATUS = 'catalog/contractor_products/upload_history/';
export const COPY_TO_MY_PRODUCTS =
    'catalog/partner_products/copy_to_my_products/';

//UpdateProduct
export const UPDATE_PRODUCTS_ROZETKA = 'catalog/update_product/rozetka/';
export const UPDATE_PRODUCTS_PROM = 'catalog/update_product/prom/';
export const UPDATE_MASS_PRODUCTS = 'catalog/update_partner_product_mass/';

//YML
export const YML = 'catalog/yml-handler/';
export const DELETE_PRODUCTS_FROM_YML =
    'catalog/yml-handler/delete_products_from_yml/';

//CATEGORIES
export const ALL_CATEGORIES = 'catalog/categories/';
export const FIRST_LEVEL_CATEGORIES = 'catalog/categories/first_level/';

//CATEGORIES
export const ALL_CATEGORIES_PROM = 'catalog/categories_prom/';
export const FIRST_LEVEL_CATEGORIES_PROM =
    'catalog/categories_prom/first_level/';

//OPTIONS
export const OPTIONS_BY_CATEGORY = 'catalog/options_by_category/';
export const OPTIONS_BY_CATEGORY_WITH_TEXT_AREA =
    'catalog/options_by_category_with_text_area/';

//ORDERS
export const ORDERS = 'orders/';
export const ORDERS_PROM = 'orders_prom/';
export const PASS_TO_CONTRACTOR = id => `orders/${id}/pass_to_contractor/`;
export const CONTRACTOR_ORDERS = 'orders_contractor/';
export const SEND_TO_CONTRACTOR = 'order/send_to_contractor/';

// ORDER
export const ORDER_SELF = 'order_self/';

//STORE
export const STORE = 'my_store/';

// FINANCE GET MONEY
export const PACK_INVOICE = 'payments/buy_pocket_by_invoice/'; // Продавец.  Для покупки пакетов.    Cчёт-фактура. ИСПОЛЬЗУЕТСЯ
export const PACK_LIQPAY = 'payments/pocket-pay/'; // Продавец.  Для покупки пакетов.    LiqPay.       ИСПОЛЬЗУЕТСЯ
export const UNBALANCES = 'payments/application_to_unbalances/'; // Продавец.  Для вывода средств.     Карта.         ИСПОЛЬЗУЕТСЯ
export const RECHARGE_INVOICE = 'payments/recharge_balance_by_invoice/'; // Поставщик. Для пополнения баланса. Cчёт-фактура. ИСПОЛЬЗУЕТСЯ
export const RECHARGE_LIQPAY = 'payments/recharge-balance-pay/'; // Поставщик. Для пополнения баланса. LiqPay.       ИСПОЛЬЗУЕТСЯ

// FINANCE HYSTORY
export const TRANSACTIONS_WAYFORPAY_CONTRACTOR = 'payments/transactions/wayforpay/get_data_for_widget/';
export const TRANSACTIONS_WAYFORPAY_CONTRACTOR_SEND = 'payments/transactions/wayforpay/set_data_for_widget/';


export const TRANSACTIONS_FULL = 'payments/transactions/full/';
export const TRANSACTIONS_BALANCE = 'payments/transactions/balance/contractor/';
export const TRANSACTIONS_BALANCE_PARTNER = 'payments/transactions/balance/partner/';
export const TRANSACTIONS_RECHARGE_BY_LIQPAY =
    'payments/transactions/recharge_by_liqpay/';
export const RECHARGE_BY_INVOICE = 'payments/recharge_by_invoice/';

export const ROZETKA_TRANSACTIONS_HISTORY =
    'payments/transactions/rozetka/trans_history/';
export const ROZETKA_INVOICES = 'payments/transactions/rozetka/invoices/';
export const ROZETKA_SALES_REPORTS =
    'payments/transactions/rozetka/reports_files/';

export const ORDERS_HISTORY = 'payments/transactions/order/';

//ABS eccomerce schoold

export const MODULES = 'academy/module/';

export const NOVA_POSHTA = 'company/nova_poshta/';


export const GET_LANDING = 'get_landing/';

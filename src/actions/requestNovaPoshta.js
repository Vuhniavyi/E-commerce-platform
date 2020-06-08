import axios from 'axios';
// import { notification } from 'antd';

const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';

export const fetchSettlements = async (apiKey, value) => {
  const { data: { data } } = await axios.post(BASE_URL, {
    modelName: 'AddressGeneral',
    calledMethod: 'getSettlements',
    methodProperties: {
      FindByString: value,
      Warehouse: '1'
    },
    apiKey
  });
  return data;
};

export const fetchWarehouses = async (apiKey, properties) => {
  const { data: { data } } = await axios.post(BASE_URL, {
    modelName: 'AddressGeneral',
    calledMethod: 'getWarehouses',
    methodProperties: {
      Language: "ru",
      ...properties
    },
    apiKey
  })

  return data;
};

export const fetchCities = async apiKey => {
  const { data: { data } } = await axios.post(BASE_URL, {
    modelName: "Address",
    calledMethod: "getCities",
    methodProperties: {
    },
    apiKey: apiKey
  })

  return data;
}

export const fetchServiceTypes = async apiKey => {
  const { data: { data } } = await axios.post(BASE_URL, {
    modelName: "Common",
    calledMethod: "getServiceTypes",
    apiKey: apiKey
  })
  return data;
}

export const getCounterparties = apiKey => {
  const data = {
    modelName: 'Counterparty',
    calledMethod: 'getCounterparties',
    methodProperties: {
      CounterpartyProperty: 'Sender',
      Page: '1'
    },
    apiKey
  };
  return axios.post(BASE_URL, data);
};

export const getCounterpartyAddresses = (apiKey, Ref) => {
  const data = {
    modelName: 'Counterparty',
    calledMethod: 'getCounterpartyAddresses',
    methodProperties: {
      Ref,
      CounterpartyProperty: 'Sender'
    },
    apiKey
  };
  return axios.post(BASE_URL, data);
};

export const getCounterpartyContactPersons = (apiKey, Ref) => {
  const data = {
    modelName: 'Counterparty',
    calledMethod: 'getCounterpartyContactPersons',
    methodProperties: {
      Ref,
      Page: '1'
    },
    apiKey
  };
  return axios.post(BASE_URL, data);
};

export const createContactPerson = (apiKey, methodProperties) => {
  const data = {
    modelName: 'ContactPerson',
    calledMethod: 'save',
    methodProperties,
    apiKey
  };
  return axios.post(BASE_URL, data);
};

export const deleteContactPerson = (apiKey, Ref) => {
  const data = {
    modelName: 'ContactPerson',
    calledMethod: 'delete',
    methodProperties: {
      Ref
    },
    apiKey
  };
  return axios.post(BASE_URL, data);
};

export const createNovaPoshtaTTN = data => {
  return axios.post(BASE_URL, data);
};

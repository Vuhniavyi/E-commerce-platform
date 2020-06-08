import React, { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import { createFilter } from 'react-select';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';

import MenuList from 'components/ReactSelectMenu/ReactSelectMenu';
import { fetchCities, fetchWarehouses, fetchServiceTypes } from 'actions/requestNovaPoshta';
import { createOrderSelf } from 'actions/ordersAction';
import { getPartnerProducts } from 'actions/productsActions';

import styles from './NewOrder.module.css';
import { notification } from 'antd';

const NewOrder = ({ visible, onCancel }) => {
  const [nameValue, setNameValue] = useState('');
  const [countValue, setCountValue] = useState(1);
  const [phoneValue, setPhoneValue] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState('');

  const novaPoshtaApiKey = useSelector(state => state.user.novaPoshtaApiKey)

  useEffect(() => {
    fetchCities(novaPoshtaApiKey).then(cities => {
      const parsedCities = cities.map(c => ({
        value: c.Ref,
        label: c.DescriptionRu,
      }))

      setCities(parsedCities);
    });

    fetchServiceTypes(novaPoshtaApiKey).then(types => {
      const parsedTypes = types.map(t => ({
        value: t.Ref,
        label: t.Description,
      }))

      setServiceTypes(parsedTypes);
    });

  }, []);

  const onChangeCount = event => {
    const value =
      event.target.value === ''
        ? event.target.value
        : parseInt(event.target.value);

    let count = (selectedProduct && selectedProduct.count) || countValue;

    if ((value > 0 && value <= count) || value === '') {
      count = value;
    }

    setCountValue(count)
  };

  const isValidNumber = (num) => /\+380[0-9]{9}$/.test(num)

  const onChangePhoneValue = e => {
    const { value } = e.target;
    setPhoneValue(value)

    if (isValidNumber(value)) {
      setErrorPhone(false);
    } else {
      setErrorPhone(true);
    }
  };
  const onChangeNameValue = e => setNameValue(e.target.value);

  const parseProduct = products => products.map(p => ({
    value: p.id,
    label: p.name.slice(0, 70),
    price: parseFloat(p.price),
    count: p.count,
  }))

  const fetchProducts = debounce((inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {

      setTimeout(async () => {
        const productsData = await getPartnerProducts(`?name=${inputValue}&page_size=${1000}`);
        const parseProducts = parseProduct(productsData.results);
        setProducts(parseProducts)
        callback(parseProducts)
      });
    }
  }, 500)

  const filterCities = value => cities.filter(c => c.label.toLowerCase().includes(value.toLowerCase().trim()))

  const getCities = debounce((inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {

      setTimeout(() => {
        const matchesCities = filterCities(inputValue);

        callback(matchesCities);
      });
    }
  }, 1000)

  const filterWarehouses = value => warehouses.filter(c => c.label.toLowerCase().includes(value.toLowerCase().trim()))

  const getWarehouses = debounce((inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {

      setTimeout(() => {
        const matchesWarehouese = filterWarehouses(inputValue);

        callback(matchesWarehouese);
      });
    }
  }, 1000)

  const resetWarehouse = () => {
    setWarehouses([]);
    setSelectedWarehouse('');
  }

  const handleChangeProduct = product => {
    if (product)
      setSelectedProduct(product);
  };

  const handleChangeCiti = async city => {
    setSelectedCity(city);
    resetWarehouse();
    const warhouses = await fetchWarehouses(novaPoshtaApiKey, { CityRef: city.value });

    setWarehouses(warhouses.map(w => ({ value: w.Number, label: w.DescriptionRu })));
  };

  const handleChangeWarehouse = warehouse => {
    if (warehouse)
      setSelectedWarehouse(warehouse);
  }

  const handleChangeType = type => {
    if (type)
      setSelectedServiceType(type);
  }

  let totalPrice = 0;

  if (selectedProduct && selectedProduct.price) {
    totalPrice = (selectedProduct.price * countValue).toFixed(2);
  }

  const validParams = () => {
    const isValidName = nameValue.trim() !== '';
    const isValidCount = countValue !== '';
    const isValidPhone = isValidNumber(phoneValue);
    const isValidProduct = selectedProduct !== null;
    const isValidCity = selectedCity !== '';
    const isValidWarehouse = selectedWarehouse !== '';
    const isValidServiceType = selectedServiceType !== '';

    return isValidName && isValidCount && isValidPhone && isValidProduct && isValidCity && isValidWarehouse && isValidServiceType;
  }

  const resetAll = () => {
    setNameValue('');
    setCountValue(1);
    setPhoneValue("+380234123333");
    setErrorPhone(false);
    setProducts([]);
    setSelectedProduct(null);
    setSelectedCity('');
    setWarehouses([]);
    setSelectedWarehouse('');
    setSelectedServiceType('');
  }

  const handleSubmit = async () => {

    if (!validParams()) {
      return notification.error({ message: 'Заполните правильно поля' });
    }

    const params = {
      fullName: nameValue,
      count: countValue,
      phoneNumber: phoneValue,
      totalPrice,
      refIdPoshta: selectedWarehouse.value,
      cityName: selectedCity.label,
      postOfficeName: selectedWarehouse.label,
      product: selectedProduct.value,
      serviceType: selectedServiceType.value,
    }

    await createOrderSelf(params);
    notification.success({ message: "Заказ создан" })
    onCancel();
    resetAll();
  }

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={handleSubmit}>
      <div className={styles.wrap}>
        <p className={styles.text}>
          Укажите продукт:
       </p>
        <div className={styles.wrap}>
          <AsyncSelect
            autocomplete="off"
            filterOption={createFilter({ ignoreAccents: false })}
            loadOptions={(inputValue, callback) => fetchProducts(inputValue, callback)}
            value={selectedProduct}
            placeholder="Выберите продукт"
            onChange={handleChangeProduct}
            defaultOptions={products}
            components={{ MenuList }}
          />
        </div>
        <div className={styles.wrapPrice}>
          <TextField
            disabled={!selectedProduct ? true : false}
            style={{ width: "200px" }} type="number" className={styles.inputMB} label={`Количество товара (${(selectedProduct && selectedProduct.count) || countValue})`}
            value={countValue} onChange={onChangeCount} />
          <div className={styles.price}>
            Сумма заказа: {totalPrice}
          </div>
        </div>
      </div>
      <p className={styles.text}>
        Данные о доставке
      </p>
      <div className={styles.inputMB}>
        <TextField required className={styles.inputMB} label="ФИО" value={nameValue} onChange={onChangeNameValue} fullWidth />
      </div>
      <div className={styles.inputMB}>
        <TextField error={errorPhone} required className={styles.inputMB} label="+380638501099" value={phoneValue} onChange={onChangePhoneValue} fullWidth />
      </div>
      <div className={styles.wrap}>
        <p className={styles.text}>
          Укажите город
        </p>
        <AsyncSelect
          filterOption={createFilter({ ignoreAccents: false })}
          components={{ MenuList }}
          autocomplete="off"
          value={selectedCity}
          loadOptions={(inputValue, callback) => getCities(inputValue, callback)}
          placeholder="Выберите ваш город"
          options={cities}
          onChange={handleChangeCiti}
          defaultOptions={cities}
        />
      </div>
      <div className={styles.wrap}>
        <p className={styles.text}>
          Укажите отделение Новой почты:
        </p>
        <AsyncSelect
          components={{ MenuList }}
          onChange={handleChangeWarehouse}
          options={warehouses}
          isDisabled={warehouses.length === 0}
          loadOptions={(inputValue, callback) => getWarehouses(inputValue, callback)}
          value={selectedWarehouse}
          defaultOptions={warehouses}
          placeholder="Выберите отделение"
        />
      </div>
      <div className={styles.wrap}>
        <p className={styles.text}>
          Укажите технологию доставки:
        </p>
        <Select
          onChange={handleChangeType}
          options={serviceTypes}
          isDisabled={warehouses.length === 0}
          value={selectedServiceType}
          defaultOptions={serviceTypes}
          placeholder="Выберите технологию"
        />
      </div>
    </Modal>
  )
}

export default NewOrder;
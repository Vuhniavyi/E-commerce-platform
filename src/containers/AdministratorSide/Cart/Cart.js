import React, { Component } from 'react';
import styles from './Cart.module.css';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import avatar from '../../../img/avatar.png';

const dataSource = [
  {
    key: '1',
    productName: 'iPhone XR 64GB Space Grey ',
    avatar: avatar,
    provider: 'Nazar Marketpalce',
    amount: '1 шт',
    payable: '23844.00 грн'
  },
  {
    key: '2',
    productName: 'iPhone XR 64GB Space Grey ',
    avatar: avatar,
    provider: 'Nazar Marketpalce',
    amount: '1 шт',
    payable: '23844.00 грн'
  }
];

const columns = [
  {
    render: (productName, item) => (
      <span className={styles.productItemName}>
        <span className={styles.productImg}>
          <img src={item.avatar} alt="" />
        </span>
        <span>{productName}</span>
      </span>
    ),
    title: 'Название товара',
    dataIndex: 'productName',
    key: 'productName'
  },
  {
    title: 'Поставщик',
    dataIndex: 'provider',
    key: 'provider'
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'К оплате',
    dataIndex: 'payable',
    key: 'payable'
  }
];

class Cart extends Component {
  render() {
    return (
      <div>
        <h3 className={styles.title}>Корзина</h3>

        <form className={styles.cartForm}>
          <div>
            <label>Имя покупателя</label>
            <input type="text" />
          </div>
          <div>
            <label>Телефон покупателя</label>
            <input type="tel" />
          </div>
          <div>
            <label>E-mail покупателя</label>
            <input type="email" />
          </div>
          <div>
            <label>Номер заказа</label>
            <input type="text" />
          </div>
          <div>
            <label>Коментарий к заказу</label>
            <textarea></textarea>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className={styles.productTable}
          />
          <button className={styles.save}>Сохранить</button>
        </form>
      </div>
    );
  }
}

export default Cart;

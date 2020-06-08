import React, { Component } from 'react';
import styles from './Orders.module.css';

import { statusList } from './statusList';

class SearchOrders extends Component {
  state = {
    id: '',
    min_date: '',
    max_date: '',
    status: '',
    user_fio: '',
    user_phone: ''
  };

  handleChangeInput = ({ target: { value, name } }) => {
    this.setState(
      {
        [name]: value
      },
      () => this.props.onSearch(this.state)
    );
  };

  render() {
    const {
      order_id,
      product_id,
      min_date,
      max_date,
      status,
      user_fio
      // user_phone
    } = this.state;

    return (
      <div>
        <form className={styles.searchOrders}>
          <div className={styles.orderNumber}>
            <label>Номер заказа</label>
            <input
              type="text"
              name="order_id"
              value={order_id}
              onChange={this.handleChangeInput}
            />
          </div>

          <div className={styles.orderNumber}>
            <label>Название товара/Код товара</label>
            <input
              type="text"
              name="product_id"
              value={product_id}
              onChange={this.handleChangeInput}
            />
          </div>

          <div className={styles.orderDate}>
            <label>Дата заказа</label>
            <input
              type="date"
              name="min_date"
              value={min_date}
              onChange={this.handleChangeInput}
            />
            <input
              type="date"
              name="max_date"
              value={max_date}
              onChange={this.handleChangeInput}
            />
          </div>

          <div className={styles.orderStatus}>
            <label>Статус заказа</label>
            <select
              name="status"
              value={status}
              onChange={this.handleChangeInput}
            >
              {statusList.map(item => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.name}>
            <label>ФИО покупателя</label>
            <input
              type="text"
              name="user_fio"
              value={user_fio}
              onChange={this.handleChangeInput}
            />
          </div>
          {/*<div className={styles.phone}>*/}
          {/*<label>Телефон</label>*/}
          {/*<input type="tel"*/}
          {/*name='user_phone'*/}
          {/*value={user_phone}*/}
          {/*onChange={this.handleChangeInput}*/}
          {/*/>*/}
          {/*</div>*/}
          {/*<button className={styles.find} type='button' onClick={() => this.props.onSearch(this.state)}>Поиск</button>*/}
        </form>
      </div>
    );
  }
}

export default SearchOrders;

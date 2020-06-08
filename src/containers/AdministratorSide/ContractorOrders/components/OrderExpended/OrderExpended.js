import React from 'react';
import { getImageInProduct } from 'utils/helpers';

import styles from "./OrderExpended.module.css";

const OrderExpended = ({ order, ActionButtons }) => {
  const { baseOrder: { amount, totalQuantity },product, count, totalPrice, cityName, fullName, postOfficeName } = order;

  return (
    <div className={styles.orderDescription} >
      <div className={styles.product}>
        <div className={styles.productItem}>
          <img className={styles.productImg} src={getImageInProduct(product)} alt='' />
          <div>{product.name}</div>
          <div className={styles.productPrice}>
            <div>Товаров: {count}</div>
            <div>Всего за товары: {totalPrice}</div>
          </div>
        </div>
        <div className={styles.delivery}>
          <h4 className={styles.title}>Способ доставки:</h4>
          {<span>
            {`${postOfficeName}}`}<br />
            {`${cityName}`} <br />
            {`${fullName}`}
          </span>}
        </div>
        <div className={styles.total}>
          <h4 className={styles.title}>Всего к оплате:</h4>
          {`${totalPrice} грн`}
        </div>
      </div>
      <div className={styles.actions}>
        {ActionButtons.map(el => el)}
      </div>
    </div>
  )
};

export default OrderExpended;

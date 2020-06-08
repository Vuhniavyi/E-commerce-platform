import React from 'react';
import { Modal } from 'antd';
import defaultImage from '../../../../img/pictures/no-productimage.png';

import styles from './AddProductsModal.module.css';

const AddProductsModal = ({ onChangeCountSelectedProducts, products, modalProps }) => {
  return <Modal {...modalProps}>
    <ul className={styles.selectWrap}>
      {products.map(product => {
        return (
          <li key={product.id} className={styles.selectProductItem}>
            <div className={styles.textWrap}>
              <div
                className={styles.selectProductImg}
                style={{
                  backgroundImage: `url(${
                    product.coverImages && product.coverImages[0]
                      ? product.coverImages[0].imageDecoded
                      : product.imageUrls && product.imageUrls[0]
                        ? product.imageUrls[0].url
                        : Boolean(product.avatarUrl)
                          ? product.avatarUrl
                          : defaultImage
                    })`
                }}
              ></div>
              <p className={styles.text}>{product.name}</p>
            </div>
            <div className={styles.inputWrap}>
              <input
                className={styles.selectInput}
                type="number"
                value={product.newCount}
                onChange={onChangeCountSelectedProducts(
                  product.id
                )}
              />
              <p>Max: {product.count}</p>
            </div>
          </li>
        );
      })}
    </ul>
  </Modal>
};

export default AddProductsModal;
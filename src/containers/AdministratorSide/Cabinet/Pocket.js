import React from 'react';
import styles from './Cabinet.module.css';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

const Pocket = props => {
  return (
    <div className={styles.wrapperpocket}>
      <h2 className={styles.pocketHead}>Ваш пакет</h2>
      <div className={styles.contentWrapper}>
        <div className={styles.contenthead}>
          <div className={styles.status}>
            <span>Базовый</span>
            <span className={styles.active}>
              Активирован <Icon type="check" />
            </span>
          </div>
          <div className={styles.price}>35.000 грн</div>
        </div>
        <div className={styles.content}>
          <div className={styles.pocketContent}>
            Полный доступ к платформе Возможность неограниченно редактировать
            товары Поддержка 24/7 Пропуск на все встречи
          </div>
          <div className={styles.pocketContent}>
            Полный доступ к платформе Возможность неограниченно редактировать
            товары Поддержка 24/7 Пропуск на все встречи
          </div>
        </div>
        <Button className={styles.buyBtn} style={{ height: 40 }}>
          Купить полный
        </Button>
      </div>
    </div>
  );
};

export default Pocket;

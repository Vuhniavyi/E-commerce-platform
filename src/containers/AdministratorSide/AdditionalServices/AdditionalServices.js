import React, { Component, Fragment } from 'react';
import styles from './AdditionalServices.module.css';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { Paper } from '@material-ui/core';
import copyright from '../../../img/copyright.jpg';
import seo from '../../../img/Seo.jpg';
import megaphone from '../../../img/marketGoing.jpg';
import handgrip from '../../../img/handgrip.svg';
import MyButton from '../components/Buttons/Button';

class AdditionalServices extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;

    return (
      <Fragment>
        <div className="page">
          <h3 className="page-title">Дополнительные услуги</h3>

          <div className={styles.servicesBlock}>
            <Paper className={styles.servicesItem}>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={copyright} alt="edit"/>
                </div>
                <h5 className={styles.itemTitle}>
                  Копирайтинг для Вашего магазина
                </h5>
                <p className={styles.itemDescription}>
                  Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне.{' '}
                </p>
              </div>

              <MyButton
                myvariant="green"
                title="Заказать"
                style={{ width: 200 }}
                onClick={this.showModal}
              />
            </Paper>

            <Paper className={styles.servicesItem}>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={seo} alt="edit"/>
                </div>
                <h5 className={styles.itemTitle}>
                  SEO оптимизация для Вашего магазина
                </h5>
                <p className={styles.itemDescription}>
                  Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне.{' '}
                </p>
              </div>

              <MyButton
                myvariant="green"
                title="Заказать"
                style={{ width: 200 }}
                onClick={this.showModal}
              />
            </Paper>

            <Paper className={styles.servicesItem}>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={megaphone} alt="edit"/>
                </div>
                <h5 className={styles.itemTitle}>
                  Продвижение для Вашего магазина
                </h5>
                <p className={styles.itemDescription}>
                  Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне.{' '}
                </p>
              </div>

              <MyButton
                myvariant="green"
                title="Заказать"
                style={{ width: 200 }}
                onClick={this.showModal}
              />
            </Paper>

            <Paper className={styles.servicesItem}>
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={copyright} alt="edit"/>
                </div>
                <h5 className={styles.itemTitle}>Управление Вашим магазином</h5>
                <p className={styles.itemDescription}>
                  Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                  вэб-дизайне.{' '}
                </p>
              </div>
              <MyButton
                myvariant="green"
                title="Заказать"
                style={{ width: 200 }}
                onClick={this.showModal}
              />
            </Paper>
          </div>
        </div>

        <div className="payModal">
          <Modal
            title="Покупка пакета"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            className={styles.buyPackage}
            footer={false}
          >
            <div className={styles.modalContent}>
              <p>
                Для того чтобы приобрести пакет доступа на Вашем аккаунте, Вы
                можете воспользоваться двумя способами оплаты : Оплата с помощью
                сервиса LiqPay или же оплата с помощью банковской карты.
              </p>
            </div>
            <div className={styles.payActions}>
              <form
                method="POST"
                action="https://www.liqpay.ua/api/3/checkout"
                accept-charset="utf-8"
              >
                <input type="hidden" name="data" value="{{ data }}"/>
                <input type="hidden" name="signature" value="{{ signature }}"/>
                <MyButton
                  myvariant="green"
                  title="Оплатить через LiqPay"
                  style={{ width: 200 }}
                  onClick={this.handleSendInvoice}
                />
              </form>
              <MyButton
                myvariant="green"
                title="Отправить счет на e-mail"
                style={{ width: 200 }}
                onClick={this.handleSendInvoice}
              />
            </div>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default AdditionalServices;

import React, { Component, Fragment } from 'react';
import styles from './auth.module.css';
import Slider from 'react-slick';

export default class SliderSlick extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className={styles.sliderWrapper}>
        {/* <div> */}
        <Slider {...settings}>
          <Fragment>
            <div className={styles.head}>
              <h1>
                <b>Buy & Sell</b> CRM
              </h1>
              <h2>Все необходимое в одной системе!</h2>
            </div>
            <ul className={styles.content}>
              <li>Лиды, клиенты</li> <li>Продажи</li>
              <li>Прайс-лист, склад</li> <li>Управление задачами</li>
              <li>Подробная информация о каждом клиенте</li>
              <li>Управление и контроль финансов</li>
              <li>Генерация документов</li> <li>Статистика</li>
              <li>SMS сообщения и многое другое</li>
            </ul>
          </Fragment>
          <div>
            <div className={styles.head}>
              <h1>
                <b>Buy & Sell</b> CRM
              </h1>
              <h2>Все необходимое в одной системе!</h2>
            </div>
            <ul className={styles.content}>
              <li>Лиды, клиенты</li> <li>Продажи</li>
              <li>Прайс-лист, склад</li> <li>Управление задачами</li>
              <li>Подробная информация о каждом клиенте</li>
              <li>Управление и контроль финансов</li>
              <li>Генерация документов</li> <li>Статистика</li>
              <li>SMS сообщения и многое другое</li>
            </ul>
          </div>
          <Fragment>
            <div className={styles.head}>
              <h1>
                <b>Buy & Sell</b> CRM
              </h1>
              <h2>Все необходимое в одной системе!</h2>
            </div>
            <ul className={styles.content}>
              <li>Лиды, клиенты</li> <li>Продажи</li>
              <li>Прайс-лист, склад</li> <li>Управление задачами</li>
              <li>Подробная информация о каждом клиенте</li>
              <li>Управление и контроль финансов</li>
              <li>Генерация документов</li> <li>Статистика</li>
              <li>SMS сообщения и многое другое</li>
            </ul>
          </Fragment>
        </Slider>
        {/* </div> */}
      </div>
    );
  }
}

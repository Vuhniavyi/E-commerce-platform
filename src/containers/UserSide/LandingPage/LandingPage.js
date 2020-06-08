import React, { Component, Fragment } from 'react';

import './LandingPage.css';
import picblock1 from '../../../img/pictures/picblock1.png';
import icon1 from '../../../img/pictures/icon1.png';
import icon2 from '../../../img/pictures/icon2.png';
import icon3 from '../../../img/pictures/icon3.png';
import icon4 from '../../../img/pictures/icon4.png';
import picblock2 from '../../../img/pictures/picblock2.png';
import picblock3 from '../../../img/pictures/picblock3.png';
import picblock5 from '../../../img/pictures/picblock5.png';
import picblock7 from '../../../img/pictures/picblock7.png';
import picblock8 from '../../../img/pictures/picblock8.png';
import picblock9 from '../../../img/pictures/picblock9.png';
import picblock10 from '../../../img/pictures/picblock10.png';
import picblock11 from '../../../img/pictures/pickblock11.png';
import picblock12 from '../../../img/pictures/picblock12.png';
import viber from '../../../img/pictures/viber.svg';
import rozetka from '../../../img/pictures/rozetka.svg';
import prom from '../../../img/pictures/prom.svg';
import sms from '../../../img/pictures/sms.svg';
import arroba from '../../../img/pictures/arroba.svg';
import novaposhta from '../../../img/pictures/Nova_Poshta.svg';
import Header from '../../../containers/UserSide/components/Header/Header';
import 'antd/dist/antd.css';

// import { Link } from 'react-router-dom';
// import { notification } from 'antd';
// import { sendContactForm } from '../../../actions/userActions';

class LandingPage extends Component {
  state = {
    phoneNumber: '',
    name: ''
  };

  // handleChangeInput = name => ({ target: { value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleSend = async e => {
  //   e.preventDefault();

  //   await sendContactForm(this.state);

  //   notification.success({
  //     message: 'Отправлено'
  //   });

  //   this.setState({
  //     name: '',
  //     phoneNumber: ''
  //   });
  // };

  // goRegistrationPage = () => {
  //   window.location.href = 'https://topmarket.ua/registration';
  // };
  // goLoginPage = () => {
  //   window.location.href = 'https://topmarket.ua/login';
  // };
  // goContactPage = () => {
  //   window.location.href = 'https://topmarket.ua/contacts-form';
  // };

  render() {
    const { phoneNumber, name } = this.state;

    return (
      <Fragment>
        <Header />
        <section className="block1">
          <div className="block1withoutnav">
            <div className="block1left">
              <div className="buysell">
                <p className="buytext">BUY</p>
                <p className="andtext">&</p>
                <p className="selltext">SELL</p>
              </div>
              <div className="marketplace">
                <p className="marketplacetext">
                  Маркетплейс который соединяет поставщиков и продавцов для
                  работы с крупными маркетплейсами
                </p>
              </div>
              <button className="buttonblock1">
                <a href="#top">УЗНАТЬ БОЛЬШЕ</a>
              </button>
            </div>
            <img
              className="block1right"
              src={picblock1}
              alt="picblock1"
              width="1012px"
              height="590px"
            />
          </div>
        </section>
        <section className="block2">
          <div className="block2left">
            <div className="advantages">
              <h1 className="advantagestext">Преимущества</h1>
            </div>
            <div className="leftandrightadvantages">
              <div className="leftadvantages">
                <div className="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">Удобство управления</div>
                </div>
                <div className="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">
                    Удобство управленияasdsaaaaa
                  </div>
                </div>
                <div className="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">Удобство управления</div>
                </div>
                <div className="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">Удобство управления</div>
                </div>
              </div>
              <div className="rightadvantages">
                <div class="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">Удобство управления</div>
                </div>
                <div className="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">
                    Удобство управленияasdsaaaaa
                  </div>
                </div>
                <div className="advantag">
                  <img
                    class="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">Удобство управления</div>
                </div>
                <div className="advantag">
                  <img
                    className="checkmark"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="advantagtext">Удобство управления</div>
                </div>
              </div>
            </div>
          </div>
          <img
            class="block2right"
            src={picblock2}
            alt="picblock2"
            width="617"
            height="515px"
          />
        </section>
        <section className="block3">
          <div className="block3leftandright">
            <div className="block3left">
              <div className="saves">
                <p className="savestext">
                  Экономия
                  <br />
                  времени
                </p>
              </div>
              <div className="savesleftblock">
                <div className="savesleftblock1">
                  <img
                    className="checkmark1"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="savesleftblocktext">
                    Экономия вокруг создания
                    <br />
                    интернет магазина
                  </div>
                </div>
                <div className="savesleftblock1">
                  <img
                    className="checkmark1"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="savesleftblocktext">
                    Экономия вокруг создания
                  </div>
                </div>
                <div className="savesleftblock1">
                  <img
                    className="checkmark1"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="savesleftblocktext">
                    Экономия вокруг создания
                    <br /> интернет магазина
                  </div>
                </div>
                <div className="savesleftblock1">
                  <img
                    className="checkmark1"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="savesleftblocktext">
                    Экономия вокруг создания
                  </div>
                </div>
              </div>

              <button className="buttonblock3 do-open">Связаться с нами</button>
            </div>
            <img
              className="block3right"
              src={picblock3}
              alt="picblock3"
              width="842px"
              height="627px"
            />
          </div>
        </section>
        <section className="block4">
          <div className="block4left">
            <div className="letsstart">
              <h1 className="letsstarttext">
                Начните работать
                <br />
                эфективнее
              </h1>
            </div>
            <div className="block4text">
              <div className="block4text1">
                <p className="block4text11">
                  {' '}
                  С нами уже работают более 500
                  <br />
                  интернет-магазинов
                </p>
              </div>
              <div className="block4text1">
                <p className="block4text11">
                  {' '}
                  С нами уже работают более 500
                  <br />
                  интернет-магазинов
                </p>
              </div>
              <div className="block4text1">
                <p className="block4text11">
                  {' '}
                  С нами уже работают более 500 sdadasdasdas
                </p>
              </div>
            </div>
          </div>

          <div className="block4right">
            <div className="application">
              <div className="applicationtext">
                <p className="applicationtext1">
                  Заполните заявку, чтобы
                  <br />
                  получить консультацию
                </p>
              </div>
              <form action="mail.php" method="post" className="inf-form1">
                <input
                  type="name"
                  placeholder="Ваше имя"
                  required
                  name="first_name"
                  placeholder="Обязательное поле"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  required
                  name="message"
                  placeholder="Обязательное поле"
                />
                <button type="submit" name="submit" value="Submit">
                  Оставить заявку
                </button>
              </form>
            </div>
          </div>
        </section>

        <section id="top" className="block5">
          <div className="Howdoesitwork">
            <h1 className="Howdoesitworktext">Как это работает?</h1>
          </div>
          <img
            className="block5right"
            src={picblock5}
            alt="picblock3"
            width="735px"
            height="376px"
          />
        </section>

        <section className="block6">
          <div className="integration">
            <h1 className="integrationtext">
              Интеграция
              <br />с сервисами
            </h1>
          </div>
          <div className="block6bottom">
            <div className="block6left">
              <div className="cell">
                <img
                  className="cellphoto"
                  src={viber}
                  alt="viber"
                  width="80px"
                  height="36px"
                />
                <div className="celltext">
                  - Заказы
                  <br />- Статус заказа
                </div>
              </div>
              <div className="cell">
                <img
                  className="cellphoto"
                  src={rozetka}
                  alt="viber"
                  width="47px"
                  height="45px"
                />
                <div className="celltext">
                  - API
                  <br />- Полная интеграция
                </div>
              </div>
              <div className="cell">
                <img
                  className="cellphoto"
                  src={prom}
                  alt="prom"
                  width="82px"
                  height="23px"
                />
                <div className="celltext">
                  - API
                  <br />- Полная интеграция
                </div>
              </div>
            </div>
            <div className="block6right">
              <div className="cell">
                <img
                  className="cellphoto"
                  src={novaposhta}
                  alt="Nova_Poshta"
                  width="90px"
                  height="32px"
                />
                <div className="celltext">- Статусы доставки</div>
              </div>
              <div className="cell">
                <img
                  className="cellphoto"
                  src={sms}
                  alt="sms"
                  width="54px"
                  height="47px"
                />
                <div className="celltext">- Уведомления о продажах</div>
              </div>
              <div className="cell">
                <img
                  className="cellphoto"
                  src={arroba}
                  alt="arroba"
                  width="50px"
                  height="50px"
                />
                <div className="celltext">
                  - API
                  <br />- Уведомление о заказах
                  <br />- Уведомление о доставках
                  <br />- Уведомление о продажах
                  <br />- Документы в Rozetka
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="block7">
          <div className="creation">
            <h1 className="creationtext">
              Создание моего
              <br />
              интернет-магазина
            </h1>
          </div>
          <div className="modern">
            <p className="moderntext">
              Современная e-commerce площадка на Python/Django
            </p>
          </div>
          <div className="block7leftandright">
            <div className="leftblock7">
              <div className="leftblock7-1">
                <img
                  className="checkmark2"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock7text">
                  Создание магазина за 2 минуты
                </div>
              </div>
              <div className="leftblock7-1">
                <img
                  className="checkmark2"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock7text">
                  Возможность использовать домен и поддомен
                </div>
              </div>
              <div className="leftblock7-1">
                <img
                  className="checkmark2"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock7text">
                  Простая в использовании админ-панель
                </div>
              </div>
              <div className="leftblock7-1">
                <img
                  className="checkmark2"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock7text">Выбирайте дизайн - шаблон</div>
              </div>
              <div className="leftblock7-1">
                <img
                  className="checkmark2"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock7text">
                  Кастомизируйте элементы вашего сайта
                </div>
              </div>
              <div className="leftblock7-1">
                <img
                  className="checkmark2"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock7text">
                  Кастомизируйте карточку товара
                </div>
              </div>
              <button className="buttonblock7">
                <a href="#">ПОЛУЧИТЬ ДОСТУП</a>
              </button>
            </div>

            <img
              className="block7right"
              src={picblock7}
              alt="picblock3"
              width="800px"
              height="580px"
            />
          </div>
        </section>

        <section className="block8">
          <div className="management">
            <h1 className="managementtext">Управление заказами</h1>
          </div>
          <div className="block8leftandright">
            <div className="leftblock8">
              <div className="leftblock8-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock8text">
                  Обработка заказов со всех
                  <br />
                  маркетплейсов:
                  <br />
                  Rozetka, Prom.ua, мой магазин
                </div>
              </div>
              <div className="leftblock8-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock8text">
                  Контроль статуса выполнения заказа
                </div>
              </div>
              <div className="leftblock8-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock8text">
                  Интеграция с API Rozetka и др маркетплейсов
                </div>
              </div>

              <button className="buttonblock8">
                <a href="#">Узнать</a>
              </button>
            </div>

            <img
              className="block8right"
              src={picblock8}
              alt="picblock8"
              width="756px"
              height="578px"
            />
          </div>
        </section>

        <section className="block9">
          <div className="block9leftandright">
            <div className="block9left">
              <div className="finance">
                <p className="financetext">Финансы</p>
              </div>
              <div className="finance1">
                <p className="financetext1">Полный контроль над финансами</p>
              </div>
              <div className="financeleftblock">
                <div className="financeleftblock1">
                  <img
                    className="checkmark4"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="financeleftblocktext">
                    Вся история транзакций
                  </div>
                </div>
                <div className="financeleftblock1">
                  <img
                    className="checkmark4"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="financeleftblocktext">
                    Все счета на оплату
                  </div>
                </div>
                <div className="financeleftblock1">
                  <img
                    className="checkmark4"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="financeleftblocktext">Отчеты</div>
                </div>
                <div className="financeleftblock1">
                  <img
                    className="checkmark4"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="financeleftblocktext">
                    Таблица взаиморасчет
                  </div>
                </div>
                <div className="financeleftblock1">
                  <img
                    className="checkmark4"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="financeleftblocktext">
                    Отчет о реализованных товарах
                  </div>
                </div>
                <div className="financeleftblock1">
                  <img
                    className="checkmark4"
                    src={icon1}
                    alt="icon"
                    width="27px"
                    height="27px"
                  />
                  <div className="financeleftblocktext">
                    Удобный вывод финансов
                  </div>
                </div>
              </div>
            </div>
            <img
              className="block9right"
              src={picblock9}
              alt="picblock9"
              width="671px"
              height="603px"
            />
          </div>
        </section>

        <section className="block10">
          <div className="services">
            <p className="servicestext">Сервисы от маркетплейса</p>
          </div>
          <div className="block10leftandright">
            <div className="block10left">
              <div className="servicesleftblock">
                <div className="servicesleftblock1">
                  <img
                    className="checkmark5"
                    src={icon2}
                    alt="icon"
                    width="50px"
                    height="50px"
                  />
                  <div className="servicesleftblocktext">Call центр</div>
                </div>
                <div className="servicesleftblock1">
                  <img
                    className="checkmark5"
                    src={icon3}
                    alt="icon"
                    width="50px"
                    height="50px"
                  />
                  <div className="servicesleftblocktext">Обработка заказов</div>
                </div>
                <div className="servicesleftblock1">
                  <img
                    className="checkmark5"
                    src={icon4}
                    alt="icon"
                    width="50px"
                    height="50px"
                  />
                  <div className="servicesleftblocktext">
                    Поддержка в одном месте
                  </div>
                </div>
              </div>

              <button className="buttonblock10">
                <a href="#">Регистрация</a>
              </button>
            </div>
            <img
              className="block10right"
              src={picblock10}
              alt="picblock10"
              width="753px"
              height="580px"
            />
          </div>
        </section>

        <section className="block11">
          <div className="trainingmodule">
            <h1 className="trainingmoduletext">Обучающий модуль</h1>
          </div>
          <div className="block11leftandright">
            <div className="leftblock11">
              <div className="leftblock11-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock11text">Единая база знаний</div>
              </div>
              <div className="leftblock11-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock11text">
                  Видеоуроки по использованию платформы
                </div>
              </div>
              <div className="leftblock11-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock11text">
                  Оформление договора с Rozetka
                </div>
              </div>
              <div className="leftblock11-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock11text">
                  Парсинг товаров из других магазинов
                </div>
              </div>
              <div className="leftblock11-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock11text">
                  Парсинг товаров из других магазинов
                </div>
              </div>

              <button className="buttonblock11">
                <a href="#">Узнать</a>
              </button>
            </div>

            <img
              className="block11right"
              src={picblock11}
              alt="picblock11"
              width="800px"
              height="540px"
            />
          </div>
        </section>

        <section className="block12">
          <div className="extraservices">
            <h1 className="extraservicestext">Доп услуги</h1>
          </div>
          <div className="opportunity">
            <h1 className="opportunitytext">
              Возможность передачи своего интернет-магазина маркетплейсу
            </h1>
          </div>
          <div className="block12leftandright">
            <div className="leftblock12">
              <div className="leftblock12-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock12text">
                  <p className="leftblock12text1">Сall center</p>
                </div>
              </div>
              <div className="leftblock12-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock12text">
                  <p className="leftblock12text1">
                    Развитие и обслуживание моего магазина
                  </p>
                </div>
              </div>
              <div className="leftblock12-1">
                <img
                  className="checkmark3"
                  src={icon1}
                  alt="icon"
                  width="27px"
                  height="27px"
                />
                <div className="leftblock12text">
                  <p className="leftblock12text1"> Услуги копирайтинга</p>
                </div>
              </div>

              <button className="buttonblock12">
                <a href="#">ПОЛУЧИТЬ ДОСТУП</a>
              </button>
            </div>

            <img
              className="block12right"
              src={picblock12}
              alt="picblock12"
              width="800px"
              height="570px"
            />
          </div>
        </section>

        <section className="block13">
          <div className="block13left">
            <div className="letsstart1">
              <h1 className="letsstarttext1">
                Начните работать
                <br />
                эфективнее
              </h1>
            </div>
            <div className="block13text">
              <div className="block13text1">
                <p className="block13text11">
                  {' '}
                  С нами уже работают более 500
                  <br />
                  интернет-магазинов
                </p>
              </div>
              <div className="block13text1">
                <p className="block13text11">
                  {' '}
                  С нами уже работают более 500
                  <br />
                  интернет-магазинов
                </p>
              </div>
              <div className="block13text1">
                <p className="block13text11">
                  {' '}
                  С нами уже работают более 500 sdadasdasdas
                </p>
              </div>
            </div>
          </div>

          <div className="block13right">
            <div className="application13">
              <div className="applicationtext13">
                <p className="applicationtext131">
                  Заполните заявку, чтобы
                  <br />
                  получить консультацию
                </p>
              </div>
              <form action="mail.php" method="post" className="inf-form1">
                <input
                  type="name"
                  placeholder="Ваше имя"
                  required
                  name="first_name"
                  placeholder="Обязательное поле"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  required
                  name="message"
                  placeholder="Обязательное поле"
                />
                <button type="submit" name="submit" value="Submit">
                  Оставить заявку
                </button>
              </form>
            </div>
          </div>
        </section>
        <footer className="footer">
          {/* <div className="footerup"> */}
          <div className="logofooter">
            <a href="#" id="logofooter"></a>
          </div>
          {/* <div className="contacts">
              <div className="mobiletel1">
                <a className="mobiletel" href="tel:+380662788280">
                  +38 (066) 278-82-80
                </a>
              </div>
              <div className="onmap1">
                <a
                  className="onmap"
                  href="https://goo.gl/maps/sMFEWCTZaWfyWNuj7"
                >
                  г. Киев, ул. Затышная 7б
                </a>
              </div>
            </div> */}
          {/* </div> */}
          {/* <div className="footerdown">
            <div className="lefttextfooter">
              <p className="lefttextfooter1">(c) Smartlead 2019</p>
            </div>
            <div className="righttextfooter">
              <p className="righttextfooter1">
                Пархоменко Сергей Володимирович, ИНН 32208534017
              </p>
            </div>
          </div> */}
        </footer>
      </Fragment>
    );
  }
}

export default LandingPage;

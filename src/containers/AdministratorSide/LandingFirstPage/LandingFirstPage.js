import React, { Component, Fragment, useEffect, useState } from 'react';
import { getLanding } from '../../../actions/userActions';
import '../LandingFirstPage/LandingFirstPage.css';

// const LandingFirstPage = props => {
  // const [land, setLand] = useState(null);
  // useEffect(() => {
  //   console.log(document);
  //   getLanding().then(land => document.write(land.template));
  // }, []);

  const LandingFirstPage = props => {
    const [land, setLand] = useState(null);
    useEffect(() => {
      // console.log(document)
      getLanding().then(land => setLand(land));
    }, []);

    console.log('land', land);

    return (
      <Fragment>
        {/* {land && (
          <main dangerouslySetInnerHTML={{ __html: land.template }}></main>
        )} */}

        
  <header class="header__wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="header">
              <div class="logo">
                {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="161" height="50"><defs><pattern id="A" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 161 50"><image width="161" height="50" xlink:href="data:image/png;base64,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"/></pattern></defs><path fill="url(#A)" d="M0 0h161v50H0z"/></svg> */}
                </div>
              <nav class="nav">
                <ul class="nav__items">
                  <li class="nav__item"><a class="nav__link scrolltoform" href="#workprofit">Как мы работаем</a></li>
                  <li class="nav__item"><a class="nav__link scrolltoform" href="#whospendtraining">Кому подойдет</a></li>
                  <li class="nav__item"><a class="nav__link scrolltoform" href="#jointypes">Отзывы партнеров</a></li>
                  <li class="nav__item"><a class="nav__link scrolltoform" href="#result">Варианты участия</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="homebanner__wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="homebanner__title">Профессиональная<span class="homebanner__title__color-orange"> дропшиппинг <br /> платформа
                <div class="homebanner-boxlogo">
                  {/* <img src="img/logotxt.svg" alt="" /> */}
                  </div></span></h1>
            <div class="homebanner__info">
              <p class="homebanner__info-title">Комплексное решение рутинных задач для всех, <br />кто занимается товарным бизнесом</p><a class="homebanner__info-link scrolltoform" href="#form">Принять участие</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="work-profit" id="workprofit">
      <div class="container">
        <div class="row">
          <div class="col-md-7"><img class="work-profitimg" src="img/imacandmacbook.svg" alt="" /></div>
          <div class="col-md-5">
            <h2 class="work-subtitle">После регистрации <span class="work-subtitle-orange">Вы получите:</span></h2>
            <div class="work-items">
              <div class="work-item">
                <div class="work-item-imgbox"><span>01</span><img src="img/online-shop-1.svg" alt="" /></div>
                <p>Собственный интернет-магазин</p>
              </div>
              <div class="work-item">
                <div class="work-item-imgbox"><span>02</span><img src="img/online-shop-1.svg" alt="" /></div>
                <p>Личный кабинет со статусами Ваших заказов и потенциальными выплатами</p>
              </div>
              <div class="work-item">
                <div class="work-item-imgbox"><span>03</span><img src="img/online-shop-1.svg" alt="" /></div>
                <p>Пошаговое обучение и индивидуальную поддержку</p>
              </div>
            </div>
            <div class="work-profitbox"><a class="scrolltoform work-profit__morelink" href="#form">Пройти регистрацию</a><span>С нами уже 20760 предпринимателей</span></div>
          </div>
        </div>
      </div>
    </section>
    {/* <section class="brand">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="brand-title">Бренд <span class="brand-title--orange">Noku</span></h2>
          </div>
          <div class="col-md-7">
            <p class="brand-info"><span class="brand-info--bold">Дмитрий Шевчук</span> - <span class="brand-info--orange">создатель и владелец бренда Noku</span> и др. <br> Продал более 20 000 бесконтактных термометров, более 10 000 соплеотсосов и других товаров.</p>
            <div class="brand-infoimg">
              <p class="brand-infoimg-title">Товары Noku <span class="brand-infoimg-title--orange">выше товаров розетки</span></p><img src="img/brand-img.svg" alt="">
            </div>
          </div>
          <div class="col-md-5">
            <div class="brand-production">
              <p class="brand-production-title">Продукция <br> <span class="brand-production-title--orange">бренда Noku</span></p><img src="img/productionbrandnoku.svg" alt="">
            </div>
            <div class="brand-production__info">
              <p><span class="brand-production__info brand-production__info--bold brand-production__info--orange">Наша цель</span> помочь Вам стать владельцем бренда  в eCommerce  и мы учим именно этому. <span class="brand-production__info--bold">Приходите и научитесь у лучших специалистов.</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="result__wrapper">
      <div class="container" id="result">
        <div class="row">
          <div class="col-md-12">
            <h2 class="result__wrapper-title">Как мы работаем <span>с дропшипперами?</span></h2>
          </div>
          <div class="col-md-12">
            <div class="result__types">
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/dropshipping-item1.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Вы рекламируете товары в соц сетях, досках объявлениях, форумах или на земле</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/dropshipping-item2.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Покупатель делает у Вас заказ, платит Вам или оформляет наложенный платеж</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/dropshipping-item3.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Вы загружаете необходимые данные о заказе в своем личном кабинете платформы Buy&amp;Sell</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/dropshipping-item4.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Заявки обрабатываются профессиональными операторами Call Centre при необходимости</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/dropshipping-item5.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Товар проверяется, качественно упаковывается и отправляется покупателю</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/dropshipping-item6.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Товар проверяется, качественно упаковывается и отправляется покупателю</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="result__wrapper newresult__wrapper">
      <div class="container" id="result">
        <div class="row">
          <div class="col-md-12">
            <h2 class="result__wrapper-title">Как мы работаем <span>с партнерами?</span></h2>
          </div>
          <div class="col-md-12">
            <div class="result__types">
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item1.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Вы рекламируете товары в соц сетях, досках объявлениях, форумах или на земле</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item2.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Покупатель делает у Вас заказ, платит Вам или оформляет наложенный платеж</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item3.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Вы загружаете необходимые данные о заказе в своем личном кабинете платформы Buy&amp;Sell</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item4.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Заявки обрабатываются профессиональными операторами Call Centre при необходимости</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item5.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Товар проверяется, качественно упаковывается и отправляется покупателю</p>
                </div>
              </div>
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item6.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Товар проверяется, качественно упаковывается и отправляется покупателю</p>
                </div>
              </div>
            </div>
            <div class="newresult__types-info">
              <div class="result__types-item">
                <div class="result__types-item--header"><img src="img/result-item7.svg" alt=""></div>
                <div class="result__types-item--info">
                  <p>Вы рекламируете товары в соц сетях, досках объявлениях, форумах или на земле</p>
                </div>
              </div>
              <p> С платформой <span>Buy&amp;Sell</span> предприниматели свободны от звонков клиентов, подтверждения заявок, формирования 	ТТН, упаковки товара и отправления заказов по почте. Работая с нами, Вы получаете не только прибыль, но и 	более ценный ресурс – время! Генерируйте идеи, изучайте интернет-маркетинг, увеличивайте эффективность своих рекламных кампаний и зарабатывайте на трендовых товарах <br><br> * Все результаты индивидуальны и зависят от личных способностей и качеств</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="readytoearn__wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="readytoearn-title">Готов заработать <br> <span>свой первый капитал?</span></h2>
            <p class="readytoearn-subtitle">Тогда регистрируйся в Buy &amp; Sell</p><a class="readytoearn-link" href="">Я готов!</a>
          </div>
        </div>
      </div>
    </section>
    <section class="dropshipping-platform__wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="dropshipping-platform-title">Кому подойдет <span>наша <br> дропшиппинг-платформа?</span></h2>
            <div class="dropshipping-platform-items">
              <div class="dropshipping-platform-item">
                <div class="dropshipping-platform-item-title">Предпринимателю</div>
                <div class="dropshipping-platform-item-content">Вы хотите запустить свой бизнес с Китаем и сразу все делать правильно, не тратя деньги и нервы на неудачные попытки</div>
              </div>
              <div class="dropshipping-platform-item">
                <div class="dropshipping-platform-item-title">Домохозяйке</div>
                <div class="dropshipping-platform-item-content">Вы ищите новое направление для инвестиций с высокой маржинальностью и минимальными рисками</div>
              </div>
              <div class="dropshipping-platform-item">
                <div class="dropshipping-platform-item-title">Арбитражнику</div>
                <div class="dropshipping-platform-item-content">Вы стремитесь получать дополнительный доход или начать собственный бизнес так, чтобы выйти на хорошие заработки, и только потом уволиться</div>
              </div>
              <div class="dropshipping-platform-item">
                <div class="dropshipping-platform-item-title">Производителю</div>
                <div class="dropshipping-platform-item-content">Вы хотите запустить свой бизнес с Китаем и сразу все делать правильно, не тратя деньги и нервы на неудачные попытки</div>
              </div>
              <div class="dropshipping-platform-item">
                <div class="dropshipping-platform-item-title">Студенту</div>
                <div class="dropshipping-platform-item-content">Вы ищите новое направление для инвестиций с высокой маржинальностью и минимальными рисками</div>
              </div>
              <div class="dropshipping-platform-item">
                <div class="dropshipping-platform-item-title">Интернет-маркетологу</div>
                <div class="dropshipping-platform-item-content">Вы стремитесь получать дополнительный доход или начать собственный бизнес так, чтобы выйти на хорошие заработки, и только потом уволиться</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="quetion-partner">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="quetion-partner-title"><span>Отзывы</span> партнеров</h2>
            <p class="quetion-partner-subtitle">Личное мнение каждого пользователя</p>
          </div>
          <div class="col-md-12">
            <div class="quetion-carousel owl-carousel owl-theme">
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
              <div class="quetion-item">
                <div class="quetion-item--header">
                  <p class="quetion-subtitle">Мама в декрете</p>
                  <p class="quetion-title">Анна Бондарчук</p>
                </div>
                <div class="quetion-item--body">
                  <p class="quetion-item-info">Buy &amp; Sell подарил мне самое крутое чувство, когда ты занимаешься своими делами, гуляешь с детьми и понимаешь, что работа идет, что деньги зарабатываются и появляется ощущение, что ты что-то хорошее делаешь в жизни.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="jointypes__wrapper" id="jointypes">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <h2>Варианты<span> участия</span></h2>
          </div>
          <div class="col-md-12">
            <div class="packs__wrapper">
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="packs-item">
                      <div class="packs-item--header"><span>ПАКЕТ обучения в “Школе предпринимателя”</span>
                        <p>standart</p>
                      </div>
                      <div class="packs-item--body">
                        <div class="packs-item--odd">
                          <p>База проверенных поставщиков - 50 товаров</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Интернет-магазин под ключ - стандартный пакет</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Выход на Rozetka.ua  (+ интеграция)</p>
                        </div>
                        <div class="packs-item--even">
                          <p>CRM-платформа:<br><span>управление товарами, заказами, финансами</span></p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Возможность продавать на уже продвинутых интернет-магазинах</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Доступ к комьюнити e-comerce предпринимателей</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Консультация и сопровождение</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Персональный менеджер</p>
                        </div>
                        <div class="packs-item--odd" style="text-align: center;">
                          <p>Школа E-COMMERCE:</p>
                        </div>
                        <div class="packs-item--even packs-item--light">
                          <p>-выбор ниши, выбор направлений</p>
                          <p>-чек-лист по выбору поставщика</p>
                          <p>-виды взаимодействий</p>
                          <p>-тестирование товара поставщика</p>
                        </div>
                        <div class="packs-item--odd packs-item--light">
                          <p>-создание карточки товара: фото, видео, описание</p>
                        </div>
                        <div class="packs-item--even packs-item--light">
                          <p>-финасовый учет</p>
                          <p>-автоматизация обработки заказа</p>
                        </div>
                        <div class="packs-item--odd packs-item--light">
                          <p>-выход на Rozetka.ua и др. маркетплейсы (ФОП, yml, интернет-магазин)</p>
                          <p>-вывод товара в ТОП на ROZETKA.ua</p>
                          <p>-как зарабатывать максимум на ROZETKA.ua</p>
                          <p>-Стратегия, обучение работы e-commerce агрегатором</p>
                        </div>
                        <div class="packs-item--even packs-item--light">
                          <p>-SMM, YouTube, радио, ТВ</p>
                          <p>-работа с блогерами</p>
                          <p>-работа с целевой аудиторией</p>
                          <p>-Позиционирование и бренд</p>
                        </div>
                        <div class="packs-item--footer">
                          <div class="packs-item--footer__pricebox">
                            <p>Цена пакета</p>
                            <p>$850</p>
                          </div><a class="pack_link webinar__info-link" href="javascript:void(0);">Купить</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="packs-item packs-item--pink">
                      <div class="packs-item--header"><span>ПАКЕТ обучения в “Школе предпринимателя”</span>
                        <p>business</p>
                      </div>
                      <div class="packs-item--body">
                        <div class="packs-item--odd">
                          <p>Включены все услуги пакета “Standart” +200 уникальных товаров</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Интернет-магазин под ключ  Python/Django</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Бизнес-завтрак с Дмитрием Шевчук и успешными партнерами</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Личная встреча и консультация</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Разработка логотипа и фирменного стиля, названия бренда</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Создание страниц в FB и Instagram</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Настройка рекламной компании.</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Контент Стратегия CMM</p>
                        </div>
                        <div class="packs-item--footer">
                          <div class="packs-item--footer__pricebox">
                            <p>Цена пакета</p>
                            <p>$1350</p>
                          </div><a class="pack_link webinar__info-link" href="javascript:void(0);">Купить</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="packs-item packs-item--lightgreen">
                      <div class="packs-item--header"><span>ПАКЕТ обучения в “Школе предпринимателя”</span>
                        <p>premium</p>
                      </div>
                      <div class="packs-item--body">
                        <div class="packs-item--odd">
                          <p>Включены все услуги пакета “Standart” и “Business” +безлимит к товарам поставщиков</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Интернет-магазин под ключ - Python/Django</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Бизнес-завтрак с Дмитрием Шевчук и успешными партнерами</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Call Centre</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Свой склад или Fulfilment</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Личная встреча и консультация</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Разработка логотипа и фирменного стиля</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Настройка рекламной компании FB и Instagram</p>
                        </div>
                        <div class="packs-item--odd">
                          <p>Создание страниц в FB и Instagram</p>
                        </div>
                        <div class="packs-item--even">
                          <p>Контент  Стратегия для SMM</p>
                        </div>
                        <div class="packs-item--footer">
                          <div class="packs-item--footer__pricebox packs-item--odd">
                            <p>Цена пакета</p>
                            <p>$2400</p>
                          </div><a class="pack_link webinar__info-link" href="javascript:void(0);">Купить</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="footer-info">
              <div class="footer-boxlogo">
                <div class="logo"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="161" height="50"><defs><pattern id="A" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 161 50"><image width="161" height="50" xlink:href="data:image/png;base64,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"/></pattern></defs><path fill="url(#A)" d="M0 0h161v50H0z"/></svg></div>
                <div class="footer-socialmedia"><a href="https://www.facebook.com/buysell19/?modal=admin_todo_tour"><img src="img/facebook.svg" alt="" style="opacity: 0.5;"></a><a href="https://www.instagram.com/buysellua/?hl=ru"><img src="img/instagram.svg" alt=""></a><a href=""><img src="img/youtube.svg" alt=""></a><a href=""><img src="img/telegram.svg" alt=""></a><img src="img/mastervisa.svg" alt=""></div>
              </div>
              <div class="footer-nav">
                <ul class="footer-items">
                  <li><a href="">Как мы работаем</a></li>
                  <li><a href="">Кому подойдет</a></li>
                  <li><a href="">Отзывы партнеров</a></li>
                  <li><a href="">Варианты участия</a></li>
                </ul>
              </div>
              <div class="footer-box footer-box--adress">
                <p class="footer-title">Адрес</p>
                <p class="footer-box--info">г. Киев ул. Хрещатик, 10 info@buy-sell.com.ua</p>
              </div>
              <div class="footer-box">
                <p class="footer-title">Телефон</p><a href="">+380 44 390 12 34</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="footer-socialmedia footer-mobilesociamedia"><a href=""><img src="img/facebook.svg" alt="" style="opacity: 0.5;"></a><a href=""><img src="img/instagram.svg" alt=""></a><a href=""><img src="img/youtube.svg" alt=""></a><a href=""><img src="img/telegram.svg" alt=""></a><img src="img/mastervisa.svg" alt=""></div>
      <p class="copyright">Copyright 2019</p>
    </footer>  */}

      </Fragment>
    );
  };

export default LandingFirstPage;

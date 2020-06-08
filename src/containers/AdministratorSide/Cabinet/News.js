import React, { Component, Fragment } from 'react';
import { Input, Button, Icon } from 'antd';
import styles from './Cabinet.module.css';
import avatar2 from '../../../img/pictures/newssenderavatar.png';

const { TextArea } = Input;

const news = [
  {
    name: 'Hexagon',
    publishdate: '13/03/2019  в 11:23',
    avatar: avatar2,
    text:
      'Друзья, привет!  Свершилось - теперь все инструкции по работе с платформой Buy-Sell вы можете найти на нашем сайте Top Zendesk - https://gofriends.zendesk.com/Все структурировали.'
  }
];

class News extends Component {
  render() {
    const { avatar } = this.props;
    return (
      //   <div>
      <div className={styles.newsWrapper}>
        <TextArea
          autosize={{ minRows: 6, maxRows: 6 }}
          className={styles.textArea}
        />
        <div className={styles.newsPublish}>
          <div className={styles.controls}>
            <span>Прикрепить: </span>
            <Icon type="camera" style={{ fontSize: 20 }} />
            <Icon type="youtube" style={{ fontSize: 20 }} />
          </div>
          <Button className={styles.btn}>Опубликовать</Button>
        </div>
        {news.map(item => (
          <Fragment>
            <div className={styles.newsItemsWrapper}>
              <div className={styles.usertitle}>
                <div className={styles.user1imagecontainer}>
                  <img src={item.avatar} />
                </div>
                <div>
                  <p className={styles.fonts}>{item.name}</p>
                  <p className={styles.date}>{item.publishdate}</p>
                </div>
              </div>
              <p className={styles.fonts}>{item.text}</p>
            </div>
            <div className={styles.comments}>
              <div>
                <Icon type="like" />
                Мне нравится
              </div>
              <div>
                <Icon type="message" />
                Коментарии(0)
              </div>
            </div>
          </Fragment>
        ))}
        <div className={styles.sendcomment}>
          <div className={styles.comentstop}>
            <div className={styles.user1imagecontainer}>
              <img src={avatar} />
            </div>
            <Input placeholder="Ваш комментарий" style={{ width: '80%' }} />
          </div>
          <Button className={styles.btn} style={{ marginLeft: 'auto' }}>
            Отправить
          </Button>
        </div>
      </div>
      //   </div>
    );
  }
}

export default News;

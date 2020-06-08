import React, { Component } from 'react';
import styles from './Cabinet.module.css';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import avatar from '../../../img/avatar.png';

export default class Profile extends Component {
  render() {
    const { user, company } = this.props;
    return (
      <div className={styles.userBlock}>
        <div className={styles.userContacts}>
          <div className={styles.userImg}>
            <img src={user.avatarImage || avatar} alt="" />
          </div>
          <div className={styles.userInfo}>
            <h5 className={styles.userName}>
              {`${user.firstName || 'User'} ${user.lastName || ''}`}
            </h5>
            <div className={styles.userDataRow}>
              <div>Статус:</div>
              <div className={styles.notActivated}>
                Активирован
                <Icon style={{ marginLeft: 5, fontSize: 12 }} type="check" />
              </div>
            </div>
            <div className={styles.userDataRow}>
              <div>Статус Компании:</div>

              <div className={styles.notActivated}>
                Активирован{' '}
                <Icon style={{ marginLeft: 5, fontSize: 12 }} type="check" />
              </div>
            </div>
            <div className={styles.userDataRow}>
              <div> E-Mail: </div>
              <div> {user.email}</div>
            </div>
            <div className={styles.userDataRow}>
              <div>Компания: </div>
              <div> {company.name}</div>
            </div>
            <div className={styles.userDataRow}>
              <div>Телефон:</div>
              <div> {company.phone}</div>
            </div>
            <div className={styles.userDataRow}>
              <div> Веб-сайт:</div>
              <div> {company.url}</div>
            </div>
          </div>
        </div>

        <Link to="/admin/profile_settings" className={styles.editBtn}>
          Редактировать профиль
        </Link>

        {/* {this.props.user.role === 'CONTRACTOR' ? '' :
                          <div className={styles.description}>
                              <p>Для того чтобы пользоваться услугами Маркетплейса, Вы должны приобрести один из вариантов
                                  пакетов доступа, цена на которые 27 000 грн, 45 000 и 59 000 грн. Все доступы,
                                  которые дает каждый пакет, указаны в описании.
                              </p>
                          </div>
                      } */}
        {/* </div> */}
        {/* <div className={styles.wrapperpocket}>
          <h2 className={styles.pocketHead}>Ваш пакет</h2>
          <div className={styles.contentWrapper}>
            <div className={styles.contenthead}>
              <div className={styles.status}>
                <span>Базовый</span>
                <span>Активирован</span>
              </div>
              <div className={styles.price}>35.000 грн</div>
            </div>
            <div className={styles.content}>content</div>
            <Link to="#" className={styles.butBtn}>
              Купить полный
            </Link>
          </div>
        </div> */}
        {/* {this.props.user.role === 'CONTRACTOR' ? '' :
                      <div className={styles.videoTariff}>
                          <h4>Для чего нужен пакет</h4>
                          <div className={styles.videoBlock}>
              <iframe  src="https://www.youtube.com/embed/MizPu-dTPQU"
                  title="about pack"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen></iframe>
                          </div>
                      </div>
                  } */}
      </div>
    );
  }
}

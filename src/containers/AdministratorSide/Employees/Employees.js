import React, { Component } from 'react';
import styles from './Employees.module.css';
import 'antd/dist/antd.css';
import { Modal, Table } from 'antd';
import avatar from '../../../img/avatar.png';

const dataSource = [
  // {
  //   key: '1',
  //   name: 'Имя:Роман ',
  //   avatar: avatar,
  //   surname: 'Фамилия: Кукшин',
  //   patronymic: 'Отчество: Анатольевич',
  //   accessRights: 'Права доступа: Владелец',
  //   phone: 'Телефон: +38099888777'
  // },
  // {
  //   key: '2',
  //   name: 'iPhone XR 64GB Space Grey ',
  //   avatar: avatar,
  //   surname: 'Фамилия: Кукшин',
  //   patronymic: 'Отчество: Анатольевич',
  //   accessRights: 'Права доступа: Владелец',
  //   phone: 'Телефон: +38099888777'
  // },
  // {
  //   key: '3',
  //   name: 'iPhone XR 64GB Space Grey ',
  //   avatar: avatar,
  //   surname: 'Фамилия: Кукшин',
  //   patronymic: 'Отчество: Анатольевич',
  //   accessRights: 'Права доступа: Владелец',
  //   phone: 'Телефон: +38099888777'
  // },
  // {
  //   key: '4',
  //   name: 'iPhone XR 64GB Space Grey ',
  //   avatar: avatar,
  //   surname: 'Фамилия: Кукшин',
  //   patronymic: 'Отчество: Анатольевич',
  //   accessRights: 'Права доступа: Владелец',
  //   phone: 'Телефон: +38099888777'
  // },
  // {
  //   key: '5',
  //   name: 'iPhone XR 64GB Space Grey ',
  //   avatar: avatar,
  //   surname: 'Фамилия: Кукшин',
  //   patronymic: 'Отчество: Анатольевич',
  //   accessRights: 'Права доступа: Владелец',
  //   phone: 'Телефон: +38099888777'
  // }
];

const columns = [
  {
    render: (name, item) => (
      <span className={styles.userName}>
        <span className={styles.userImg}>
          <img src={item.avatar} alt="" />
        </span>
        <span>{name}</span>
      </span>
    ),
    title: 'Имя',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Фамилия',
    dataIndex: 'surname',
    key: 'surname'
  },
  {
    title: 'Количество',
    dataIndex: 'patronymic',
    key: 'patronymic'
  },
  {
    title: 'Права доступа',
    dataIndex: 'accessRights',
    key: 'accessRights'
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone'
  }
];

class Employees extends Component {
  state = { visible: false };

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
    return (
      <div>
        <div className={styles.top}>
          <h3 className={styles.title}>Сотрудники </h3>

          <button className={styles.addBtn} onClick={this.showModal} disabled>
            Добавить сотрудника
          </button>
        </div>

        <div className={styles.employeesTable}>
          <div className={styles.searchEmployees}>
            <input type="search" />
            <select defaultValue="Должность" className={styles.choosePosition}>
              <option value="Должность" disabled hidden>
                Должность
              </option>
              <option value="Админ">Админ</option>
              <option value="Админ">Админ</option>
              <option value="Админ">Админ</option>
            </select>
            <select defaultValue="Права доступа" className={styles.selectRights}>
              <option value="Права доступа" disabled hidden>
                Права доступа
              </option>
              <option value="Владелец">Владелец</option>
              <option value="Владелец">Владелец</option>
              <option value="Владелец">Владелец</option>
            </select>
            <div>
              <input type="submit" value=" " />
            </div>
          </div>
          <div className={styles.hardCodeDiv}><p className={styles.hardCode}>Страница в разработке</p></div>
          {/* <Table
            dataSource={dataSource}
            columns={columns}
            showHeader={false}
            className={styles.productTable}
          /> */}
        </div>

        <div className="addEmployeeModal">
          <Modal
            title="Добавить сотрудника"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <form className={styles.addEmployee}>
              <div>
                <label>
                  Укажите Email, на который будет отправлено приглашение
                </label>
                <input type="text" />
              </div>
              <div>
                <label>Укажите имя приглашаемого сотрудника</label>
                <input type="text" />
              </div>
              <div>
                <label>Укажите роль сотрудника</label>
                <input type="text" />
              </div>
              <button className={styles.invite}>Пригласить</button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Employees;

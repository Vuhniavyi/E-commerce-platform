import React, { Component } from 'react';
import { Button, Icon, Input, notification, Modal, Popconfirm } from 'antd';

import { createContactPerson } from '../../../actions/requestNovaPoshta';
import { updateNovaPoshtaData } from '../../../actions/novaPoshtaActions';

class NovaPoshtaCreateContactPerson extends Component {
  state = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Phone: '',
    modalVisible: false
  };
  toogleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  handleInputs = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  addContactPerson = () => {
    // const { apiKey, CounterpartyRef } = this.props;
    // const { FirstName, MiddleName, LastName, Phone } = this.state;
    // const data = { CounterpartyRef, FirstName, MiddleName, LastName, Phone };
    // createContactPerson(apiKey, data)
    //   .then(({ data }) =>
    //     data.success
    //       ? data.data[0]
    //       : data.errors.forEach(el => notification.error({ message: el }))
    //   )
    //   .then(data => updateNovaPoshtaData({ senders: [{ ...data }] }))
    //   .then(result => {
    //     this.toogleModal();
    //   });
  };

  render() {

    const { FirstName, MiddleName, LastName, Phone, modalVisible } = this.state;
    const { toogleModal, handleInputs, addContactPerson } = this;

    return (
      <div>
        <Button onClick={toogleModal}>Добавить контактное лицо</Button>

        <Modal
          title="Новое контактное лицо"
          visible={modalVisible}
          onOk={addContactPerson}
          footer={
            <>
              <Button>Выйти без сохранения</Button>
              <Button
                type="primary"
                onClick={addContactPerson}
                disabled={!FirstName || !MiddleName || !LastName || !Phone}
              >
                Сохранить контактное лицо
              </Button>
            </>
          }
          onCancel={toogleModal}
          // okText="Сохранить контактное лицо"
          // cancelText="Выйти без сохранения"
        >
          <p>ВНИМАНИЕ!</p>
          <p>
            Согласно требованиям Новой Почты все данные необходимо вносить
            только на украинском языке.
          </p>
          <p>Все поля обязательны к заполнению.</p>
          <Input
            id="FirstName"
            value={FirstName}
            style={{ width: 300, margin: 0 }}
            onChange={handleInputs}
            placeholder="Имя"
            required
          />
          <Input
            id="MiddleName"
            value={MiddleName}
            style={{ width: 300, margin: '10px 0 0' }}
            onChange={handleInputs}
            placeholder="Фамилия"
            required
          />
          <Input
            id="LastName"
            value={LastName}
            style={{ width: 300, margin: '10px 0 0' }}
            onChange={handleInputs}
            placeholder="Отчество"
            required
          />
          <Input
            id="Phone"
            value={Phone}
            // pattern="[0][0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            style={{ width: 300, margin: '10px 0 0' }}
            onChange={handleInputs}
            placeholder="Номер телефона"
            required
          />
        </Modal>
      </div>
    );
  }
}

export default NovaPoshtaCreateContactPerson;

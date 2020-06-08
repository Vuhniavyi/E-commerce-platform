import React, { Component } from 'react';
import { notification } from 'antd';
// import NovaPoshtaCreateContactPerson from './NovaPoshtaCreateContactPerson';
import {
  getCounterpartyContactPersons,
  createContactPerson,
  deleteContactPerson
} from '../../../actions/requestNovaPoshta';
import {
  // getNovaPoshtaSavedData,
  updateNovaPoshtaData
} from '../../../actions/novaPoshtaActions';

class NovaPoshtaSendersList extends Component {
  state = {
    sendersList: []
  };

  handleInputs = e => {
    this.setState(
      { [e.target.id]: e.target.value },
      () =>
        this.state.invest &&
        this.state.rate &&
        this.state.duration &&
        this.calculateInterestAmount()
    );
  };

  addContactPerson = async e => {
    e.preventDefault();
    const { apiKey, CounterpartyRef } = this.props;
    const { FirstName, MiddleName, LastName, Phone } = this.state;
    const data = { CounterpartyRef, FirstName, MiddleName, LastName, Phone };
    createContactPerson(apiKey, data)
      .then(({ data }) =>
        data.success
          ? data.data[0]
          : data.errors.forEach(el => notification.error({ message: el }))
      )
      .then(data => updateNovaPoshtaData({ senders: [{ ...data }] }));
  };

  removeContactPerson = Ref => {
    const { apiKey } = this.props;
    deleteContactPerson(apiKey, Ref)
      .then(({ data }) =>
        data.success
          ? data.data
          : data.errors.forEach(el => notification.error({ message: el }))
      )

    // updateNovaPoshtaData({ senders: [{ ...data }] })
  };

  componentDidMount = async () => {
    const { apiKey, CounterpartyRef } = this.props;
    getCounterpartyContactPersons(apiKey, CounterpartyRef)
      .then(({ data }) =>
        data.success
          ? data.data
          : data.errors.forEach(el => notification.error({ message: el }))
      )
      .then(sendersList => this.setState({ sendersList }));
  };

  render() {
    const { apiKey, CounterpartyRef } = this.props;
    const { sendersList } = this.state;
    const { removeContactPerson } = this;

    return (
      <>
        <h2>Контактные лица для отправки заказов:</h2>

        {sendersList && sendersList.length ? (
          <ul style={{ marginLeft: 20 }}>
            {sendersList.map((el, index) => (
              <li key={index} >
                <i style={{ background: '#eeeeee', borderRadius: 4 }}>
                  {el.Description}, {el.Phones}
                </i>
                {/* <Popconfirm
                  title={<b>Вы уверены что хотите удалить контактное лицо?</b>}
                  onConfirm={() => removeContactPerson(el.Ref)}
                  onCancel={null}
                  okText="Да, удалить"
                  cancelText="Нет, я передумал"
                >
                  <Tooltip placement="right" title="Удалить контактное лицо">
                    <Icon
                      type="close-circle"
                      style={{ color: 'red', marginLeft: 15 }}
                    />
                  </Tooltip>
                </Popconfirm> */}
              </li>
            ))}
          </ul>
        ) : null}
        {/* <NovaPoshtaCreateContactPerson
          apiKey={apiKey}
          CounterpartyRef={CounterpartyRef}
        /> */}
      </>
    );
  }
}

export default NovaPoshtaSendersList;

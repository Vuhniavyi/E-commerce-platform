import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import {
  Button,
  Input,
  Modal,
  Select,
  Tabs,
  Tooltip,
  notification,
} from 'antd';
import './CreateTTNOrderSelf.css';

import { addTTNOrderSelf } from 'actions/ordersAction';
import { getNovaPoshtaSavedData } from 'actions/novaPoshtaActions';
import {
  getCounterpartyContactPersons,
  createNovaPoshtaTTN,
} from 'actions/requestNovaPoshta';

const { Option } = Select;
const Tab = Tabs.TabPane;

const GeterateDate = moment().format('l');

const deliveryMethod = {
  inWarhouse: 'на отделение',
  inAdress: 'на адрес',
};

class CreateTTNOrderSelf extends Component {
  state = {
    modalVisible: false,
    packing: {
      length: '',
      width: '',
      height: '',
    },
    infoDelivery: {
      Weight: null,
      VolumeGeneral: null,
      Description: this.props.order.product.name,
      Cost: this.props.order.totalPrice,
    },
    sendersInfo: {
      ContactSender: null,
      SendersPhone: null,
      CitySender: null,
      SenderAddress: null,
    }
  };

  toogleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleChangeSender = (value) => {
    const [ContactSender, SendersPhone] = value.split(' ');

    this.setState({
      sendersInfo: {
        ContactSender,
        SendersPhone
      }
    })
  };

  handleChangeSenderAdress = (value) => {
    const [CitySender, SenderAddress] = value.split(' ');
    this.setState({
      sendersInfo: {
        ...this.state.sendersInfo,
        CitySender,
        SenderAddress,
      }
    });
  };

  calculateVolume = () => {
    const VolumeGeneral =
      Object.values(this.state.packing).reduce((acc, el) => acc * el, 1) /
      1000000;

    VolumeGeneral &&
      this.setState(state => {
        return {
          infoDelivery: {
            ...state.infoDelivery,
            VolumeGeneral
          }
        };
      });
  };

  onChange = ({ target: { value, name } }) => {
    if (name === 'length' || name === 'width' || name === 'height') {
      return this.setState(state => ({
        packing: {
          ...state.packing,
          [name]: value,
        }
      }), () => this.calculateVolume())
    }

    return this.setState(state => ({
      infoDelivery: {
        ...state.infoDelivery,
        [name]: value,
      }
    }))
  }

  prepareData = () => {
    const { apiKey, order, senderRef } = this.props;
    const {
      infoDelivery: { VolumeGeneral, Weight, Description, Cost },
      sendersInfo: { ContactSender, SendersPhone, CitySender, SenderAddress },
    } = this.state;

    const data = {
      apiKey: apiKey,
      modelName: "InternetDocument",
      calledMethod: "save",
      methodProperties: {
        NewAddress: "1",
        PayerType: "Sender",
        PaymentMethod: "Cash",
        CargoType: "Cargo",
        VolumeGeneral: VolumeGeneral,
        Weight: Weight,
        ServiceType: order.ServiceType || 'WarehouseWarehouse',
        SeatsAmount: "1",
        Description: Description,
        Cost: Cost,
        CitySender,
        Sender: senderRef,
        SenderAddress: SenderAddress,
        ContactSender: ContactSender,
        SendersPhone: SendersPhone,
        RecipientCityName: order.cityName,
        RecipientArea: "",
        RecipientAreaRegions: "",
        RecipientAddressName: order.refIdPoshta,
        RecipientHouse: "",
        RecipientFlat: "",
        RecipientName: "Потапов Алексей Петрович", // order.fullName,
        RecipientType: "PrivatePerson",
        RecipientsPhone: order.phoneNumber,
        DateTime: moment().format('l'),
      }
    };

    return data;

  }

  createTTN = () => {
    const { order: { id }, updateTtnOrder } = this.props;

    if (this.checkFieldsBeforeCreateTTN()) return;
    const params = this.prepareData();

    createNovaPoshtaTTN(params)
      .then(({ data }) => {
        if (data.success) {
          const ttn = data.data[0].IntDocNumber;
          addTTNOrderSelf(id, { ttn })
            .then((res) => {
              updateTtnOrder(id, ttn);
              notification.success({ message: `Создана ТТН: ${res.ttn}` });
            })
            .then(() => this.toogleModal())
            .catch(err => console.error(err));
        } else {
          data.errors.forEach((el) => notification.error({ message: el }))
        }
      })
  };

  checkFieldsBeforeCreateTTN = () => {
    const {
      infoDelivery: {
        Cost,
        Description,
        Weight,
        VolumeGeneral,
      },
      sendersInfo: {
        ContactSender,
        CitySender,
      }
    } = this.state;

    let errors = 0;

    !ContactSender &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не выбран отправитель',
      });
    !CitySender &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не выбран адрес отправителя',
      });
    // !ServiceType &&
    //   ++errors &&
    //   notification.warning({
    //     duration: 5 + errors,
    //     message: 'Не выбран тип доставки',
    //   });
    !Description &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не заполнено описание посылки',
      });
    !Cost &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не указана оценочная стоимость посылки',
      });
    !Weight &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не указан вес посылки',
      });
    !VolumeGeneral &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Заполните все поля габаритов упаковки',
      });
    return errors;
  };

  componentDidMount = async () => {
    const { apiKey, senderRef } = this.props;
    const novaPoshtaUserData = await getNovaPoshtaSavedData();
    let contactPersons = await getCounterpartyContactPersons(apiKey, senderRef);

    contactPersons = contactPersons.data.data;

    this.setState({
      novaPoshtaUserData,
      contactPersons,
    });
  };

  render() {
    const {
      packing: { length, width, height },
      infoDelivery: { Weight, Description, Cost },
      modalVisible,
      contactPersons,
      novaPoshtaUserData,
    } = this.state;

    const {
      toogleModal,
      onChange,
      handleChangeSender,
      handleChangeSenderAdress,
      createTTN,
    } = this;

    const { order } = this.props;

    return (
      <>
        <Tooltip
          title={
            order.ttn
              ? 'Заказу уже присвоен ТТН'
              : "Для самостоятельной отпраки введите ключ Новой Почты в 'Настройки компании'"
          }
          // visible={!this.props.apiKey || order.ttn}
          trigger={!this.props.apiKey || order.ttn ? 'hover' : 'none'}>
          <Button
            className='createTTN_mainButton sendYourself'
            onClick={toogleModal}
            disabled={!this.props.apiKey || order.ttn}
          >
            Отправить самому
          </Button>
        </Tooltip>
        <Modal
          centered
          visible={modalVisible}
          onCancel={toogleModal}
          footer={[
            <Button form='createTTN' onClick={createTTN}>
              Создать ТТН
            </Button>,
          ]}
          okButtonProps={{ disabled: true }}
          width={750}>
          <form id='createTTN' onSubmit={createTTN}>
            <Tabs
              defaultActiveKey='3'
              className='createTTN_tabs'>
              <Tab tab='Данные об отправителе' key='1'>
                <Select
                  style={{ width: '100%', marginBottom: 16 }}
                  placeholder='Выберите отправителя'
                  onChange={handleChangeSender}>
                  {contactPersons &&
                    contactPersons.map((el) => (
                      <Option value={`${el.Ref} ${el.Phones}`}>
                        {el.Description}, {el.Phones}
                      </Option>
                    ))}
                  {/* <Option value="create">Создать отправителя</Option> */}
                </Select>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Выберите отделение для отправки'
                  onChange={handleChangeSenderAdress}>
                  {novaPoshtaUserData &&
                    novaPoshtaUserData.addresses.map((el) => (
                      <Option value={`${el.settlementRef} ${el.warehouseRef}`}>
                        {el.settlementValue}, {el.warehouseValue}
                      </Option>
                    ))}
                </Select>
              </Tab>
              <Tab tab='Данные о получателе' key='2'>
                <p>
                  <b>Тип доставки: </b>
                  {deliveryMethod.inWarhouse}
                </p>
                <p>
                  <b>Адрес доставки: </b>
                  {order.cityName}<br></br>
                  {order.postOfficeName}
                </p>
                <p>
                  <b>Получатель: </b>
                  {order.fullName}
                </p>
                <p>
                  <b>Телефон получателя: </b>
                  {order.phoneNumber}
                </p>
              </Tab>

              <Tab tab='Данные о посылке' key='3'>
                <div
                  className='createTTN_inputsGroup'
                  style={{ marginLeft: 16 }}>
                  <label>
                    <Input
                      type='text'
                      name='Description'
                      value={Description}
                      style={{ width: 452 }}
                      onChange={onChange}
                      placeholder='Наименование'
                    />
                  </label>
                  <label>
                    Оценочная стоимость:{' '}
                    <Input
                      type='number'
                      name='Cost'
                      value={Cost}
                      style={{ width: 296 }}
                      onChange={onChange}
                      placeholder='Оценочная стоимость'
                    />{' '}
                    ₴
                  </label>
                  <label>
                    Вес:{' '}
                    <Input
                      type='number'
                      step='0.1'
                      name='Weight'
                      value={Weight}
                      style={{ width: 420 }}
                      onChange={onChange}
                      placeholder='Вес'
                    />{' '}
                    кг
                  </label>

                  <label>
                    Габариты упаковки:
                    <input
                      type='number'
                      step='1'
                      placeholder='Длина'
                      name='length'
                      value={length}
                      style={{ width: 100 }}
                      onChange={onChange}
                    />
                    <input
                      type='number'
                      step='1'
                      placeholder='Ширина'
                      name='width'
                      value={width}
                      style={{ width: 100, margin: '0 7px' }}
                      onChange={onChange}
                    />
                    <input
                      type='number'
                      step='1'
                      placeholder='Высота'
                      name='height'
                      value={height}
                      style={{ width: 100 }}
                      onChange={onChange}
                    />{' '}
                    см
                    {/* <Input
                      type="number"
                      step="0.001"
                      name="VolumeGeneral"
                      value={VolumeGeneral}
                      style={{ width: 346 }}
                      onChange={onChange}
                      placeholder="Объёмный вес"
                    />{' '}
                    м³ (1м³ = 1000л) */}
                  </label>
                </div>
              </Tab>
            </Tabs>
          </form>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiKey: state.user.novaPoshtaApiKey,
    senderRef: state.user.senderRef,
  };
}

export default connect(mapStateToProps)(CreateTTNOrderSelf);

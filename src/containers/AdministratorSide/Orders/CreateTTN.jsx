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
  notification
} from 'antd';
import './CreateTTN.css';

import { editOrder } from '../../../actions/ordersAction';
import { getNovaPoshtaSavedData } from '../../../actions/novaPoshtaActions';
import {
  getCounterpartyContactPersons,
  createNovaPoshtaTTN
} from '../../../actions/requestNovaPoshta';

const { Option } = Select;
const Tab = Tabs.TabPane;

const GeterateDate = moment().format('l');

const deliveryMethod = {
  1: 'на отделение',
  2: 'на адрес'
};

class CreateTTN extends Component {
  state = {
    order: this.props.order,
    modalVisible: false,
    ttnRequestObject: {
      apiKey: this.props.apiKey,
      modelName: 'InternetDocument',
      calledMethod: 'save',
      methodProperties: {
        NewAddress: '1',
        PayerType: 'Recipient',
        PaymentMethod: 'Cash',
        CargoType: 'Parcel',
        VolumeGeneral: null,
        Weight: null,
        ServiceType:
          this.props.order.delivery &&
          this.props.order.delivery.deliveryMethodId === 1
            ? 'WarehouseWarehouse'
            : this.props.order.delivery &&
              this.props.order.delivery.deliveryMethodId === 2
            ? 'WarehouseDoors'
            : null,
        SeatsAmount: '1',
        Description: this.props.order.contractorOrder
          ? this.props.contractorOrder.reduce(
              (acc, el, i) => (i ? acc + ', ' + el.name : acc + el.name),
              ''
            )
          : this.props.order.items.reduce(
              (acc, el, i) => (i ? acc + ', ' + el.name : acc + el.name),
              ''
            ),
        Cost: this.props.order.cost,
        CitySender: null,
        Sender: this.props.senderRef,
        SenderAddress: null,
        ContactSender: null,
        SendersPhone: null,
        RecipientCityName: this.props.order.delivery.city,
        RecipientArea: null,
        RecipientAreaRegions: null,
        RecipientAddressName:
          this.props.order.delivery.deliveryMethodId === 1
            ? this.props.order.delivery.placeNumber
            : this.props.order.delivery.deliveryMethodId === 2
            ? this.props.order.delivery.placeStreet
            : null,
        RecipientHouse:
          this.props.order.delivery.deliveryMethodId === 2
            ? this.props.order.delivery.placeHouse
            : null,
        RecipientFlat:
          this.props.order.delivery.deliveryMethodId === 2
            ? this.props.order.delivery.placeFlat
            : null,
        RecipientName: this.props.order.delivery.recipientTitle,
        RecipientType: 'PrivatePerson',
        RecipientsPhone: this.props.order.userPhone,
        DateTime: GeterateDate,
        BackwardDeliveryData: [
          {
            PayerType: 'Recipient',
            CargoType: 'Money',
            RedeliveryString: this.props.order.cost
          }
        ]
      }
    },
    packing: {
      length: '',
      width: '',
      height: ''
    }
  };

  toogleModal = () => {
    this.state.modalVisible && this.props.refreshData('');
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleChangeSender = value => {
    const [ContactSender, SendersPhone] = value.split(' ');
    this.setState((state, props) => {
      return {
        ttnRequestObject: {
          ...state.ttnRequestObject,
          methodProperties: {
            ...state.ttnRequestObject.methodProperties,
            ContactSender,
            SendersPhone
          }
        }
      };
    });
  };

  handleChangeSenderAdress = value => {
    const [CitySender, SenderAddress] = value.split(' ');
    this.setState((state, props) => {
      return {
        ttnRequestObject: {
          ...state.ttnRequestObject,
          methodProperties: {
            ...state.ttnRequestObject.methodProperties,
            CitySender,
            SenderAddress
          }
        }
      };
    });
  };

  calculateVolume = () => {
    const VolumeGeneral =
      Object.values(this.state.packing).reduce((acc, el) => acc * el, 1) /
      1000000;
    VolumeGeneral &&
      this.setState((state, props) => {
        return {
          ttnRequestObject: {
            ...state.ttnRequestObject,
            methodProperties: {
              ...state.ttnRequestObject.methodProperties,
              VolumeGeneral
            }
          }
        };
      });
  };

  handleInputs = ({ target: { value, name } }) => {
    name === 'length' || name === 'width' || name === 'height'
      ? this.setState(
          (state, props) => {
            return { packing: { ...state.packing, [name]: value } };
          },
          () => this.calculateVolume()
        )
      : this.setState((state, props) => {
          return {
            ttnRequestObject: {
              ...state.ttnRequestObject,
              methodProperties: {
                ...state.ttnRequestObject.methodProperties,
                [name]: value
              }
            }
          };
        });
  };

  createTTN = () => {
    const { id } = this.props.order;

    if (this.checkFieldsBeforeCreateTTN()) return;

    createNovaPoshtaTTN(this.state.ttnRequestObject)
      .then(({ data }) =>
        data.success
          ? data.data[0]
          : data.errors.forEach(el => notification.error({ message: el }))
      )
      .then(
        data =>
          data &&
          editOrder(id, { ttn: data.IntDocNumber, status: 2 }).then(res =>
            notification.success({ message: `Создана ТТН: ${res.ttn}` })
          )
      )
      .then(() => this.toogleModal());
  };

  checkFieldsBeforeCreateTTN = () => {
    const {
      ttnRequestObject: {
        methodProperties: {
          ContactSender,
          CitySender,
          ServiceType,
          Description,
          Cost,
          VolumeGeneral,
          Weight
        }
      }
    } = this.state;

    let errors = 0;

    !ContactSender &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не выбран отправитель'
      });
    !CitySender &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не выбран адрес отправителя'
      });
    !ServiceType &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не выбран тип доставки'
      });
    !Description &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не заполнено описание посылки'
      });
    !Cost &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не указана оценочная стоимость посылки'
      });
    !Weight &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Не указан вес посылки'
      });
    !VolumeGeneral &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Заполните все поля габаритов упаковки'
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
      contactPersons
    });
  };

  render() {
    const {
      packing: { length, width, height },
      modalVisible,
      contactPersons,
      novaPoshtaUserData,
      order,
      order: { delivery },
      ttnRequestObject: {
        methodProperties: { ServiceType, Description, Cost, Weight }
      }
    } = this.state;
    const {
      toogleModal,
      handleInputs,
      handleChangeSender,
      handleChangeSenderAdress,
      createTTN
    } = this;

    return (
      <>
        <Tooltip
          title={
            order.ttn
              ? 'Заказу уже присвоен ТТН'
              : "Для самостоятельной отпраки введите ключ Новой Почты в 'Настройки компании'"
          }
          // visible={!this.props.apiKey || order.ttn}
          trigger={!this.props.apiKey || order.ttn ? 'hover' : 'none'}
        >
          <Button
            className="createTTN_mainButton sendYourself"
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
            <Button form="createTTN" onClick={createTTN}>
              Создать ТТН
            </Button>
          ]}
          okButtonProps={{ disabled: true }}
          width={750}
        >
          <form id="createTTN" onSubmit={createTTN}>
            <Tabs defaultActiveKey="3" className="createTTN_tabs">
              <Tab tab="Данные об отправителе" key="1">
                <Select
                  style={{ width: '100%', marginBottom: 16 }}
                  placeholder="Выберите отправителя"
                  onChange={handleChangeSender}
                >
                  {contactPersons &&
                    contactPersons.map(el => (
                      <Option value={`${el.Ref} ${el.Phones}`}>
                        {el.Description}, {el.Phones}
                      </Option>
                    ))}
                  {/* <Option value="create">Создать отправителя</Option> */}
                </Select>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Выберите отделение для отправки"
                  onChange={handleChangeSenderAdress}
                >
                  {novaPoshtaUserData &&
                    novaPoshtaUserData.addresses.map(el => (
                      <Option value={`${el.settlementRef} ${el.warehouseRef}`}>
                        {el.settlementValue}, {el.warehouseValue}
                      </Option>
                    ))}
                  {/* <Option value="create">Создать новый адрес отправки</Option> */}
                </Select>
              </Tab>
              <Tab tab="Данные о получателе" key="2">
                <p>
                  <b>Тип доставки: </b>
                  {deliveryMethod[delivery.deliveryMethodId] ||
                    delivery.deliveryMethodId}
                </p>
                <p>
                  <b>Адрес доставки: </b>
                  {ServiceType === 'WarehouseWarehouse'
                    ? `${delivery.city}, отделение №${delivery.placeNumber} (${delivery.placeStreet}, ${delivery.placeHouse})`
                    : `${delivery.city}, ${delivery.placeStreet}, ${delivery.placeHouse}, ${delivery.placeFlat}`}
                </p>
                <p>
                  <b>Получатель: </b> {delivery.recipientTitle}
                </p>
                <p>
                  <b>Телефон получателя: </b> {order.userPhone}
                </p>
              </Tab>

              <Tab tab="Данные о посылке" key="3">
                <div
                  className="createTTN_inputsGroup"
                  style={{ marginLeft: 16 }}
                >
                  <label>
                    <Input
                      type="text"
                      name="Description"
                      value={Description}
                      style={{ width: 452 }}
                      onChange={handleInputs}
                      placeholder="Наименование"
                    />
                  </label>
                  <label>
                    Оценочная стоимость:{' '}
                    <Input
                      type="number"
                      step="0.01"
                      name="Cost"
                      value={Cost}
                      style={{ width: 296 }}
                      onChange={handleInputs}
                      placeholder="Оценочная стоимость"
                    />{' '}
                    ₴
                  </label>
                  <label>
                    Вес:{' '}
                    <Input
                      type="number"
                      step="0.1"
                      name="Weight"
                      value={Weight}
                      style={{ width: 420 }}
                      onChange={handleInputs}
                      placeholder="Вес"
                    />{' '}
                    кг
                  </label>

                  <label>
                    Габариты упаковки:{' '}
                    <input
                      type="number"
                      step="1"
                      placeholder="Длина"
                      name="length"
                      value={length}
                      style={{ width: 100 }}
                      onChange={handleInputs}
                    />
                    <input
                      type="number"
                      step="1"
                      placeholder="Ширина"
                      name="width"
                      value={width}
                      style={{ width: 100, margin: '0 7px' }}
                      onChange={handleInputs}
                    />
                    <input
                      type="number"
                      step="1"
                      placeholder="Высота"
                      name="height"
                      value={height}
                      style={{ width: 100 }}
                      onChange={handleInputs}
                    />{' '}
                    см
                    {/* <Input
                      type="number"
                      step="0.001"
                      name="VolumeGeneral"
                      value={VolumeGeneral}
                      style={{ width: 346 }}
                      onChange={handleInputs}
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
    senderRef: state.user.senderRef
  };
}

export default connect(mapStateToProps)(CreateTTN);
